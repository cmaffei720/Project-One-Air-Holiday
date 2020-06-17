var year = moment().year()

var obj = {}

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://public-holiday.p.rapidapi.com/"+year+"/US",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "public-holiday.p.rapidapi.com",
		"x-rapidapi-key": "778af56556msh60df0212f929a25p1bd6fajsn95b39208364f"
	}
}

$.ajax(settings).done(function (response) {
    for (i = 0; i < response.length; i++){
        var div = $("<div>")
        div.attr("class", "holiday")
        var button = $("<button>")
        var button2 = $("<button>")
        var name = response[i].name
        var date = response[i].date

        var date2 = moment(date).format("ll")
        
        console.log(date)

        if (moment() < moment(date)) {
        div.text(name + " falls on: " + date2)
        div.attr("data-name", response[i].name)

        button.attr("data-date", date)
        button.attr("class", "depart success button")
        button.text("Depart").css("color", "white").css("font-size", "12px")
        button.css("background-color", "green")
        button.css("border-style", "groove")
        button.css("border-width", "2px")
        button.css("border-color", "black")
        button.css("border-radius", "10%")
        button.css("margin", "5px")
        button.hover(function() {
            $(this).css("background-color", "lightgreen")
            $(this).css("color", "black")
        }, function() {
            $(this).css("background-color", "green")
            $(this).css("color", "white")
        })
        

        button2.attr("data-date", date)
        button2.text("Return").css("color", "white").css("font-size", "12px")
        button2.attr("class", "return success button")
        button2.css("background-color", "green")
        button2.css("border-style", "groove")
        button2.css("border-width", "2px")
        button2.css("border-color", "black")
        button2.css("border-radius", "10%")
        button2.css("margin", "5px")
        button2.hover(function() {
            $(this).css("background-color", "lightgreen")
            $(this).css("color", "black")
        }, function() {
            $(this).css("background-color", "green")
            $(this).css("color", "white")
        })
        

        $(".holiday-container").append(div)
        $(".holiday-container").append(button)
        $(".holiday-container").append(button2)
    }}

});

$(document).on("click", ".depart", function(){
    $("#departDate").val($(this).attr("data-date"))
})

$(document).on("click", ".return", function(){
    $("#returnDate").val($(this).attr("data-date"))
})


$("#search").on("click", function(){

    getFlights()
})

function getFlights() {

$("#reasults-container").empty()
$("#reasults-container").css("padding", "2px")
var origin = $("#originLocation").val()
console.log(origin)

var destination = $("#destinationLocation").val()
var departDate = $("#departDate").val()
var returnDate = $("#returnDate").val()
console.log(departDate)
console.log(returnDate)
console.log(origin)
console.log(destination)

var settings2 = {
	"async": true,
	"crossDomain": true,
    "url": "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/"+origin+"-sky/"+destination+"-sky/"+departDate+"?inboundpartialdate="+returnDate,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
		"x-rapidapi-key": "778af56556msh60df0212f929a25p1bd6fajsn95b39208364f"
	}
}

$.ajax(settings2).done(function (response) {
    console.log(response);

    let apicallback = response.Carriers

    for (let m=0; m<apicallback.length; m++) {
        obj[apicallback[m].CarrierId] = apicallback[m].Name
    }

    console.log(obj)

    if (response.Quotes.length === 0) {
        var flightDiv = $("<div>")
        flightDiv.text("Sorry, no flights match your criteria")
        $("#reasults-container").append(flightDiv)
    }

    else { for (i=0; i< response.Quotes.length; i++){
        var direct = response.Quotes[i].Direct
        var minprice = response.Quotes[i].MinPrice
        var carrier = obj[response.Quotes[i].OutboundLeg.CarrierIds[0]]
        var date = moment(response.Quotes[i].OutboundLeg.DepartureDate).format("LL")
        
        console.log("Direct: "+direct)
        console.log("Price: "+minprice)
        console.log("Carrier: "+carrier)
        console.log("Date: " +date)


        var flightDiv = $("<div>")
        var directDiv = $("<div>").text("Direct: "+direct)
        var priceDiv = $("<div>").text("Price: $"+minprice)
        var carrierDiv = $("<div>").text("Carrier: "+carrier)
        var dateDiv = $("<div>").text("Date: " +date)
        flightDiv.attr("class", "card")
        
        flightDiv.append(directDiv, priceDiv, carrierDiv, dateDiv)

        $("#reasults-container").append(flightDiv)
    }
    }
    
});

}


var cities = {
    "Akron":"CAK",
"Alamogordo":"ALM",
"Albany International Airport":"ALB",
"Albuquerque International Airport":"ABQ",
"Allentown":"ABE",
"Amarillo":"AMA",
"Anchorage International Airport":"ANC",
"Asheville":"AVL",
"Aspen":"ASE",
"Atlanta Hartsfield International Airport":"ATL",
"Atlantic City International Airport":"ACY",
"Augusta":"AGS",
"Augusta":"AUG",
"Austin Bergstrom International Airport":"AUS",
"Baltimore":"BWI",
"Bangor":"BGR",
"Baton Rouge":"BTR",
"Battlecreek":"BTL",
"Billings":"BIL",
"Birmingham International Airport":"BHM",
"Bismark":"BIS",
"Boise":"BOI",
"Boston, Logan International Airport":"BOS",
"Bristol":"TRI",
"Buffalo":"BUF",
"Burbank":"BUR",
"Burlington":"BTV",
"Casper":"CPR",
"Cedar Rapids":"CID",
"Charleston":"CHS",
"Charleston":"CRW",
"Charlotte/Douglas International Airport":"CLT",
"Chattanooga":"CHA",
"Cheyenne":"CYS",
"Chicago Midway Airport":"MDW",
"Chicago, O'Hare International Airport Airport":"ORD",
"Cincinnati":"CVG",
"Clarksburg":"CKB",
"Cleveland":"CLE",
"Colorado Springs":"COS",
"Columbia":"CAE",
"Columbus":"CMH",
"Corpus Christi":"CRP",
"Dallas Love Field Airport":"DAL",
"Dallas/Fort Worth International Airport":"DFW",
"Dayton":"DAY",
"Daytona Beach":"DAB",
"Denver International Airport":"DEN",
"Des Moines":"DSM",
"Detroit Metropolitan Airport":"DTW",
"Detroit":"DET",
"Dothan Regional Airport":"DHN",
"Dulles":"IAD",
"Duluth":"DLH",
"El Paso":"ELP",
"Erie":"ERI",
"Eugene":"EUG",
"Evansville":"EVV",
"Fairbanks International Airport":"FAI",
"Fargo":"FAR",
"Fayetteville":"FAY",
"Fayetteville":"FYV",
"Flagstaff":"FLG",
"Flint":"FNT",
"Fort Lauderdale-Hollywood International Airport":"FLL",
"Fort Meyers":"RSW",
"Fort Wayne":"FWA",
"Fresno":"FAT",
"Grand Junction":"GJT",
"Grand Rapids":"GRR",
"Green Bay":"GRB",
"Greensboro":"GSO",
"Greenville":"GSP",
"Gulfport":"GPT",
"Harrisburg":"MDT",
"Hartford":"BDL",
"Hilo":"ITO",
"Honolulu International Airport":"HNL",
"Houston, George Bush Intercontinental Airport":"IAH",
"Houston, William B Hobby Airport":"HOU",
"Huntington Tri-State Airport":"HTS",
"Huntsville International Airport":"HSV",
"Hyannis":"HYA",
"Indianapolis International Airport":"IND",
"Islip":"ISP",
"Jackson Hole":"JAC",
"Jackson":"JAN",
"Jacksonville":"JAX",
"Juneau International Airport":"JNU",
"Kahului":"OGG",
"Kailua":"KOA",
"Kalamazoo-Battle Creek International Airport":"AZO",
"Kansas City":"MCI",
"Key West International Airport":"EYW",
"Knoxville":"TYS",
"Lansing":"LAN",
"Las Vegas, Las Vegas McCarran International Airport":"LAS",
"Lexington":"LEX",
"Lihue":"LIH",
"Lincoln":"LNK",
"Little Rock National Airport":"LIT",
"Long Beach":"LGB",
"Los Angeles International Airport":"LAX",
"Louisville":"SDF",
"Lubbock":"LBB",
"Madison":"MSN",
"Manchester":"MHT",
"Memphis":"MEM",
"Miami International Airport":"MIA",
"Midland":"MAF",
"Milwaukee":"MKE",
"Minneapolis/St.Paul International Airport":"MSP",
"Mobile":"MOB",
"Moline":"MLI",
"Montgomery":"MGM",
"Montpelier":"MPV",
"Myrtle Beach":"MYR",
"Nantucket":"ACK",
"Nashville":"BNA",
"New Mexico":"NM",
"New Orleans International Airport":"MSY",
"New York, John F Kennedy International Airport":"JFK",
"New York, La Guardia Airport":"LGA",
"Newark International Airport":"EWR",
"Newburgh":"SWF",
"Newport News":"PHF",
"Norfolk":"ORF",
"Northwest Arkansas Regional Airport":"XNA",
"Oakland":"OAK",
"Oklahoma City":"OKC",
"Omaha":"OMA",
"Ontario":"ONT",
"Orlando":"MCO",
"Palm Springs":"PSP",
"Panama City-Bay County International Airport":"PFN",
"Pasco, Pasco/Tri-Cities Airport":"PSC",
"Pensacola":"PNS",
"Peoria":"PIA",
"Philadelphia":"PHL",
"Phoenix, Phoenix Sky Harbor International Airport":"PHX",
"Pierre":"PIR",
"Pittsburgh":"PIT",
"Portland International Airport":"PDX",
"Portland":"PWM",
"Portland, Hillsboro Airport":"HIO",
"Providence - T.F. Green Airport":"PVD",
"Pueblo":"PUB",
"Raleigh":"RDU",
"Rapid City":"RAP",
"Reno-Tahoe International Airport":"RNO",
"Richmond":"RIC",
"Roanoke":"ROA",
"Rochester":"ROC",
"Rochester":"RST",
"Rock Springs":"RKS",
"Rutland":"RUT",
"Sacramento":"SMF",
"Saginaw":"MBS",
"Salem":"SLE",
"Salt Lake City":"SLC",
"San Antonio International Airport":"SAT",
"San Diego":"SAN",
"San Francisco International Airport":"SFO",
"San Jose":"SJC",
"Santa Ana":"SNA",
"Sarasota":"SRQ",
"Savannah":"SAV",
"Scranton":"AVP",
"Seattle, Tacoma International Airport":"SEA",
"Shreveport":"SHV",
"Sioux Falls":"FSD",
"South Bend":"SBN",
"Spokane International Airport":"GEG",
"Springfield":"SGF",
"St Louis, Lambert International Airport":"STL",
"St. Petersburg":"PIE",
"Syracuse":"SYR",
"Tampa":"TPA",
"Toledo":"TOL",
"Trenton":"TTN",
"Tucson International Airport":"TUS",
"Tulsa":"TUL",
"Tweed New Haven":"HVN",
"Washington National Airport":"DCA",
"Washington, Dulles International Airport":"IAD",
"West Palm Beach":"PBI",
"Westchester":"HPN",
"Wichita":"ICT",
"Winston-Salem":"INT",
"Worcester":"ORH",
"Yuma International Airport":"YUM",
}

var cityArray = Object.keys(cities)


for (i=0; i<cityArray.length; i++){
    //console.log(cities[cityArray[i]])
    var a = $("<option>")
    a.attr("value", cities[cityArray[i]])
    a.text(cityArray[i])
    var b = $("<option>")
    b.attr("value", cities[cityArray[i]])
    b.text(cityArray[i])
    $("#originLocation").append(a)
    $("#destinationLocation").append(b)
}

