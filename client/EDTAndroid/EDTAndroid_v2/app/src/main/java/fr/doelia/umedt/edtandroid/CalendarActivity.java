package fr.doelia.umedt.edtandroid;

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

public class MainActivity extends AppCompatActivity {

    private Processor pr;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        setFontAwesome();

        this.initEngine();
        this.loadNextCours();

    }

    public ArrayList<Creneau> getMyCreneaux() {
		CreneauxReceiver cr = new CreneauxReceiver(communicator);
		try {
			return cr.getCreneaux(this.getTempListCreneaux());
		} catch (Exception e) {
			e.printStackTrace(); // TODO debug
			return new ArrayList<Creneau>();
		}
	}

	private ArrayList<String> getTempListCreneaux() {
		ArrayList<String> list = new  ArrayList<String>();
		list.add("HLPH305");
		list.add("HLLV301");
		return list;
	}

	public Creneau getCurrentCreneau() throws CreneauNotFoundException {
		ArrayList<Creneau> creneaux = this.getMyCreneaux();
		UEReceiver uesReceiver = new UEReceiver(communicator);
		Creneau c = Creneau.getCurrent(creneaux);
		return c;
	}

	public Creneau getNextCreneau() throws CreneauNotFoundException {
		ArrayList<Creneau> creneaux = this.getMyCreneaux();
		UEReceiver uesReceiver = new UEReceiver(communicator);
		Creneau c = Creneau.getMostRecent(creneaux);
		return c;
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
