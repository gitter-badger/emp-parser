package fr.doelia.umedt.edtandroid;

import android.os.Bundle;
import android.os.StrictMode;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;

import org.json.JSONException;

import java.io.IOException;
import java.util.ArrayList;

import engine.network.Communicator;
import engine.network.CreneauxReceiver;
import engine.network.UEReceiver;
import engine.structures.Creneau;
import engine.structures.UE;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Communicator c = new Communicator("http://192.168.1.92:2000/");
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
