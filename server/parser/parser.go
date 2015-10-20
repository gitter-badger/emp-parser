package parser

import (
	"emp-parser/server/globals"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

func getEdt() string {
	resp, err := http.Get("http://www.tom2ade.univ-montp2.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=5774,5776&projectId=1&calType=ical&firstDate=2015-10-19&lastDate=2015-10-25")
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
		//fmt.Println("Line = ", line)
		if attrs[0] == key {
			//fmt.Println("Return", attrs[1])
			value := attrs[1]
			value = strings.Replace(value, "\n", "", -1)
			value = strings.Replace(value, "\r", "", -1)
			return value
		}
	}
	//globals.ErrLogger.Println("Clé", key, "introuvable dans", tab)
	return ""
}

func constructCreneau(creneau string) {
	tab := strings.Split(creneau, "\n")
	summary := getValueForKey("SUMMARY", tab)
	location := getValueForKey("LOCATION", tab)
	description := getValueForKey("DESCRIPTION", tab)
	cr := Creneau{summary, location, description}
	fmt.Println(cr)
}

// Parse ..
func Parse() {
	fmt.Println("go parse...")
	edt := getEdt()
	tab := strings.Split(edt, "BEGIN:VEVENT")
	for _, creneau := range tab {
		constructCreneau(creneau)
	}
}
