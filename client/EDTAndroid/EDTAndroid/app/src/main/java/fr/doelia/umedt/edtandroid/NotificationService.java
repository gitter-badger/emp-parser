package fr.doelia.umedt.edtandroid;


import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;
import android.util.Log;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.Date;

import engine.structures.Creneau;

import iBoxDB.LocalServer.*;
import iBoxDB.LocalServer.IO.*;
import iBoxDB.LocalServer.Replication.*;

import iBoxDB.JDB.Example.Server.*;
import iBoxDB.JDB.Example.Server.Package;

public class NotificationService {

    private static final Object NOTIFICATION_SERVICE = "NOTIFICATION_SERVICE--2";
    private static final int START_NOT_STICKY = 1;
    private final int NOTIFICATION_ID = 1;
    private NotificationManager mNM;

    private int NOTIFICATION = R.string.local_service_started;

    @Override
    public void onCreate() {
        mNM = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
    }

    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.i("LocalService", "Received start id " + startId + ": " + intent);
        return START_NOT_STICKY;
    }

    @Override
    public void onDestroy() {
        mNM.cancel(NOTIFICATION);
        Toast.makeText(this, R.string.local_service_stopped, Toast.LENGTH_SHORT).show();
    }k

    @Override
    public IBinder onBind(Intent intent) {
        throw new UnsupportedOperationException("");
    }

    public void recordNotication(ArrayList<Creneau> creneaux, int minutsBeforeNotif) {
        int id = 2;
        ArrayList<String> tasks = new ArrayList<String>();
        for (Creneau c : creneaux) {
            Date dateNotif = new Date((c.tsDateStart - (minutsBeforeNotif * 60)) * 1000);
            BoxNotification n = new BoxNotification(
                   id++,
                    "Cours "+c.description,
                    "En salle "+c.location,
                    dateNotif,
                    12
            );
            tasks.add(n);
        }
        this.clearNotif();

        System.out.println(tasks.size() + " alertes programmées");
    }

    public void clearNotif() {

    }
}
