package engine;

import java.util.ArrayList;

import engine.structures.Creneau;
import engine.structures.UE;

public interface AppStorage {

	public void storeMyUES(ArrayList<UE> list);
	
	public void storeCreneaux(ArrayList<Creneau> creneaux);

	public ArrayList<UE> getMyUes();
}
