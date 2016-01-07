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

public class PreferencesService extends Service {

    @Override
    public void onCreate() {
        Toast.makeText(this, "The new Service PreferencesService was Created", Toast.LENGTH_LONG).show();
    }

    public int onStartCommand(Intent intent, int flags, int startId) {

    }

    @Override
    public void onDestroy() {

    }k

    @Override
    public IBinder onBind(Intent intent) {
        throw new UnsupportedOperationException("");
    }


}
