package main;

import java.io.IOException;
import java.util.ArrayList;

import org.json.JSONException;

import engine.network.Communicator;
import engine.network.CreneauxReceiver;
import engine.network.UEReceiver;
import engine.structures.Creneau;
import engine.structures.UE;

public class Main {

	public static void main(String[] args) {
		new Main();
    }
	
	public Main() {
		System.out.println("Hello world");
		
	}
	
	@SuppressWarnings("unused")
	private void testGetCreneaxAndUes() {
		Communicator c = new Communicator();
		CreneauxReceiver creneauxReceiver = new CreneauxReceiver(c);
		UEReceiver uesReceiver = new UEReceiver(c);
        try {
        	ArrayList<Creneau> creneaux = creneauxReceiver.getCreneaux(this.getTempListCreneaux());
        	System.out.println(creneaux);
        	
        	ArrayList<UE> ues = uesReceiver.getUEs();
        	System.out.println(ues);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }
	}

    private ArrayList<String> getTempListCreneaux() {
        ArrayList<String> list = new  ArrayList<String>();
        list.add("HLPH305");
        list.add("HLLV301");
        return list;
    }

}
