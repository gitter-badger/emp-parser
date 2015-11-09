package engine.structures;

import java.util.ArrayList;
import java.util.Date;

/**
 * Created by doelia on 02/11/2015.
 */
public class Creneau {
	
    public String UE;
    public String location;
    public String description; // Correspond aussi la description de l'ue
    public int tsDateStart;
    public int tsDateEnd;
    
    @Override
    public String toString() {
    	return UE + ", location: " + location+", "+tsDateStart+" "+getDateStart();
    }
    
    public Date getDateStart() {
    	Date date = new Date((long)tsDateStart*1000);
    	return date;
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
        		if (c.tsDateStart < best.tsDateStart && c.tsDateStart < todayTimestamp) {
        			best = c;
        		}
        	}
        	return best;
    	} catch (Exception e) {
    		throw new CreneauNotFoundException();
    	}
    	
    }
}
