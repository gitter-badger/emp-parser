package network

import (
	"emp-parser/server/database"
	"emp-parser/server/globals"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
)

var networkLogger = log.New(os.Stdout, "[network] ", 0)

// StartWebServer Démarrage du serveur web (http + websockets)
func StartWebServer(port int) {
	networkLogger.Printf("Serveur web en écoute sur le port %d.\n", port)
	http.HandleFunc("/list-ue", handlerListUE)
	http.HandleFunc("/creneaux", handlerCreneaux)
	globals.Ch <- 1
	if err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil); err != nil {
		globals.ErrLogger.Println("Erreur à la création du serveur HTTP : ", err.Error())
	}
	globals.Ch <- 1
}

func handlerListUE(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	b, _ := json.Marshal(database.GetListUE())
	w.Write(b)
}

func handlerCreneaux(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	listUEs := req.URL.Query().Get("list")
	listUEStabed := strings.Split(listUEs, ",")
	if len(listUEStabed) < 1 {
		w.Write([]byte("Liste des ues incorrecte"))
	}
	b, _ := json.Marshal(database.GetListCreneaxForUEs(listUEStabed))
	w.Write(b)
}
