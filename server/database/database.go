package database

import (
	"database/sql"
	"emp-parser/server/globals"
	"fmt"
)

var db *sql.DB

// Record ..
func Record(list []globals.Creneau) {
	fmt.Println("Enregistement et base de la liste des créneaux...")
	for _, c := range list {
		recordCreneau(c)
	}
}

func recordCreneau(c globals.Creneau) {
	stmtIns, err := db.Prepare("INSERT INTO creneaux VALUES (?, ?, ?)") // ? = placeholder
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}
	defer stmtIns.Close() // Close the statement when we leave main() / the program terminates

	_, err = stmtIns.Exec(c.Summary, c.Location, c.Description) // Insert tuples (i, i^2)
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}

}

// Init ..
func Init() {
	var err error
	db, err = sql.Open("mysql", "root:wugaxu@/edt")
	if err == nil {
		globals.ErrLogger.Println("Erreur à la connexion SQL")
	}
}
