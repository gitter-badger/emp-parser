package database

import (
	"database/sql"
	"emp-parser/server/globals"
	"fmt"
	"log"
	"strings"

	// msql driver
	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

var remainingRow int

// Init ..
func Init(host, user, pass string) {
	var err error
	db, err = sql.Open("mysql", user+":"+pass+"@tcp("+host+":3306)/edt")
	if err != nil {
		globals.ErrLogger.Println("Erreur à la connexion SQL")
		panic(err.Error())
	}
}

// Record ..
func Record(list []globals.Creneau) {
	clearCrenaux()
	remainingRow = len(list)
	fmt.Println("Enregistement et base de la liste des créneaux...")
	for _, c := range list {
		recordCreneau(c)
	}
}

func clearCrenaux() {
	fmt.Println("clearCrenaux...")
	stmtIns, err := db.Prepare("TRUNCATE TABLE creneaux")
	if err != nil {
		panic(err.Error())
	}
	defer stmtIns.Close()

	_, err = stmtIns.Exec()
	if err != nil {
		panic(err.Error())
	}
}

func recordCreneau(c globals.Creneau) {
	remainingRow--
	// fmt.Printf("%d lignes restantes...\n", remainingRow)
	stmtIns, err := db.Prepare("INSERT INTO creneaux VALUES (?, ?, ?, FROM_UNIXTIME(? - 3600), FROM_UNIXTIME(? - 3600), FROM_UNIXTIME(? - 3600))")
	if err != nil {
		panic(err.Error())
	}
	defer stmtIns.Close()

	_, err = stmtIns.Exec(c.Summary, c.Location, c.Description, c.DateStart, c.DateEnd, c.LastModified)
	if err != nil {
		panic(err.Error())
	}

}

// GetListUE ..
func GetListUE() (list []globals.UE) {
	rows, err := db.Query("SELECT nameue, description FROM " +
		"(SELECT DISTINCT(UE) as nameue FROM creneaux) t " +
		"LEFT JOIN creneaux c ON c.UE = t.nameue " +
		"GROUP BY nameue")

	if err != nil {
		log.Fatal(err)
	}
	for rows.Next() {
		var nameue, description string
		if err := rows.Scan(&nameue, &description); err != nil {
			log.Fatal(err)
		}
		list = append(list, globals.UE{nameue, description})
	}
	if err := rows.Err(); err != nil {
		log.Fatal(err)
	}
	return list
}

func cleanUpDescription(descrition string) string {
	descrition = strings.Replace(descrition, "M1 - ", "", -1)
	descrition = strings.Replace(descrition, "M2 - ", "", -1)
	descrition = strings.Replace(descrition, "AIGLE - Architectures et Ingénierie du logiciel et du Web", "", 1)
	descrition = strings.Replace(descrition, "DECOL -  Données connaissances et langage naturel", "", 1)
	descrition = strings.Replace(descrition, "DECOL - Données connaissances et langage naturel", "", 1)
	descrition = strings.Replace(descrition, "IMAGINA - Images, games et intelligent agent", "", 1)
	descrition = strings.Replace(descrition, "MIT - Informatique Théorique", "", 1)
	descrition = strings.Replace(descrition, "Mathématiques et Informatique", "", 1)
	return descrition
}

// GetListCreneaxForUEs ..
func GetListCreneaxForUEs(ues []string) (list []globals.Creneau) {
	uewhere := "'',"
	for _, ue := range ues {
		uewhere += "'" + ue + "',"
	}
	uewhere += "''"
	query := "SELECT UE, location, description, UNIX_TIMESTAMP(dateStart), UNIX_TIMESTAMP(dateEnd), UNIX_TIMESTAMP(lastModified), batiment FROM creneaux LEFT JOIN batiments b ON b.id=Location WHERE UE IN (" + uewhere + ")"
	fmt.Println(query)
	rows, err := db.Query(query)
	fmt.Println("Query done.")

	if err != nil {
		log.Fatal(err)
	}
	for rows.Next() {
		var Summary, Location, Description, Batiment string
		var DateEnd, DateStart, LastModification int
		if err := rows.Scan(&Summary, &Location, &Description, &DateStart, &DateEnd, &LastModification, &Batiment); err != nil {
			log.Fatal(err)
		}
		Description = cleanUpDescription(Description)
		list = append(list, globals.Creneau{Summary, Location, Description, DateStart, DateEnd, LastModification, Batiment})
	}
	if err := rows.Err(); err != nil {
		log.Fatal(err)
	}
	return list
}
