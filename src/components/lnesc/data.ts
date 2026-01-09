export interface Location {
  id: string;
  name: string;
  address: string[];
  phone: string;
  lat: number;
  lng: number;
  isHQ: boolean;
  stateCode: string;
  url: string;
}

export const locations: Location[] = [
  {
    id: "hq",
    name: "National Office",
    address: ["1150 18th St NW #275", "Washington, DC 20036"],
    phone: "(202) 835-9646",
    lat: 36.9045344,
    lng: -76.1919821,
    isHQ: true,
    stateCode: "DC",
    url: "https://www.lnesc.org/about/lnesc/"
  },
  {
    id: "albuquerque",
    name: "Albuquerque",
    address: ["625 Silver Ave SW, Suite 130", "Albuquerque, NM 87120"],
    phone: "(505) 243-3787",
    lat: 35.0834,
    lng: -106.6550,
    isHQ: false,
    stateCode: "NM",
    url: "https://www.lnesc.org/centers/albuquerque/"
  },
  {
    id: "austin",
    name: "Austin",
    address: ["2124 E. 6th St. Unit 101", "Austin TX, 78745"],
    phone: "(818) 631-4557",
    lat: 30.2535,
    lng: -97.7193,
    isHQ: false,
    stateCode: "TX",
    url: "https://www.lnesc.org/centers/austin/"
  },
  {
    id: "bayamon",
    name: "Bayamón",
    address: ["Universidad Interamericana", "500 Dr. John Will Harris", "Bayamón, PR 00957"],
    phone: "(787) 279-1912",
    lat: 18.3985,
    lng: -66.1572,
    isHQ: false,
    stateCode: "PR",
    url: "https://www.lnesc.org/centers/bayamon/"
  },
  {
    id: "colorado_springs",
    name: "Colorado Springs",
    address: ["4112 E. Bijou St.", "Colorado Springs, CO 80909"],
    phone: "(719) 635-6542",
    lat: 38.8350,
    lng: -106.27,
    isHQ: false,
    stateCode: "CO",
    url: "https://www.lnesc.org/centers/colorado_springs/"
  },
  {
    id: "corpus_christi",
    name: "Corpus Christi",
    address: ["400 Mann Street, Suite 513", "Corpus Christi, TX 78401-2047"],
    phone: "(361) 883-5134",
    lat: 28.6346,
    lng: -97.3964,
    isHQ: false,
    stateCode: "TX",
    url: "https://www.lnesc.org/centers/corpus_christi/"
  },
  {
    id: "dallas",
    name: "Dallas",
    address: ["345 S. Edgefield Avenue", "Dallas, Texas 75208"],
    phone: "(214) 943-2528",
    lat: 32.7455,
    lng: -100.65,
    isHQ: false,
    stateCode: "TX",
    url: "https://www.lnesc.org/centers/dallas/"
  },
  {
    id: "el_paso",
    name: "El Paso",
    address: ["Julian Tellez Sr. Senior Citizens Community Center", "8908 Old County", "El Paso, Texas 79907"],
    phone: "",
    lat: 32.2000,
    lng: -96.784,
    isHQ: false,
    stateCode: "TX",
    url: "https://www.lnesc.org/centers/elpaso/"
  },
  {
    id: "houston",
    name: "Houston",
    address: ["6200 Gulf Freeway, Suite 106", "Houston, Texas 77023"],
    phone: "(713) 236-0620",
    lat: 29.7011,
    lng: -95.2885,
    isHQ: false,
    stateCode: "TX",
    url: "https://www.lnesc.org/centers/houston/"
  },
  {
    id: "kansas_city",
    name: "Kansas City",
    address: ["148 N. Topping Avenue", "Kansas City, MO 64123"],
    phone: "(816) 581-5683",
    lat: 39.1195,
    lng: -92.0000,
    isHQ: false,
    stateCode: "MO",
    url: "https://www.lnesc.org/centers/kansas_city/"
  },
  {
    id: "miami",
    name: "Miami",
    address: ["14750 S.W. 26th Street, Suite 201", "Miami, Florida 33185"],
    phone: "(305) 554-8566",
    lat: 27.2500,
    lng: -80.4200,
    isHQ: false,
    stateCode: "FL",
    url: "https://www.lnesc.org/centers/miami/"
  },
  {
    id: "oxnard",
    name: "Oxnard",
    address: ["Channel Islands High School", "1400 Raiders Way", "Oxnard, CA 93033"],
    phone: "(818) 631-4557",
    lat: 35.6000,
    lng: -119.0500,
    isHQ: false,
    stateCode: "CA",
    url: "https://www.lnesc.org/centers/oxnard/"
  },
  {
    id: "philadelphia",
    name: "Philadelphia",
    address: ["2463 Emerald Street", "Philadelphia, PA 19125"],
    phone: "(215) 423-4811",
    lat: 41.4000,
    lng: -78.5000,
    isHQ: false,
    stateCode: "PA",
    url: "https://www.lnesc.org/centers/philadelphia/"
  },
  {
    id: "pueblo",
    name: "Pueblo",
    address: ["609 North Erie Avenue", "Pueblo, CO 81001"],
    phone: "(719) 637-0037",
    lat: 38.2690,
    lng: -104.6099,
    isHQ: false,
    stateCode: "CO",
    url: "https://www.lnesc.org/centers/pueblo/"
  },
  {
    id: "san_antonio",
    name: "San Antonio",
    address: ["342 W Woodlawn Ave Ste, 201", "San Antonio, TX 78212"],
    phone: "(210) 226-2772",
    lat: 30.92,
    lng: -102.4411,
    isHQ: false,
    stateCode: "TX",
    url: "https://www.lnesc.org/centers/sanantonio/"
  },
  {
    id: "san_diego",
    name: "San Diego",
    address: ["2363 Needham Rd. Suite #155", "El Cajon, CA. 92020"],
    phone: "(619) 303-0726",
    lat: 34.2000,
    lng: -116.8900,
    isHQ: false,
    stateCode: "CA",
    url: "https://www.lnesc.org/centers/san_diego/"
  },
  {
    id: "vancouver",
    name: "Vancouver",
    address: ["Evergreen High School", "14300 NE 18TH Street", "Vancouver, WA 98684"],
    phone: "(360) 604-3758",
    lat: 47.6000,
    lng: -122.4000,
    isHQ: false,
    stateCode: "WA",
    url: "https://www.lnesc.org/centers/vancouver/"
  },
  {
    id: "puertorico",
    name: "Puerto Rico",
    address: ["Paseo Covadonga 54", "Ponce, PR 00717"],
    phone: "(787) 259-8922",
    lat: 18.0,
    lng: -66.6,
    isHQ: false,
    stateCode: "PR",
    url: "https://www.lnesc.org/centers/puerto-rico/"
  }
];

export const activeStates = [
  "WA", "CA", "NM", "CO", "TX", "MO", "FL", "PA", "DC", "PR"
];