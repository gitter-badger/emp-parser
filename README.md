# Consulteur d'emploi du temps

Consultation de l'emploi du temps de la FDS dans une appli mobile Android

## Cahier des charges

### Serveur de consultation
- Parse régulièrement d'emploi du temps de la FDS avec le protocole ICS
- Stocke en base toutes les données
- API HTTP :
    - Récupération des créneaux à partir d'une liste d'UE

### Fonctionnalités de l'application
- Choix des UE à l'initialisation de l'appli avec recherche assistée
- Synchonisation régulière et stockage sur le téléphone X semaines à l'avance
- Consultation offline et de l'emploi du temps stocké
- Envoi d'une notification avant le prochain cours (configurable)

### Fonctionnalités supplémentaire
- Affichage du plan du campus
- Guidage pour l'emplacement de la salle avec GPS
- Prévention par push des changements de salle ou des annulations de cours

### Technologies
- Serveur en GO
    - Interfaçage HTTP via JSON
- Application Android
