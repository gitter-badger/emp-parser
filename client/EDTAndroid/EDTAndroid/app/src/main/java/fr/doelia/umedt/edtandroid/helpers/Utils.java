package fr.doelia.umedt.edtandroid;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

public class Utils {

	public static int random(int i1, int i2) {
		Random rand = new Random();
		return (rand.nextInt((i2 - i1) + 1)) + i1;
	}

	// 5% de chance de réussir, par exemple
	public static boolean hasChance(int ratio) {
		return (random(1, 100) <= ratio);
	}

	public static double randomDouble() {
		return new Random().nextDouble();
	}

	// 123 secondes => 2:11
	public static String getTempsRestantWithPoints(int secondes) {
		if (secondes < 60) {
			if (secondes < 10) {
				return "00:0"+secondes;
			} else {
				return "00:"+secondes;
			}
		} else {
			String minutes = "";
			if (secondes > 60*10) {
				minutes = ""+(secondes/60);
			} else {
				minutes = "0"+(secondes/60);
			}
			int secondesAAffiche = secondes - (secondes/60)*60;
			if (secondesAAffiche < 10) {
				return minutes+":0"+secondesAAffiche;
			} else {
				return minutes+":"+secondesAAffiche;
			}
		}
	}

	// 123 secondes => 2:11
	public static String getTempsRestantWithAbrev(int secondes) {
		String s = "";


		if (secondes/3600 > 0) {
			s += " "+(secondes/3600)+"h";
			secondes -= (secondes/3600)*3600;
		}

		if (secondes/60 > 0) {
			s += " "+(secondes/60)+"m";
			secondes -= (secondes/60)*60;
		}

		if (secondes > 0) {
			s += " "+(secondes)+"s";
		}

		return s;
	}

	// 123 secondes => 2 minutes et 11 secondes
	public static String getTempsRestantInPhrase(int secondes) {
		if (secondes < 60) {
			return secondes+" secondes";
		} else {

			String s = "";

			int minutes = (secondes/60);
			if (minutes == 1) {
				s += "1 minute";
			} else {
				s += minutes+" minutes";
			}

			int secondesAAffiche = secondes - (secondes/60)*60;

			if (secondesAAffiche > 0) {
				s += " et "+secondesAAffiche+" secondes";
			}

			return s;
		}
	}

	public static String calendarToSql(Calendar date) {
		if (date == null)
			return "";

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.format(date.getTime());
	}

	public static String dateToSql(Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String s = sdf.format(date.getTime());
		return s;
	}

	public static Date getDateFromSql(String sql) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.parse(sql);
	}

	// Retoune true si la date est pasée en y ajoutant le temps voulu
	public static boolean tempsPasseEstSuperieurAuVoulu(Date dateTest, int ms) {
		return (getMsPasses(dateTest) > ms);
	}

	public static long getMsPasses(Date dateTest) {
		return (new Date()).getTime() - dateTest.getTime();
	}

	public static String getTimeExec(long begin) {
		long end = System.currentTimeMillis();
		float time = ((float) (end-begin));
		return time+"ms";
	}

	public static String getDateFormated(Date dateEndVip) {
		SimpleDateFormat formater = new SimpleDateFormat("EEEE d MMM y");
		return formater.format(dateEndVip);
	}

	public static String getTextFromInt(int place) {
		if (place == 1) {
			return "première";
		}
		if (place == 2) {
			return "deuxième";
		}
		if (place == 3) {
			return "troisième";
		}
		return "";
	}


}
