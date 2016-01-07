package engine.controller;

import java.io.IOException;
import java.util.ArrayList;

import org.json.JSONException;

import engine.AppStorage;
import engine.network.Communicator;
import engine.network.CreneauxReceiver;
import engine.network.UEReceiver;
import engine.structures.Creneau;
import engine.structures.CreneauNotFoundException;
import engine.structures.UE;

public class Processor {

	private AppStorage appStorage;
	private Communicator communicator;

	public Processor(AppStorage appStorage, Communicator communicator) {
		this.appStorage = appStorage;
		this.communicator = communicator;
	}

    private ArrayList<String> getTempListCreneaux() {
		ArrayList<String> list = new  ArrayList<String>();
		list.add("HLPH305");
		list.add("HLLV301");
		return list;
	}

	public Creneau getCurrentCreneau() throws CreneauNotFoundException {
		ArrayList<Creneau> creneaux = this.getMyCreneaux();
		UEReceiver uesReceiver = new UEReceiver(communicator);
		Creneau c = Creneau.getCurrent(creneaux);
		return c;
	}

	public Creneau getNextCreneau() throws CreneauNotFoundException {
		ArrayList<Creneau> creneaux = this.getMyCreneaux();
		UEReceiver uesReceiver = new UEReceiver(communicator);
		Creneau c = Creneau.getMostRecent(creneaux);
		return c;
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

	public ArrayList<Creneau> getMyCreneaux() {
		CreneauxReceiver cr = new CreneauxReceiver(communicator);
		try {
			return cr.getCreneaux(this.getTempListCreneaux());
		} catch (Exception e) {
			e.printStackTrace(); // TODO debug
			return new ArrayList<Creneau>();
		}
	}


}
