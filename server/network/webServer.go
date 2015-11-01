package network

import (
	"emp-parser/server/database"
	"emp-parser/server/globals"
	"fmt"
	"log"
	"net/http"
	"os"
)

var networkLogger = log.New(os.Stdout, "[network] ", 0)

// StartWebServer Démarrage du serveur web (http + websockets)
func StartWebServer(port int) {
	networkLogger.Printf("Serveur web en écoute sur le port %d.\n", port)
	http.HandleFunc("/list-ue", handlerListUE)
	globals.Ch <- 1
	if err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil); err != nil {
		globals.ErrLogger.Println("Erreur à la création du serveur HTTP : ", err.Error())
	}
	globals.Ch <- 1
}

func handlerListUE(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "text/plain")
	s := fmt.Sprintf("%s", database.GetListUE())
	w.Write([]byte(s))
}
