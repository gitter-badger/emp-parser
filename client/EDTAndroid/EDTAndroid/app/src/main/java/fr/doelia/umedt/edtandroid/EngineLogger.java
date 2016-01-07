package engine;

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

public class EngineLogger {

    public static LOG_DEBUG = true;

	public static void DebugLog(String s) {
		System.out.println(s);
        if (LOG_DEBUG) {
            Toast.send("Debug:: "+s);
        }
	}
}
