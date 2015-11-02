package engine.controller;

import java.io.IOException;
import java.util.ArrayList;

import org.json.JSONException;

import engine.AppStorage;
import engine.network.Communicator;
import engine.network.CreneauxReceiver;
import engine.structures.Creneau;
import engine.structures.UE;

public class Processor {
	
	private AppStorage appStorage;
	private Communicator communicator;
	
	public Processor(AppStorage appStorage, Communicator communicator) {
		this.appStorage = appStorage;
		this.communicator = communicator;
	}

	/**
	 * Met à jour mon emploi du temps à partir des UEs que j'ai choisis
	 * Le nombre de jour selectionné du calendrier est choisi par le serveur
	 */
	public void updateMyEdt() {
		CreneauxReceiver cr = new CreneauxReceiver(communicator);
		ArrayList<UE> myUes = appStorage.getMyUes();
		ArrayList<String> myUesString = UE.buildStringUEs(myUes);
		try {
			ArrayList<Creneau> creneaux = cr.getCreneaux(myUesString);
			appStorage.storeCreneaux(creneaux);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}
}
