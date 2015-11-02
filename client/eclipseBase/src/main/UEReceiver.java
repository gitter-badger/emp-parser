package main;

import java.io.IOException;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class UEReceiver {

	Communicator communicator;
	
	public UEReceiver(Communicator communicator) {
		this.communicator = communicator;
	}

	public ArrayList<UE> getUEs() throws IOException, JSONException {
		JSONArray listJson = communicator.getJsonUEs();
    	ArrayList<UE> list = new ArrayList<UE>();        
        for (int i = 0; i < listJson.length(); i++) {
        	JSONObject crJson = (JSONObject) listJson.get(i);
        	UE cr = new UE();
        	cr.description = crJson.getString("Description");
        	cr.name = crJson.getString("Name");
        	list.add(cr);
        }
        return list;
    }
	
}
