<!DOCTYPE html>
<html>
<head>
 	<title>Coffee Walk</title> 

 	<!-- Definiere Meta-Informationen -->
	<meta charset="UTF-8">   
	<meta name="robots" content="noindex,nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, minimum-scale=0.1, user-scalable=no, minimal-ui">

    <!-- Lade Stylesheets -->
	<link rel="stylesheet" type="text/css" media="screen, projection" href="css/coffee_style.css">
	<link href='https://fonts.googleapis.com/css?family=Annie Use Your Telescope' rel='stylesheet'>

	<!-- Externe Skripte (JQuery, Fontawsome, Google Places API, etc.) -->
	<script src="https://kit.fontawesome.com/f55cefa7fc.js" crossorigin="anonymous"></script>
	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBqcyjHy68OLKG-qEc3Ex9qdd4k0MfYxQE&libraries=places"></script>	

</head>

<body>

	<div id='app-wrapper'>

		<div id='content-wrapper'>

			<!-- ÜBERSCHRIFT -->
			<div id='content-header'>
				<div id='header-header'>
					<a href='index.php'>Coffee Walk</a> <span style='font-family: Arial, Helvetica, sans-serif; font-size: 12px;'><small>BETA</small></span>
				</div>	
				<div id='header-slogan'>
					... um den Pudding zum Kaffee 
				</div>	
			</div>

			<!-- APP ZUSAMMENFASSUNG -->
			<div id='content-app-desc'>
				Beine vertreten? Kaffeedurst? Aber wo hin? Zumindest diese Frage nimmt Coffee Walk dir ab. Auf Knopfdruck suchen wir dir ein zufälliges Café für Sonntagsspaziergang oder Kaffeepause!
			</div>

			<!-- USER INPUT -->
			<hr>
			<div id='content-userinput'>

				<!-- Ausklappendes Menü für Userfilter etc. -->
				<button class="collapsible-button">Sucheinstellungen</button>
				<div class="collapsible-content">

					<script src="/js/expand_collapsible.js"></script> 

					<!-- User-Input: Maximale Distanz bzw. Laufweite -->
					<div id="filter-content-distance">
						<div class="filter-headline filter-tooltip">
							Hinweg zum Kaffee

							<div class="fas fa-question-circle">
							</div>
							
							<span class="filter-tooltip-text">
								Wie lang soll deine Coffee Walk werden? Wir berechnen die Entfernung unter Annahme von 5km/h Geschwindigkeit in direkter Luftlinie.
							</span>
						</div>

						<div id='slider_output_container'>
							<span id="slider_output"></span>
							<span id="slider_output_einheit">Min</span>
						</div>
		        		
		        		<input id ="myRange" class="slider" type="range" value="30" min="10" max="90" step="10"></input>
		        	</div>

		        	<!-- User-Input: Weitere Filter -->
		        	<div id = "filter-misc">
			        	<!-- Ist das Café geöffnet? -->
			        	<div class = "filter-misc-item">
			        		<div class = "filter-misc-subheader filter-tooltip filter-headline">Offene Cafes						
			        			<div class="fas fa-question-circle">
								</div>
								<span class="filter-tooltip-text">
									Filtere auf gerade geöffnete Cafés.
								</span>
							</div>
							<div id="cafe-open-switch" class="fas fa-door-open cw-filter-on" onclick="switchCafeOpen();" ></div>
						</div>
					
						<!-- Secret-Mode -->
			        	<div class = "filter-misc-item">
			        		<div class = "filter-misc-subheader filter-tooltip filter-headline">Secret Mode
			        			<div class="fas fa-question-circle">
								</div>
								<span class="filter-tooltip-text">
									Name & Adresse des Cafés werden dir nicht angzeigt.
								</span>
			        		</div>
							<div id="secret-mode-switch" class="fas fa-eye-slash cw-filter-off" onclick="switchSecretMode();"></div>
						</div>

						<!-- Coffee Walk Empfehlung -->
			        	<div class = "filter-misc-item">
			        		<div class = "filter-misc-subheader filter-tooltip filter-headline">Empfehlung
			        			<div class="fas fa-question-circle">
								</div>
								<span class="filter-tooltip-text">
									Filtere auf von Coffee Walk empfohlene Cafés.
								</span>
			        		</div>
							<div id="cw-approved-switch" class="fas fa-award cw-filter-off" onclick="switchCWApproved();"></div>
						</div>

	        			<!-- Google Rating -->
		        		<div class = "filter-misc-item">
			        		<div class = "filter-misc-subheader filter-tooltip filter-headline">Bewertung
			        			<div class="fas fa-question-circle">
								</div>
								<span class="filter-tooltip-text">
									Filtere nach Nutzer-Bewertung der Cafés bei Google.
								</span>
			        		</div>
			        		<div>
								<p class="stars">
								  <span>
								    <a class="star-1 active" href="#">1</a>
								    <a class="star-2 active" href="#">2</a>
								    <a class="star-3 active" href="#">3</a>
								    <a class="star-4" href="#">4</a>
								    <a class="star-5" href="#">5</a>
								  </span>
								</p>
							</div>
						</div>

						<!-- Funktionalitäten der Filter -->
						<script src="/js/user_input.js"></script> 				

					</div>
				</div>
			</div>

			<!-- SEARCH BUTTON -->
			<hr>
			<div id='content-search-button'>

				<!-- Der Button an sich -->
				<div class='search-button-item'>
					<button id='cafe-search-button' class='search-button' onclick="getPosition()">Café suchen</button>
				</div>

				<!-- Powered by Google Image -->
				<div class='search-button-item'>
					<img src="/img/powered_by_google_on_white.png" alt="" />
				</div>

				<!-- User Opt in zu Datenschutzerklärung -->
				<div class='search-button-item'>
					<div id='wrapper-opt-in'>
						<input type="checkbox" id="user-opt-in"><span>Ich bin mit der <a href="datenschutzerklaerung.php">Datenschutzerklärung</a> von coffee-walk.de einverstanden.</span>
					</div>
				</div>
			</div>

			<!-- SEARCH OUTPUT -->

			<!-- HTML Struktur zum Output des Search Log zur Übersicht der eingegebenen Parameter -->
			<div id="searchlog">
				<div id="searchlog-user-coords">
				</div>
				<div id="searchlog-radius">
				</div>
				<div id="searchlog-open">
				</div>		
				<div id="cafe_list">
				</div>
				<div id="searchlog-cw-approved">
				</div>	
				<div id="searchlog-rating">
				</div>
			</div>

			<hr>

			<!-- HTML Struktur zum Output des Ergebnisses -->
			<div id="winner_cafe">

				<!-- Details und Infos zum gezognene Café -->
				<div id='winner_cafe_subheader_one' class="winner_cafe_subheader">
				</div>

				<div id="winner_cafe_details">

					<div id="winner_cafe_descr">
						<div id="winner_cafe_display_name">
						</div>
						<div id="winner_cafe_vicinity">
						</div>				
					</div>
					
					<div id="winner_cafe_rating">

						<div class="winner-tooltip">
							<div id="winner_cafe_cw_approval">
							</div>
			
							<span class="winner-tooltip-text">
								Von Coffee Walk empfohlenes Café!
							</span>
						</div>

						<div id="winner_cafe_google_rating" class="winner-tooltip">	
							<div id="winner_cafe_stars">	
							</div>
							<div id="winner_cafe_rating_numbers">
							</div>
							<span class="winner-tooltip-text">
								Google-Bewertung des Cafés.
							</span>
						</div>

					</div>
				</div>

				<!-- Navigationsbuttons -->
				<div id='winner_cafe_subheader_two' class="winner_cafe_subheader">
				</div>
				
				<div id="winner_cafe_navigation">

					<div id="winner_cafe_coords">
					</div>	

					<div id="winner_cafe_google_nav">
					</div>

				</div>
			</div>

			<!-- Benötigt für Places API-->
			<div id="map"></div>
			
			<!-- Javascript Suchfunktion -->
			<script src="/js/search_cafe.js"></script> 

		    <!-- FOOTER -->
   		    <hr>
			<div id='content-footer'>
				<a href="about.php">About</a> | <a href="datenschutzerklaerung.php">Datenschutzerklärung</a>
			</div>	
		</div>
	</div>
</body>
</html>