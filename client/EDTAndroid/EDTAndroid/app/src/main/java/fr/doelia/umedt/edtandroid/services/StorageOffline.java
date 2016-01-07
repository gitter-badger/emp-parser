package fr.doelia.umedt.edtandroid;


import org.json.JSONArray;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

import engine.AppStorage;
import engine.structures.Creneau;
import engine.structures.UE;

import iBoxDB.LocalServer.*;
import iBoxDB.LocalServer.IO.*;
import iBoxDB.LocalServer.Replication.*;

import iBoxDB.JDB.Example.Server.*;
import iBoxDB.JDB.Example.Server.Package;

public class StorageOffline extends Service implements AppStorage {

    privace Box box;

    @Override
    public void onCreate() {
        try {
           box = Db.cube();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onDestroy() {
    }


    @Override
    public void storeMyUES(ArrayList<UE> list) {
        box.Bind("ues").Insert(JSONArray.serialize(list));
    }

    @Override
    public void storeCreneaux(ArrayList<Creneau> creneaux) {
        box.Bind("creneaux").Insert(JSONArray.serialize(creneaux));
    }

    @Override
    public ArrayList<UE> getMyUes() {
        return null;
    }
}
