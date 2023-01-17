
// object contianing city, state, startDate, & endDate
// data ={city:<CITY>, state:<STATE>, startDate:<SDATE>, endDate<EDATE>}
let data = JSON.parse(localStorage.getItem("timeLocation"));

// pulled from challenge
let apiBase = "https://api.openweathermap.org/";
let apiKey = "83a44da7964246bbf900a3b2168f29ce";
let apiBaseWeather = apiBase + "data/2.5/forecast?";
let apiBaseLatLon = apiBase + "geo/1.0/direct?";
let apiBaseToday = apiBase + "data/2.5/weather?";
let latLong;
let weatherRes;

let SGentries, TMentries

function getLatLon(geoJson, state) {
  for (let i=0; i<geoJson.length; i++) {
    if (geoJson[i]["state"] == state) {
      return [geoJson[i]["lat"].toFixed(2)
	      ,geoJson[i]["lon"].toFixed(2)];
    }
  }
  return console.log("State not found");
}

function pullStats(weatherEntry) {
  let entry = {date:"",
	       icon:"",
	       temp:"",
	       wind:"",
	       humidity:""
	      };
  let date = new Date(weatherEntry["dt"]*1000);
  entry["date"] = date.getFullYear()
    +'/'+('0'+(date.getMonth()+1)).slice(-2)
    +'/'+('0'+date.getDate()).slice(-2);
  entry["icon"] = weatherEntry["weather"][0]["icon"];
  entry["temp"] = weatherEntry["main"]["temp"];
  // add in line to get direction in NWSE
  entry["wind"] = weatherEntry["wind"]["speed"];
  entry["humidity"] = weatherEntry["main"]["humidity"];
  return entry;
}

function getWeather (){
  let apiLatLon = `${apiBaseLatLon}q=${data['city']},${data['state']}&limit=10&appid=${apiKey}`;
   fetch(apiLatLon)
    .then(response => response.json())
    .then((info) =>{
      latLong = getLatLon(info,data["state"]);
      let apiWeather = `${apiBaseWeather}lat=${latLong[0]}&lon=${latLong[1]}&units=imperial&appid=${apiKey}`;
      fetch(apiWeather)
	.then(response => response.json())
	.then((info) => {
	  localStorage.setItem("weatherResponse", JSON.stringify(data["list"]));
	  let weatherData = info["list"];
	  for (let i=0; i<weatherData.length; i++) {
	    let readingTime = (weatherData[i]["dt_txt"]).split(" ")[1];
	    if (readingTime === "12:00:00"){
	      buildForecast(pullStats(weatherData[i]));
	    }
	  }
	  let seatGeekBase = "https://api.seatgeek.com/2/events?";
	  let seatGeekClientID = "client_id=MzExMjU4NzF8MTY3MTU4MDU0NS4wMTgzOTY"
	  // for location lat/lon and range
	  // EX: geoip=98.213.245.205&range=12mi'
	  let latLonLocation = `lat=${latLong[0]}&lon=${latLong[1]}&range=25mi`;
	  let perPage = "per_page=25";
	  // format for date range
	  // EX: datetime_utc.gte=2012-04-01&datetime_utc.lte=2012-04-30
	  let dateAPI = `datetime_local.gte=${data["startDate"]}&datetime_local.lte=${data["endDate"]}`;
	  let seatGeekRequest = `${seatGeekBase}${latLonLocation}&${perPage}&${dateAPI}&${seatGeekClientID}`;

	  let TMBase = "https://app.ticketmaster.com/discovery/v2/events.json?";
	  let TMLatLon = `latlong=${latLong[0]},${latLong[1]}`;
	  let TMStartDate = data["startDate"];
	  let TMEndDate = data["endDate"];
	  let TMNumEvents = "size=25";
	  let TMSort = "sort=distance,asc";
	  let TMApiKey = "apikey=oecKLpxYpNXmLk9Tha8luRcIXq2AJS6d";
	  let ticketMasterRequest = `${TMBase}&${TMLatLon}&${TMStartDate}&${TMEndDate}&${TMNumEvents}&${TMSort}&${TMApiKey}`;
	  let requests = [seatGeekRequest, ticketMasterRequest];
	  const promises = requests.map((url) => fetch(url));
	  Promise.all(promises)
	    .then((data) => Promise.all(data.map((d) => d.json())))
	    .then((data) => {
	      let SGres = data[0]["events"];
	      let TMres = data[1]["_embedded"]["events"];
	      console.log(SGres);
	      console.log(TMres);
	      for (let i=0; i<SGres.length; i++) {
		console.log(i);
		buildEventTile(SGpullEventData(SGres[i]), "SeatGeek");
		buildEventTile(TMpullEventData(TMres[i]), "Ticket Master");
	      }
	    });
	});
    })
  let latLongObject = {latLon: latLong};
  data = Object.assign(data,latLongObject);
  //rewriting the data object
  localStorage.setItem("data",JSON.stringify(data));
  return 0;
}


function buildForecast (weather) {
  // reach into gloaal for weather variable
  let weekForecast = $("#weather-panel");
  let section = $("<section>");
  let date = $("<section>").text("DATE:");
  let icon = $("<img>");
  let temp = $("<section>");
  let wind = $("<section>");
  let humidity = $("<section>");

  date.text("Date: " + weather["date"]);
  icon.attr("src","http://openweathermap.org/img/wn/"+weather["icon"]+".png")
  temp.text("Temperature: " +weather["temp"]);
  wind.text("Wind speed: " + weather["wind"]);
  humidity.text("Humidity: " +weather["humidity"]);

  section.attr("class","box has-background-info has-text-black");
  section.attr("style","margin-bottom: 1.5rem; padding: 0.5rem;");
  section.append(date);
  section.append(icon);
  section.append(temp);
  section.append(wind);
  section.append(humidity);
  weekForecast.append(section);
  return 0;
}

function getSeatGeekData () {
  let seatGeekBase = "https://api.seatgeek.com/2/events?";
  let seatGeekClientID = "client_id=MzExMjU4NzF8MTY3MTU4MDU0NS4wMTgzOTY"
  // for location lat/lon and range
  // EX: geoip=98.213.245.205&range=12mi'
  let latLonLocation = `lat=${latLong[0]}&lon=${latLong[1]}&range=25mi`;
  let perPage = "per_page=25";
  // format for date range
  // EX: datetime_utc.gte=2012-04-01&datetime_utc.lte=2012-04-30
  let dateAPI = `datetime_local.gte=${data["startDate"]}&datetime_local.lte=${data["endDate"]}`;
  let seatGeekRequest = `${seatGeekBase}${latLonLocation}&${perPage}&${dateAPI}&${seatGeekClientID}`;
  let events = {};
  console.log(seatGeekRequest);
  fetch(seatGeekRequest)
    .then(response => response.json())
    .then((info) => {
      console.log("SEATGEEK");
      for (let j=0; j<info["events"].length; j++) {
	return  SGpullEventData(info["events"][j]);
	
      }
    });
  return 1;
}

function SGpullEventData(eventEntry) {
  let eventData = {title:"",
		   date:"",
		   time:"",
		   description:"",
		   picLink:"",
		   src:""};
  eventData["title"] = eventEntry["short_title"];
  eventData["date"] = eventEntry["datetime_local"].split("T")[0];
  eventData["time"] =  eventEntry["datetime_local"].split("T")[1];
  eventData["description"] = eventEntry["title"];
//<<<<<<< develop/tileInfo
  eventData["picLink"] =  eventEntry["performers"][0]["image"];
//=======

  // TODO Fill in Watch for copyright
  eventData["picLink"] =  eventEntry["performers"][0]["image"];

//>>>>>>> main
  eventData["src"] = eventEntry["url"];
  
  return eventData;
}

function getTicketMasterData() {
  let TMBase = "https://app.ticketmaster.com/discovery/v2/events.json?";
  let TMLatLon = `latlong=${latLong[0]},${latLong[1]}`;
  let TMStartDate = data["startDate"];
  let TMEndDate = data["endDate"];
  let TMNumEvents = "size=25";
  let TMSort = "sort=distance,asc";
  let TMApiKey = "apikey=oecKLpxYpNXmLk9Tha8luRcIXq2AJS6d";
  let ticketMasterRequest = `${TMBase}&${TMLatLon}&${TMStartDate}&${TMEndDate}&${TMNumEvents}&${TMSort}&${TMApiKey}`;
  console.log(ticketMasterRequest);
  fetch(ticketMasterRequest)
    .then(response => response.json())
    .then((data) => {
      let TMEventData = data["_embedded"]["events"];
      for (let k=0;k<TMEventData.length; k++) {
	return TMpullEventData(TMEventData[k]);
      }
    });
  return 1;
}

function TMpullEventData(eventEntry) {
  let eventData = {title:"",
		   date:"",
		   time:"",
		   description:"",
		   picLink:"",
		   src:""};
  eventData["title"] = eventEntry["name"];
  eventData["date"] = eventEntry["dates"]["start"]["localDate"];
  eventData["time"] = eventEntry["dates"]["start"]["localTime"];
  eventData["description"] = eventEntry["name"] +" "+ eventEntry["classifications"][0]["genre"]["name"];
  
  eventData["picLink"] = eventEntry["images"][0]["url"];
  eventData["src"] = eventEntry["url"];

  return eventData;
}

// from resultshtml.js
function buildEventTile (eventResults, source) {
  // Need to make componets
  // Need to nest them together
  // place in DOM
  // info in eventResulst has the following
  // -Title
  // -DateTime
  // -Description
  // -Picture linlk
  // -Source of event
  // -Ticket seller

  // build shell
  let resultList = document.querySelector(".results");
  let container = document.createElement("section");
  container.setAttribute("class", "box results");
  let resultTile = document.createElement("article");
  resultTile.setAttribute("class","media columns");

  // build picture elements
  let ePicEl = document.createElement("img");
  ePicEl.setAttribute("src", eventResults["picLink"]);
  let figureEl = document.createElement("figure");
  figureEl.setAttribute("class", "image is-64x64 media-left column is-one-quarter")

  // build title and datetime items
  let eTitleEl = document.createElement("section");
  let dateEl = document.createElement("div");
  dateEl.setAttribute("class", "date");
  dateEl.textContent = eventResults["date"];
  let timeEl = document.createElement("div");
  timeEl.setAttribute("class", "time");
  timeEl.textContent = eventResults["time"];
  let titleEl = document.createElement("div");
  titleEl.setAttribute("class", "title is-4");
  titleEl.textContent = eventResults["title"];
  let titleSectionEl = document.createElement("section");
  titleSectionEl.setAttribute("class", "content column is-two-fifths v-centered");
  let eSourceEl = document.createElement("a");
  eSourceEl.setAttribute("href", eventResults["src"]);
  eSourceEl.setAttribute("class" , "column v-centered");
  eSourceEl.textContent = eventResults["description"];
  let siteEl = document.createElement("section");
  siteEl.textContent = source;
  let infoEl = document.createElement("section");
  infoEl.setAttribute("class", "content column ");
  

  // build tile
  figureEl.append(ePicEl);
  resultTile.append(figureEl);
  titleSectionEl.append(titleEl);
  titleSectionEl.append(dateEl);
  titleSectionEl.append(timeEl);
  resultTile.append(titleSectionEl);
  infoEl.append(eSourceEl);
  infoEl.append(siteEl);
  resultTile.append(infoEl);
  resultList.append(resultTile);
  return 0;
}

let handleGrab = (event) => {
  let data = {};
  event.preventDefault();
  data["city"] = $("#city").val();
  let stateEl = document.getElementById("selectState");
  data["state"] = stateEl.options[stateEl.selectedIndex].value;
  data["startDate"] =  $("#startDate").val();
  data["endDate"] = $("#endDate").val();
  console.log(data);
  localStorage.setItem("timeLocation", JSON.stringify(data));
  window.location.href = "./results.html";
  return 0;
}

function main () {
  getWeather();
  let taglineEl = $("#tagline");
  taglineEl.text(`Things that are happening in ${data['city']}, ${data['state']}`);
}

$(".button").on('click',handleGrab);
main();

