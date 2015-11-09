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
    	return UE + ", location: " + location+", "+getDateStart()+" to "+getDateEnd();
    }
    
    public Date getDateStart() {
    	Date date = new Date((long)tsDateStart*1000);
    	return date;
    }
    
    public Date getDateEnd() {
    	Date date = new Date((long)tsDateEnd*1000);
    	return date;
    }

    public static Creneau getCurrent(ArrayList<Creneau> list) throws CreneauNotFoundException {
    	try {
        	int todayTimestamp = (int) ((new Date()).getTime()/1000);
        	for (Creneau c : list) {
        		if (c.tsDateStart < todayTimestamp && c.tsDateEnd > todayTimestamp) {
        			return c;
        		}
        	}
    	} catch (Exception e) {
    	}
    	throw new CreneauNotFoundException();
    }
    
    /**
     * Retourne le creneau le plus récent qui n'est pas encore passé
     * @throws CreneauNotFoundException 
     */
    public static Creneau getMostRecent(ArrayList<Creneau> list) throws CreneauNotFoundException {
    	try {
    		Creneau best = list.get(0);
        	int todayTimestamp = (int) ((new Date()).getTime()/1000);
        	for (Creneau c : list) {
        		if (c.tsDateStart < best.tsDateStart && c.tsDateStart > todayTimestamp) {
        			best = c;
        		}
        	}
        	return best;
    	} catch (Exception e) {
    		throw new CreneauNotFoundException();
    	}
    	
    }
}
