package fr.doelia.umedt.edtandroid;

import java.util.ArrayList;

import engine.AppStorage;
import engine.structures.Creneau;
import engine.structures.UE;

/**
 * Created by doelia on 10/11/2015.
 */
public class AppStorageImpl implements AppStorage {


    @Override
    public void storeMyUES(ArrayList<UE> list) {

    }

    @Override
    public void storeCreneaux(ArrayList<Creneau> creneaux) {

    }

    @Override
    public ArrayList<UE> getMyUes() {
        ArrayList<UE> list = new  ArrayList<UE>();
        UE ue = new UE();
        ue.name = "HLPH305";
        list.add(ue);
        return list;
    }
}
