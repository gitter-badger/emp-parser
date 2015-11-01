package database

import (
	"database/sql"
	"emp-parser/server/globals"
	"fmt"
	"log"

	// msql driver
	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

var remainingRow int

// Init ..
func Init() {
	var err error
	db, err = sql.Open("mysql", "root:gogoedt@tcp(192.168.99.103:3306)/edt")
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
	fmt.Printf("%d lignes restantes...\n", remainingRow)
	stmtIns, err := db.Prepare("INSERT INTO creneaux VALUES (?, ?, ?)")
	if err != nil {
		panic(err.Error())
	}
	defer stmtIns.Close()

	_, err = stmtIns.Exec(c.Summary, c.Location, c.Description)
	if err != nil {
		panic(err.Error())
	}

}

// GetListUE ..
func GetListUE() (list []globals.UE) {
	rows, err := db.Query("SELECT nameue, description FROM " +
		"(SELECT DISTINCT(UE) as nameue FROM creneaux) t " +
		"LEFT JOIN creneaux c ON c.UE = t.nameue")

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

// GetListCreneaxForUEs ..
func GetListCreneaxForUEs(ues []globals.UE) (list []globals.Creneau) {
	rows, err := db.Query("SELECT * FROM creneaux")

	if err != nil {
		log.Fatal(err)
	}
	for rows.Next() {
		var Summary, Location, Description string
		if err := rows.Scan(&Summary, &Location, &Description); err != nil {
			log.Fatal(err)
		}
		list = append(list, globals.Creneau{Summary, Location, Description})
	}
	if err := rows.Err(); err != nil {
		log.Fatal(err)
	}
	return list
}
