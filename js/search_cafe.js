// Funktion zur Berechnung der Luftlinie zwischen zwei Koordinaten
/*
function calc_crow_distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.609344;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}
*/	

function calc_crow_distance(lat1, lon1, lat2, lon2, unit) 
    {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }

var map;
var service;
var infowindow;
var user_latitude;
var user_longitude;
var search_radius;
var cafes_found_array = [];
var winner_cafe_is_cw_approved;

// Funktion zum abrufen der aktuellen User-Postion; Wird durch den Cafe Suchen-Button aufgerufen
function getPosition() {

	document.getElementById("cafe-search-button").disabled = true; //deaktivere Cafe Suchen-Button, um Button-Spam zu minimieren

	// Leere vorherigen Output, falls vorhanden
	document.getElementById("winner_cafe_display_name").innerHTML = '';
	document.getElementById("winner_cafe_cw_approval").innerHTML = '';
	document.getElementById("searchlog-user-coords").innerHTML = '';
	document.getElementById("cafe_list").innerHTML = '';
	document.getElementById("searchlog-radius").innerHTML = '';
	document.getElementById("searchlog-cw-approved").innerHTML = '';
	document.getElementById("searchlog-user-coords").innerHTML = '';
	document.getElementById("searchlog-rating").innerHTML = '';
	winner_cafe_vicinity.innerHTML = '';
	winner_cafe_stars.innerHTML = '';
	winner_cafe_rating_numbers.innerHTML = '';
	winner_cafe_subheader_two.innerHTML = '';
	winner_cafe_google_nav.innerHTML = '';
	winner_cafe_coords.innerHTML = '';

	// Überprüfe Opt In
	if (document.getElementById("user-opt-in").checked == true) {

		document.getElementById("wrapper-opt-in").style.color = '#767676';
		document.getElementById("winner_cafe_display_name").innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

		// Rufe Geolocation 
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getCafes); // Rufe Funktion getCafes mit Geoposition auf
		} else { 
			document.getElementById("winner_cafe_display_name").innerHTML = "Fehler";
			document.getElementById("winner_cafe_vicinity").innerHTML = 'Geolocation wird von deinem Browser nicht unterstützt';
			document.getElementById("cafe-search-button").disabled = false;
		}
	
	} else {
		document.getElementById("cafe-search-button").disabled = false;
		document.getElementById("wrapper-opt-in").style.color = 'red';
	}
}

// Funktion getCafes konstruiert die Abfrage für die Places API
function getCafes(position) {

	user_latitude = position.coords.latitude;
	user_longitude = position.coords.longitude;
  	document.getElementById("searchlog-user-coords").innerHTML = "Deine Position: " + user_latitude + " | " + user_longitude;

  	// Initiiere Google Maps-Karte
  	var user_location = new google.maps.LatLng(user_latitude,user_longitude);
	map = new google.maps.Map(document.getElementById('map'), {
	    center: user_location,
	    zoom: 15
	});

	// Hole Filter-Wert: Umrechnung Minuten zu Meter (5km/h Gehgeschwindigkeit)
	search_radius = Math.round(slider_user_input*85.333);
  	document.getElementById("searchlog-radius").innerHTML = "Google Maps Radius: " + slider_user_input + " Minuten * 5km/h = " + search_radius + " Meter";

  	// Hole Filter-Wert: Cafe geöffnet?
	user_input_cafe_open = document.getElementById("cafe-open-switch").className
	if (user_input_cafe_open == "fas fa-door-open cw-filter-off"){
  		document.getElementById("searchlog-open").innerHTML = "";
	} else {
  		document.getElementById("searchlog-open").innerHTML = "Nur geöffnete Cafés";
	}

  	// Hole Filter-Wert: Coffee Walk Empfehlung?
	user_input_cw_approved = document.getElementById("cw-approved-switch").className
	if (user_input_cw_approved == "fas fa-award cw-filter-off"){
  		document.getElementById("searchlog-cw-approved").innerHTML = "";
	} else {
  		document.getElementById("searchlog-cw-approved").innerHTML = "...davon werden nur von Coffee Walk empfohlene Cafés berücksichtigt";
	}

	// Hole Filter-Wert: Google Bewertung?
  	document.getElementById("searchlog-rating").innerHTML = "...davon werden nur Cafés mit einer Google-Bewertung von mind. " + user_input_star_rating + " Sternen berücksichtigt";

  	// Definiere Parameter
	suchwort = 'coffee special';
	suchtyp = 'cafe';

	//Konstruiere Places API-Call für Secret Mode und Normal
  	if (user_input_cafe_open == 'fas fa-door-open cw-filter-off'){
	  	var request = {
	    	location: user_location,
	    	radius: search_radius,
	    	keyword: suchwort,
	    	type: suchtyp
	  	};
	} else {
		var request = {
	    	location: user_location,
	    	radius: search_radius,
	    	keyword: suchwort,
	    	type: suchtyp,
			openNow: 'True'
	  	};
	}

  	service = new google.maps.places.PlacesService(map);

  	//cafes_found_array 
  	cafes_found_array = []

  	//Rufe die Places API Nearby Search Funktion auf
  	service.nearbySearch(request, callback);
}

//Places API Nearby Search Funktion
function callback(results, status, pagetoken) {

	// Prüfe API Status
	if (status == google.maps.places.PlacesServiceStatus.OK) {

	  	var cafes_found = results.length
		cafe_list.innerHTML = "Cafés im Radius gefunden: " + cafes_found
		cafes_found_array.push(results)

	  	// Pagination: Wenn es mehr als 20 Ergebnisse gibt
		if (pagetoken.hasNextPage) {
	   		next_page_token = pagetoken.nextPage();
		} else {
			// Wenn keine weiteren Ergebnisse mehr gefunden werden, wird die Funktion zur Ziehung eines Cafés aufgerufen
			draw_random_cafe();
		}

	} else {
	  	document.getElementById("winner_cafe_display_name").innerHTML = "Kein Café gefunden";
		document.getElementById("winner_cafe_vicinity").innerHTML = 'Für deine Sucheinstellungen wurden auf Google keine Cafés gefunden.';
		document.getElementById("cafe-search-button").disabled = false; // aktiviere Suchknopf wieder
	}
}
		    	
// Funktion zum ziehen eines zufälligen Cafés
function draw_random_cafe(){

	//Merge Array of Arrays falls durch Pagination erzeugt
	const merged_array = cafes_found_array.flat(1); 
	console.log('Found cafes array', merged_array)
				  	
  	// Zufällige Sortierung in einem Array von Zahlen (Lostrommel)
	merged_array_length = merged_array.length
	var random_numbers = Array.from(Array(merged_array_length).keys())
	random_numbers = random_numbers.sort(function() { return 0.5 - Math.random();})
	console.log('Random array', random_numbers)

	var winner_number
	var winner_number_found = false

	// Gehe über alle Elemente des Arrays
	while (random_numbers.length > 0 && winner_number_found === false){

		// Es wird eine Nummer aus der Lostrommel gezogen
		var drawn_number = random_numbers.pop();
		console.log('Drawn Number: ' + drawn_number)

		if (typeof merged_array[drawn_number] === 'undefined'){
			console.log('Drawn number did not match.')
		} else {
			// Prüfe Rating
			rating_cafe = Math.round(merged_array[drawn_number].rating)

			if (rating_cafe >= user_input_star_rating) {
				console.log('Rating matches')

				// Prüfe Luftlinie
	  			var cafe_location = merged_array[drawn_number].geometry.location;
				var cafe_latitude = cafe_location.lat();
				var cafe_longitude = cafe_location.lng();
				var crow_distance = calc_crow_distance(cafe_latitude, cafe_longitude, user_latitude, user_longitude,"K");
				console.log('crow_distance', crow_distance)
				console.log('search_radius', search_radius)

				if (crow_distance*1000 <= search_radius) {
					console.log('Distance matches')
					//console.log('Luftlinie:' + crow_distance*1000)
					//console.log('Search Radius:' + search_radius)

					//Prüfe CW Approval
					user_input_cw_approved = document.getElementById("cw-approved-switch").className

					var cw_approved_cafes_list = [
					  "ChIJ44JVHKlet0cRgJd8vuz3FCs" // Cafe Ole Neuenkirchen-Vörden
					  , "ChIJHbiNcWkJvUcR_fXme3B2Gxk" // Fridas Cafe FFM
					  , "ChIJ5-5FWnAJvUcR-LtbHSfCZ-k" // Cafe Heimelig FFM
					  , "ChIJv12D5rYPvUcRxcM7FVTCLGI" // Under Pressure FFM
					  , "ChIJ3RyoRyAPvUcR16V0XoQ_feo" // drei FFM
					  , "ChIJ3Ygb90APvUcRtIx6cq-erUo" // Hopplo Altstadt FFM
					  , "ChIJVRNaNL8OvUcRPhPtBe_6I6Y" // Hopplo Nordend FFM
					  , "ChIJP6xoDDYJvUcRvSCCn0DS8bU" // Hopplo Campus FFM
					  , "ChIJjW1MIBgPvUcReFLaxaP30Ck" // Kaffeemachererei FFM
					  , "ChIJa7JWc-ALvUcRwoYmRFAkhY4" // Croquant FFM
					  , "ChIJjUf19wwJvUcRsklQ9GGgG4c" // Wilson & Oskar FFM
					  , "ChIJwfyKRqEOvUcRjL9eMUUBDB0" // Sugarmama FFM
					  , "ChIJyfJ5Ie8LvUcR5fPn5knLRNY" // MOMI FFM
					  , "ChIJJU9PaEMJvUcRfDJnV9A5PV0" // Brühmarkt FFM
					];

					var akt_place_id = merged_array[drawn_number].place_id;
					winner_cafe_is_cw_approved = cw_approved_cafes_list.includes(akt_place_id)

					if (user_input_cw_approved == "fas fa-award cw-filter-on"){

						if (winner_cafe_is_cw_approved ) {
							var cw_approved_check = 1
						} else {
							var cw_approved_check = 0
						}
												
					} else {
						var cw_approved_check = 1
					}
											
					if (cw_approved_check == 1){
						// GEWINNER GEFUNDEN
						//console.log('Winner Number: ' + drawn_number)
						winner_number = drawn_number
						winner_number_found = true
					} else {
						console.log('CW Approval did not match')
											}
				} else {
					console.log('Crow Distance did not match')
										}
			} else {
				console.log('Rating did not match.')
			}
		}
	}

	// Output generieren
	if(winner_number_found === true){

		var cafe_winner = winner_number;
	  	winner_cafe_subheader_one.innerHTML = 'Dein heutiges Ziel'
		user_input_secret_mode = document.getElementById("secret-mode-switch").className

		// ohne Secret Mode
	 	if (user_input_secret_mode == 'fas fa-eye-slash cw-filter-off'){

	  		winner_cafe_display_name.innerHTML = merged_array[cafe_winner].name;
	  		winner_cafe_vicinity.innerHTML = merged_array[cafe_winner].vicinity;
		  	winner_cafe_stars.innerHTML = merged_array[cafe_winner].rating;
		  	winner_cafe_stars.innerHTML = "<span class='fas fa-star' id='star-1'><span class='fas fa-star' id='star-2'><span class='fas fa-star' id='star-3'><span class='fas fa-star' id='star-4'><span class='fas fa-star' id='star-5'>";
		  	user_rating = merged_array[cafe_winner].rating
		  	user_rating = Math.round(user_rating)
		  	let star_cnt = 1;

		  	while (star_cnt <= user_rating) {
				star_to_check = 'star-' + star_cnt;
				star_to_check = document.getElementById(star_to_check);
				star_to_check.classList.add("star-checked");
				star_cnt = star_cnt + 1;
			}

		  	winner_cafe_rating_numbers.innerHTML = '(' + merged_array[cafe_winner].user_ratings_total + ' Bewertungen)';

		  	if ( winner_cafe_is_cw_approved ) {
		  		document.getElementById("winner_cafe_cw_approval").innerHTML = "<span class='fa-stack fa-2x'><i class='fas fa-circle fa-stack-2x' style='color: #944700;'></i><i class='fas fa-award fa-stack-1x fa-inverse' style='font-size: 20px;'></i></span>'";
		  	}

		// mit Secret Mode
	  	} else {			  		
	  		winner_cafe_display_name.innerHTML = "???";
	  		winner_cafe_vicinity.innerHTML = 'Überraschungscafé: Secret Mode ist aktiviert!';
	  		winner_cafe_stars.innerHTML = '';
	  		winner_cafe_rating_numbers.innerHTML = '';
		  		document.getElementById("winner_cafe_cw_approval").innerHTML = "";
	  	}
							  	
		winner_cafe_subheader_two.innerHTML = "Los geht's!";
		winner_cafe_google_nav.innerHTML = "<div id='winner_cafe_google_button' class='fas fa-walking' onclick=''></div>";    
		winner_cafe_google_button.setAttribute("onclick", "window.location='https://www.google.com/maps/dir/?api=1&destination="+merged_array[cafe_winner].vicinity+"&travelmode=walking&dir_action=navigate';");

	} else {
	  	document.getElementById("winner_cafe_display_name").innerHTML = "Kein Cafés gefunden";
		document.getElementById("winner_cafe_vicinity").innerHTML = 'Für deine Sucheinstellungen hat Coffee Walk keine Cafés gefunden.';	 
		document.getElementById("cafe-search-button").disabled = false; // aktiviere Suchknopf wieder
	}
				
	document.getElementById("cafe-search-button").disabled = false; // aktiviere Suchknopf wieder
}
