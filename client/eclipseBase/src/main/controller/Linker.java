package main.controller;

import java.io.IOException;
import java.util.ArrayList;

import org.json.JSONException;

import main.AppStorage;
import main.network.Communicator;
import main.network.CreneauxReceiver;
import main.structures.Creneau;
import main.structures.UE;

public class Linker {
	
	private AppStorage appStorage;
	private Communicator communicator;
	
	public Linker() {
		appStorage = new AppStorage();
		communicator = new Communicator();
	}

	public void updateMyEdt() {
		this.appStorage = new AppStorage();
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
