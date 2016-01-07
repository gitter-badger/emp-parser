package fr.doelia.umedt.edtandroid;

import android.content.Intent;
import android.graphics.Typeface;
import android.os.Bundle;
import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.ArrayList;

import engine.AppStorage;
import engine.controller.Processor;
import engine.network.Communicator;
import engine.structures.Creneau;
import engine.structures.CreneauNotFoundException;

public class SettingsActivity extends AppCompatActivity {

    private Processor pr;

    private Switch alerteSwitch;
    private Switch pushSwitch;
    private Switch syncSwicth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        setFontAwesome();
        startService(new Intent(this, StorageOffline.class));

        this.initEngine();


        alerteSwitch = (Switch) findViewById(R.id.alerteSwitch);
        pushSwitch = (Switch) findViewById(R.id.pushSwitch);
        syncSwicth = (Switch) findViewById(R.id.syncSwicthk);
    }

    private void setSetting(String name, boolean value) {
        
    }

    private void onSwitchChange() {

        alerteSwitch.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                .setSetting("ALERTE", alerteSwitch.isChecked());
            }
        });

        pushSwitch.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                .setSetting("PUSH", pushSwitch.isChecked());
            }
        });

        syncSwicth.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                .setSetting("SYNC", syncSwicth.isChecked());
            }
        });
    }

    private void initEngine() {
        Communicator c = new Communicator("http://localhost:2000/");
        AppStorage appStorage = new StorageOffline();

        this.pr = new Processor(appStorage, c);
    }

    private void setFontAwesome() {
        Typeface font = Typeface.createFromAsset(getAssets(), "fontawesome-webfont.ttf");
        for (TextView v : getButtons()) {
            v.setTypeface(font);
        }
    }

    public ArrayList<TextView> getButtons() {
        ArrayList<TextView> buttons = new ArrayList<TextView>();
        ViewGroup viewGroup = (ViewGroup) getWindow().getDecorView();
        findTextView(viewGroup, buttons);
        return buttons;
    }

    private static void findTextView(ViewGroup viewGroup,ArrayList<TextView> buttons) {
        for (int i = 0, N = viewGroup.getChildCount(); i < N; i++) {
            View child = viewGroup.getChildAt(i);
            if (child instanceof ViewGroup) {
                findTextView((ViewGroup) child, buttons);
            } else if (child instanceof TextView) {
                buttons.add((TextView) child);
            }
        }
    }


    private void loadNextCours() {
        try {
            Creneau cr = pr.getNextCreneau();
            System.out.println(cr);
        } catch (CreneauNotFoundException e) {
            e.printStackTrace();
        }

    }




}
