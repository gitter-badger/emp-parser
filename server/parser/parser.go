package parser

import (
	"emp-parser/server/globals"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"
)

// GetCreneaux ..
func GetCreneaux() (list []globals.Creneau) {
	startDate := GetTodayDateString()
	endDate := GetAfterDateString(21)
	fmt.Println("go parse ", startDate, "to", endDate, "...")
	edt := GetEdt(GetListAllRessources(), startDate, endDate)
	tab := strings.Split(edt, "BEGIN:VEVENT")
	for _, creneau := range tab {
		//fmt.Println("Construct for " + creneau)
		cr, err := constructCreneau(creneau)
		if err == nil {
			list = append(list, cr)
		}
	}
	fmt.Println("Liste contruite!")
	return list
}

// GetTodayDateString dlf 2015-11-02
func GetTodayDateString() string {
	nowDate := time.Now()
	return getStringDate(nowDate)
}

// GetAfterDateString dlf GetTodayDateString() + days
func GetAfterDateString(addDays int) string {
	nowDate := time.Now()
	afterDate := nowDate.AddDate(0, 0, addDays)
	return getStringDate(afterDate)
}

func getStringDate(date time.Time) string {
	s := fmt.Sprintf("%s", date)
	splited := strings.Split(s, " ")
	return splited[0]
}

// GetListAllRessources ..
func GetListAllRessources() string {
	//return "537,538,1702,1767,1872,1958,1959,2016,411,2843,2853,724,3073,182,295,487,811,846,1762,1764,1830,1906,1981,1989,1993,1998,2011,2037,2146,3315,3330,1871,291,1954,1901,1903,1780,1798,1799,1801,2044,679,1680,1681,4779,4793,5456,5458,3,1750,5770,5863,5865,5885,2111,1797,2113,2183,1782,2193,2221,2223,2245,2247,2248,2249,2251,2255,2256,2257,2258,2259,2282,2313,2314,2320,2321,2801,1061,3008,871,872,3070,3071,1576,3257,384,1060,674,1476,1503,1486,1510,1509,669,447,448,450,451,1711,1713,1715,1717,1719,1721,1724,1726,1776,1777,319,1779,1792,1800,1899,1822,3249,1829,1839,1948,4414,288,522,523,529,292,536,540,541,543,546,550,552,620,621,622,623,670,671,730,735,469,471,473,1991,1992,481,798,800,821,485,1947,1960,1961,1962,1963,356,498,506,2009,507,518,3893,3894,271,3896,3910,3921,3968,3970,3973,3974,3975,3987,3988,145,149,168,175,4039,4042,232,4046,4049,4052,201,4055,215,4058,257,4065,4072,280,1634,4082,4094,4099,4100,4101,3888,3889,3890,3891,1980,1986,1985,1988,1995,1996,2338,2290,1997,1999,2163,2165,2166,2170,2171,2046,779,3289,3291,3346,3512,3515,3516,3520,3522,3524,3526,3529,3531,3543,1787,1790,1794,2027,3879,4431,4544,4670,2,524,527,531,542,562,565,4741,4743,4752,4826,4828,4831,4833,4835,4840,4842,4850,4852,4869,44,46,47,48,4882,4884,4886,4888,4890,4893,4896,4898,4900,1572,4905,4909,4913,4915,4917,5884,4921,4925,1568,4929,4931,5441,5452,5454,5676,5678,5680,5682,5684,5686,5688,5690,5692,5694,5696,5698,5700,5702,5704,5868,5707,5709,551,5711,5713,5870,5716,528,5719,5722,5724,5726,5728,5730,5732,5734,5736,1786,5739,5741,5743,5745,5872,5874,5876,5878,5880,5755,5757,5887,5889,5891,5893,5895,5897,5760,5763,5766,5768,5788,5790,5793,5795,5797,5799,5801,5803,5805,5807,5882,5810,5812,5815,5817,5819,5821,5823,5826,5828,5830,5832,5835,5837,5839,5841,5843,5883,5847,5849,1862,5852,5854,5857,5859,5861,2457,2491,3252,2762,2785,387,1868,2067,3040,3041,3052,3053,780,785,1773,3067,641,696,643,652,654,659,661,663,1511,1535,1522,1478,1485,1733,1735,1737,1740,1742,1500,3250,1828,1836,270,278,305,310,476,772,773,781,479,789,796,797,3892,4,196,197,3895,45,49,3911,3920,202,203,204,206,207,208,76,77,79,3971,3972,84,85,92,88,95,101,107,108,110,111,112,3976,3977,114,115,116,119,138,139,141,142,143,146,147,148,152,153,154,156,157,159,161,162,163,4036,219,165,166,167,171,172,173,184,185,186,189,190,191,193,194,195,210,211,212,214,217,220,222,223,224,226,227,228,230,233,234,236,237,238,241,244,247,256,258,259,4069,263,249,252,253,264,265,266,275,277,312,313,307,308,301,303,316,318,3886,66,1506,1508,4689,4725,4801,4796,4798,4818,4822,4824,5748,5751,5774,5776,5779,5781,5784,5786,3254,1976,1987,419,1676,2024,396,398,2880,2887,2889,412,414,415,2899,2922,400,401,405,407,2992,645,648,51,55"
	return "2375,2381,4359,3329,3335,3338,2393,4390,4392,3365,4496,4645,4646,4758,3547,5475,5478,2544,5576,5650,5669,5671,6118,2571,2639,6017,6113,6115,6117,2582,2109,2118,2120,2124,2237,2095,2261,2264,2266,2094,2153,2155,2157,2159,2214,2218,2220,2225,2229,2232,2180,2186,2299,4581,2301,4582,2303,4583,4587,2305,4588,2307,4589,4339,4340,4345,4352,4353,4357,4358,2197,2201,2209,2211,2309,2281,2284,2289,2293,2295,2297,2269,2271,2273,2276,2278,4201,4206,4210,4214,4225,4228,3721,3875,4231,4232,4234,4235,4236,3673,3877,4238,4239,4240,4241,4242,3670,3876,4249,4250,4251,4253,4299,4301,4302,4303,4341,4351,4375,4387,4425,3723,4488,4491,4492,4493,4184,4186,4183,4193,2394,3881,3902,3917,3953,3924,4415,4416,4439,4444,4768,4770,4772,4774,4506,4508,4521,4599,4620,4654,4657,4663,4674,4684,4806,4808,4815,4819,4844,4849,2387,4862,2388,4873,5438,5439,3567,5442,5445,5447,5449,3255,3310,3314,2160,5471,2164,5473,4446,5482,5484,5486,5488,5490,5492,5494,5496,5498,5500,5502,5504,5506,5508,5510,5513,5515,2591,5517,5519,5522,2557,5524,5525,5527,5528,5530,5532,5534,5536,5538,5540,5542,2466,2468,5547,5549,5551,38,5566,5569,5572,5574,5594,5596,5599,5601,5603,5605,5607,5609,5611,5613,42,5616,43,5618,5621,5623,5625,5627,5629,5632,5634,5636,5638,5641,5643,5645,5647,5649,5653,5655,5658,5660,5663,5665,5667,5901,5903,5905,5907,5909,5911,5913,5915,5917,5919,5921,5923,5925,5927,5929,5931,5934,5936,5938,5940,5942,5945,5947,5949,5951,5953,5955,5957,5959,5961,5963,5966,5968,5970,5972,5979,5981,5983,5985,5987,5990,5992,5994,5996,5998,6000,6002,6004,6007,6010,6035,6037,6040,6042,6044,6046,6048,6050,6052,6054,6056,6059,6061,6064,6066,6068,6070,6072,6075,6077,6079,6081,6084,6086,6088,6090,6092,6094,6097,6099,6102,6104,6107,6109,6111,2087,2099,2241,2244,2148,2151,2162,2169,2188,2178,3990,2190,2192,2205,2207,4384,4385,3816,2246,2252,2254,2263,3726,3727,4424,4434,4435,4442,4443,3885,3978,3898,3983,3931,3933,2312,2322,4895,2287,5433,5435,3312,5462,5465,5468,4197,2041,3663,3665,2053,2068,2414,2097,2122,2127,2420,4015,2143,2145,4098,2471,5545,5554,5556,5557,2463,2465,2473,2475,2477,2482,2484,5561,5580,5582,5585,5587,5590,5592,5975,5977,6021,6023,6026,6028,6031,6033,3679,3678,3722,3771,3772,3799,3800,3801,3802,3803,3804,3811,3812,3814,3744,3749,3750,3751,3752,3753,3755,3756,3759,3768,3769,3682,3683,3667,3686,3687,3688,3724,3728,3731,3739,3740,3741,3742,3680,3681,3930,4170,4146,4179,4157,4182,2010,3623,2032,3652,3635,3654,3637,3655,2091,3644,3646,2093,3369,3393,2101,2107,2117,2130,4023,2134,4114"
}

// GetListTestRessources ..
func GetListTestRessources() string {
	return "5788,5790,5774,5776,5779,5781,5784,5786"
}

// GetEdt ..
// https://planning-ade.umontpellier.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=5788,5790,5774,5776,5779,5781,5784,5786&projectId=21&calType=ical&nbWeeks=4
func GetEdt(resources string, firstDate string, lastDate string) string {
	url := "https://planning-ade.umontpellier.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=" +
		resources + "&projectId=21&calType=ical&firstDate=" + firstDate + "&lastDate=" + lastDate

	fmt.Println("url = " + url)
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

func constructCreneau(creneau string) (globals.Creneau, error) {
	tab := strings.Split(creneau, ":")
	summary := getValueForKey("SUMMARY", tab)
	if summary == "" {
		return globals.Creneau{}, errors.New("Creneau invalide (SUMMARY)")
	}
	location := getValueForKey("LOCATION", tab)
	if location == "" {
		return globals.Creneau{}, errors.New("Creneau invalide (LOCATION)")
	}
	description := getValueForKey("DESCRIPTION", tab)
	if description == "" {
		return globals.Creneau{}, errors.New("Creneau invalide (DESCRIPTION)")
	}
	dateStart := getValueForKey("DTSTART", tab)
	if dateStart == "" {
		return globals.Creneau{}, errors.New("Creneau invalide (DTSTART)")
	}
	dateEnd := getValueForKey("DTEND", tab)
	if dateEnd == "" {
		return globals.Creneau{}, errors.New("Creneau invalide (DTEND)")
	}
	lastModified := getValueForKey("LAST-MODIFIED", tab)
	if lastModified == "" {
		return globals.Creneau{}, errors.New("Creneau invalide (LAST-MODIFIED)")
	}
	cr := globals.Creneau{summary, location, description, getTimestampFromStringDate(dateStart), getTimestampFromStringDate(dateEnd), getTimestampFromStringDate(lastModified)}
	return cr, nil
}

// date dlf 20151102T140000Z
func getTimestampFromStringDate(date string) int {
	year, _ := strconv.Atoi(date[0:4])
	month, _ := strconv.Atoi(date[4:6])
	day, _ := strconv.Atoi(date[6:8])

	hour, _ := strconv.Atoi(date[9:11])
	minute, _ := strconv.Atoi(date[11:13])

	//fmt.Println(year, month, day, hour, minute)

	t := time.Date(year, time.Month(month), day, hour, minute, 0, 0, time.UTC)
	ts := int(t.Unix())
	//fmt.Println(ts)
	return ts
}

func getValueForKey(key string, tab []string) string {
	for i, line := range tab {
		attrs := strings.Split(line, ":")
		if strings.Contains(attrs[0], key) {
			return cleanRow(tab[i+1], key == "DESCRIPTION")
		}
	}
	globals.ErrLogger.Println("Clé", key, "introuvable")
	return ""
}

func cleanRow(value string, isDescription bool) string {
	values := strings.Split(value, "\n")
	if !isDescription {
		value = values[0]
	} else {
		value = ""
		for i, v := range values {
			decal := 1
			if i == 0 {
				decal = 2
			}
			value += v[decal:len(v)]
		}
	}
	value = strings.Replace(value, "\n", "", -1)
	value = strings.Replace(value, "\\n", "", -1)
	value = strings.Replace(value, "\\", "", -1)
	value = strings.Replace(value, "\r", "", -1)
	value = strings.Replace(value, "(Exporté le", "", -1)
	return value
}
