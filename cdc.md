But de l'application : Consulation de l'emploi du temps de la FDS dans une application mobile

## Cahier des charges

### Serveur de consultation
- Parse régulièrement d'emploi du temps de la FDS avec le protocole ICS
- Stocke en base toutes les données
- Propose une API RESTFull HTTP privée :
    - Récupération de la liste complète des UEs
    - Récupération des créneaux à partir d'une liste d'UE

### Fonctionnalités de l'application
- Choix des UE à l'initialisation de l'appli avec recherche assistée
- Synchonisation régulière et stockage sur le téléphone 3 semaines à l'avance
- Consultation offline et de l'emploi du temps stocké
- Envoi d'une notification offine avant le prochain cours (configurable)
- Prévention par push des changements de salle ou des annulations de cours


Couleurs : http://paletton.com/#uid=70v0t0kvDGtpFIBssHpFEEAF9uG

### Installation serveur
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
