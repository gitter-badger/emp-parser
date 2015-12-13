package network

import (
	"emp-parser/server/database"
	"emp-parser/server/globals"
	"encoding/json"
	"fmt"
	"io"
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
	http.HandleFunc("/", handlerMain)
	globals.Ch <- 1
	if err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil); err != nil {
		globals.ErrLogger.Println("Erreur à la création du serveur HTTP : ", err.Error())
	}
	globals.Ch <- 1
}

func handlerMain(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/text")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	io.WriteString(w, "hello, world!\n")
}

func handlerListUE(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	b, _ := json.Marshal(database.GetListUE())
	w.Write(b)
}

func handlerCreneaux(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	listUEs := req.URL.Query().Get("list")
	listUEStabed := strings.Split(listUEs, ",")
	if len(listUEStabed) < 1 {
		w.Write([]byte("Liste des ues incorrecte"))
	}
	b, _ := json.Marshal(database.GetListCreneaxForUEs(listUEStabed))
	w.Write(b)
}
