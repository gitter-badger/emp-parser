package parser

import (
	"emp-parser/server/globals"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

func getEdt(resources string, firstDate string, lastDate string) string {
	url := "http://www.tom2ade.univ-montp2.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=" + resources + "&projectId=1&calType=ical&firstDate=" + firstDate + "&lastDate=" + lastDate
	resp, err := http.Get(url)
	if err != nil {
		globals.ErrLogger.Println("Erreur durant le wget de l'EDT")
		return ""
	}

	robots, err := ioutil.ReadAll(resp.Body)
	resp.Body.Close()
	if err != nil {
		log.Fatal(err)
	}
	out := fmt.Sprintf("%s", robots)

	return out
}

// Creneau ..
type Creneau struct {
	summary     string
	location    string
	description string
}

func getValueForKey(key string, tab []string) string {
	for _, line := range tab {
		attrs := strings.Split(line, ":")
		if attrs[0] == key {
			value := attrs[1]
			value = strings.Replace(value, "\n", "", -1)
			value = strings.Replace(value, "\r", "", -1)
			return value
		}
	}
	globals.ErrLogger.Println("Clé", key, "introuvable")
	return ""
}

func constructCreneau(creneau string) (Creneau, error) {
	tab := strings.Split(creneau, "\n")
	summary := getValueForKey("SUMMARY", tab)
	if summary == "" {
		return Creneau{}, errors.New("Creneau invalide")
	}
	location := getValueForKey("LOCATION", tab)
	if location == "" {
		return Creneau{}, errors.New("Creneau invalide")
	}
	description := getValueForKey("DESCRIPTION", tab)
	if description == "" {
		return Creneau{}, errors.New("Creneau invalide")
	}
	cr := Creneau{summary, location, description}
	return cr, nil
}

// GetCreneaux ..
func GetCreneaux() (list []Creneau) {
	fmt.Println("go parse...")
	edt := getEdt("5774,5776", "2015-10-19", "2015-10-25")
	tab := strings.Split(edt, "BEGIN:VEVENT")
	for _, creneau := range tab {
		cr, err := constructCreneau(creneau)
		if err == nil {
			list = append(list, cr)
		}
	}
	return list
}

// Test ..
func Test() {
	list := GetCreneaux()
	fmt.Println(list)
}
