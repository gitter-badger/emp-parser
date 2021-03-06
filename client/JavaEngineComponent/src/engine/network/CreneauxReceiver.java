package engine.network;

import java.io.IOException;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import engine.EngineLogger;
import engine.structures.Creneau;

public class CreneauxReceiver {
	
	Communicator communicator;
	
	public CreneauxReceiver(Communicator communicator) {
		this.communicator = communicator;
	}

	public ArrayList<Creneau> getCreneaux(ArrayList<String> ues) throws IOException, JSONException {
		EngineLogger.DebugLog("getCreneaux...");
		JSONArray listJson = communicator.getJsonCreneaux(ues);
    	ArrayList<Creneau> list = new ArrayList<Creneau>();        
        for (int i = 0; i < listJson.length(); i++) {
        	JSONObject crJson = (JSONObject) listJson.get(i);
        	Creneau cr = new Creneau();
        	cr.description = crJson.getString("Description");
        	cr.location = crJson.getString("Location");
        	cr.UE = crJson.getString("Summary");
        	cr.tsDateStart = crJson.getInt("DateStart");
        	cr.tsDateEnd = crJson.getInt("DateEnd");
        	list.add(cr);
        }
        return list;
    }

    
    
}
