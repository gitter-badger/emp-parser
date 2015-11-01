package fr.doelia.umedt.edtandroid;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Scanner;

/**
 * Created by doelia on 02/11/2015.
 */
public class Communicator {

    public String baseUrl = "http://localhost:2000/";

    public ArrayList<Creneau> getCreneaux(ArrayList<String> ues) throws IOException, JSONException {
        String listUes = this.getListUEs(ues);
        JSONObject creneaux = this.readJsonFromUrl(this.baseUrl+"creneaux");
        System.out.println(creneaux);
        ArrayList<Creneau> list = new ArrayList<Creneau>();
        return list;
    }

    private String getListUEs(ArrayList<String> ues) {
        String s = "0,";
        for (String ue : ues) {
            s += ue + ",";
        }
        s += "0";
        return s;
    }

    public static JSONObject readJsonFromUrl(String url) throws IOException, JSONException {
        InputStream is = new URL(url).openStream();
        try {
            BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
            String jsonText = readAll(rd);
            JSONObject json = new JSONObject(jsonText);
            return json;
        } finally {
            is.close();
        }
    }

    private static String readAll(Reader rd) throws IOException {
        StringBuilder sb = new StringBuilder();
        int cp;
        while ((cp = rd.read()) != -1) {
            sb.append((char) cp);
        }
        return sb.toString();
    }




}
