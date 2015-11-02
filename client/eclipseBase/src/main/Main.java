package main;

import java.io.IOException;
import java.util.ArrayList;

import org.json.JSONException;

public class Main {

	public static void main(String[] args) {
		new Main();
    }
	
	public Main() {
		System.out.println("test");
		CreneauxReceiver communicator = new CreneauxReceiver();
        try {
        	ArrayList<Creneau> creneaux = communicator.getCreneaux(this.getTempListCreneaux());
        	System.out.println(creneaux);
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
