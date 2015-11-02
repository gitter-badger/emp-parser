package engine.structures;

import java.util.ArrayList;

/**
 * Created by doelia on 02/11/2015.
 */
public class Creneau {
	
    public String UE;
    public String location;
    public String description; // Correspond aussi la description de l'ue
    public int timestamp;
    
    @Override
    public String toString() {
    	return UE + ", location: " + location;
    }
    
    /**
     * Retourne le creneau le plus récent qui n'est pas encore passé
     * @throws CreneauNotFoundException 
     */
    public static Creneau getMostRecent(ArrayList<Creneau> list) throws CreneauNotFoundException {
    	try {
    		Creneau best = list.get(0);
        	int todayTimestamp = 0;
        	for (Creneau c : list) {
        		if (c.timestamp < best.timestamp && c.timestamp < todayTimestamp) {
        			best = c;
        		}
        	}
        	return best;
    	} catch (Exception e) {
    		throw new CreneauNotFoundException();
    	}
    	
    }
}
