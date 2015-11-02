package main.structures;

import java.util.ArrayList;

public class UE {

	public String name;
	public String description;
	
	@Override
	public String toString() {
		return name;
	}
	
	public static ArrayList<String> buildStringUEs(ArrayList<UE> listUes) {
		ArrayList<String> list = new ArrayList<String>();
		for (UE ue : listUes) {
			list.add(ue.name);
		}
		return list;
	}
}
