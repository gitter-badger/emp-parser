package fr.doelia.umedt.edtandroid;

import android.graphics.Typeface;
import android.os.Bundle;
import android.os.StrictMode;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.view.ViewGroup;
import android.widget.TextView;

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

        setFontAwesome();

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

    private ArrayList<String> getTempListCreneaux() {
        ArrayList<String> list = new  ArrayList<String>();
        list.add("HLPH305");
        list.add("HLLV301");
        return list;
    }




}
