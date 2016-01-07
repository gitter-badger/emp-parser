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

public class GCMRegisterActivity extends Activity {

    public static final String REG_ID = "188392234";
    private static final String APP_VERSION = "1.0.0";

    public GoogleCloudMessaging gcm;
    public Context context;
    public String regId;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        context = getApplicationContext();

        if (TextUtils.isEmpty(regId)) {
            Log.d("GCM RegId: " + regId);
        } else {
            Toast.makeText(getApplicationContext(), "Déjà enregistré sur le GCM Server!", Toast.LENGTH_LONG).show();
        }
    }

    public String registerGCM() {
        gcm = GoogleCloudMessaging.getInstance(this);
        regId = getRegistrationId(context);

        if (TextUtils.isEmpty(regId)) {
            registerInBackground();
            Log.d( "registerGCM - enregistrement auprès du GCM server OK - regId: " + regId);
        } else {
            Toast.makeText(getApplicationContext(), "RegId existe déjà. RegId: " + regId, Toast.LENGTH_LONG).show();
        }
        return regId;
    }

    private String getRegistrationId(Context context) {
        final SharedPreferences prefs = getSharedPreferences(
            MainActivity.class.getSimpleName(), Context.MODE_PRIVATE);
            String registrationId = prefs.getString(REG_ID, "");
        if (registrationId.isEmpty()) {
            Log.i(TAG, "registrationId non trouvé.");
            return "";
        }
    }

    private void registerInBackground() {
        new AsyncTask<Void, Void, String>() {
            @Override
            protected String doInBackground(Void... params) {
                String msg = "";
                try {
                    if (gcm == null) {
                        gcm = GoogleCloudMessaging.getInstance(context);
                    }
                    regId = gcm.register(PROJECT_NUMBER);
                    msg = "Terminal enregistré, register ID=" + regId;
                } catch (IOException ex) {
                    msg = "Error :" + ex.getMessage();
                    Log.d("Error: " + msg);
                }
                return msg;
            }
        }.execute(null, null, null);
    }
 }
