package main.network;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by doelia on 02/11/2015.
 */
public class Communicator {

    private String baseUrl = "http://localhost:2000/";
    private boolean displayQuery = true;
    
    public JSONArray getJsonUEs() throws IOException, JSONException {
    	 String path = "list-ue";
    	 return this.getJsonArray(path);
    }
    
    public JSONArray getJsonCreneaux(ArrayList<String> ues) throws IOException, JSONException {
    	String listUes = this.buildListUEs(ues);
        String path = "creneaux?list="+listUes;
        return this.getJsonArray(path);
    }
    
    private String buildListUEs(ArrayList<String> ues) {
        String s = "0,";
        for (String ue : ues) {
            s += ue + ",";
        }
        s += "0";
        return s;
    }
    
    private JSONArray getJsonArray(String path) throws IOException, JSONException {
    	String query = baseUrl+path;
    	if (displayQuery) {
    		System.out.println("query = "+query);
    	}
         JSONObject creneaux = readJsonFromUrl(query);
         //System.out.println("json out : "+creneaux);
         JSONArray listJson = creneaux.getJSONArray("obj");
         return listJson;
    }

    private JSONObject readJsonFromUrl(String url) throws IOException, JSONException {
        InputStream is = new URL(url).openStream();
        try {
            BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
            String jsonText = readAll(rd);
            jsonText = "{\"obj\":" + jsonText + "}";
            JSONObject json = new JSONObject(jsonText);
            return json;
        } finally {
            is.close();
        }
    }

    private String readAll(Reader rd) throws IOException {
        StringBuilder sb = new StringBuilder();
        int cp;
        while ((cp = rd.read()) != -1) {
            sb.append((char) cp);
        }
        return sb.toString();
    }




}
