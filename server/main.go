package main

import (
	"emp-parser/server/database"
	"emp-parser/server/globals"
	"emp-parser/server/network"
	"emp-parser/server/parser"
	"flag"
	"fmt"
	"math/rand"
	"time"
)

var test = flag.String("test", "main", "Sélectionne la méthode de test à lancer (debug uniquement)")
var port = flag.Int("port", 2000, "Modifie le port d'écoute (défaut 2000)")

// Valeurs par défauts basé sur la config Docker
var mhost = flag.String("mhost", "docker.loc", "Définit l'host MySQL")
var muser = flag.String("muser", "root", "Définit le user MySQL")
var mpass = flag.String("mpass", "gogoent", "Définit le mot de passe MySQL")

func goMain() {
	rand.Seed(time.Now().Unix())
	globals.Ch = make(chan int, 1)

	// Création serveur HTTP
	go network.StartWebServer(*port)
	<-globals.Ch // Attente de l'handle

	<-globals.Ch // Attente fin serveur http (ne doit pas arriver)
}

func main() {

	fmt.Println("=== EDT PARSER ===")

	flag.Parse()

	fmt.Println("Connexion au serveur mysql...")
	database.Init(*mhost, *muser, *mpass)
	fmt.Println("Connexion au serveur mysql OK")

	switch *test {
	case "parse":
		parser.Test()
	case "main":
		goMain()
	case "get":
		s := parser.GetEdt(parser.GetListTestRessources(), "2015-11-02", "2015-11-08")
		fmt.Println(s)
	}

}
