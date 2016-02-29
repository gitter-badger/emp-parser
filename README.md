# Consulteur d'emploi du temps

[![Join the chat at https://gitter.im/Doelia/emp-parser](https://badges.gitter.im/Doelia/emp-parser.svg)](https://gitter.im/Doelia/emp-parser?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Consultation de l'emploi du temps de la FDS dans une application mobile   
Lien Google Play : https://play.google.com/store/apps/details?id=fr.doelia.calendrierfds

## Cahier des charges

### Serveur de consultation
- Parse régulièrement d'emploi du temps de la FDS avec le protocole ICS
- Stocke en base toutes les données
- Propose une API RESTFul HTTP privée :
    - Récupération de la liste complète des UEs
    - Récupération des créneaux à partir d'une liste d'UE

### Fonctionnalités de l'application
- Choix des UE à l'initialisation de l'application avec recherche assistée
- Synchonisation régulière et stockage sur le téléphone 3 semaines à l'avance
- Consultation offline et de l'emploi du temps stocké
- Envoi d'une notification offine avant le prochain cours (configurable)
- Connexion à une application partenaire pour la localisation des salles

### Technologies
- Serveur en [Golang](https://golang.org/)
    - Interfaçage HTTP via JSON
    - Virtualisation avec [Docker](https://www.docker.com/) pour la portabilité de déploiement
- Application en Cordova, avec les technologies du web :
    - AngularJS, Framework Javascript
    - PouchDB, database NoSQL inspirée par Apache CouchDB, écrite en Node.JS
    - Materialize, Framework CSS optimisé pour mobile
    - Font Awesome, bibliothèque d’icons


### Installation
Dépendances go :
```
go get github.com/go-sql-driver/mysql
```

Lancement docker (daemon mysql) :
```
cd docker
./run.sh
```

Compilation serveur :
```
cd server
go build
```

Lancement  serveur :
```
cd server
./server
```

Compilation et lancement application :
```
cd client/MyApp
cordova add platform android
cordova run android
```
