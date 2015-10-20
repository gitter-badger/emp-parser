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

func goMain() {
	rand.Seed(time.Now().Unix())
	globals.Ch = make(chan int, 1)

	fmt.Println("=== EDT PARSER ===")

	// Création serveur HTTP
	go network.StartWebServer(*port)
	<-globals.Ch // Attente de l'handle

	<-globals.Ch // Attente fin serveur http (ne doit pas arriver)
}

func main() {

	database.Init()
	flag.Parse()

	switch *test {
	case "parse":
		parser.Test()
	case "main":
		goMain()
	}

}
