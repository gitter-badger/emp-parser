# Consulteur d'emploi du temps

Consultation de l'emploi du temps de la FDS

Serveur de consultation
- Parse régulièrement d'emploi du temps de la FDS avec le protocole ICS
- Stocke en base toutes les données
- API HTTP :
    - Récupération des créneaux à partir d'une liste d'UE

Fonctionnalités de l'application
- Choix des UE à l'initialiastion de l'appli via une recherche
- Synchonisation régulière et stockage sur le téléphone une semaine à l'avance
- Consultation en offline de l'emploi du temps de façon linéaire
- Envoi d'une notification avant le prochain cours

Fonctionnalités supplémentaire
- Affichage du plan du campus
- Guidage pour l'emplacement de la salle avec GPS

Technologies
- Serveur en GO
    - Interfaçage HTTP via JSON
- Application Android
