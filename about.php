<!DOCTYPE html>
<html>
<head>
 	<title>Coffee Walk</title> 

	<meta name="robots" content="noindex">
	<meta charset="UTF-8">   

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, minimum-scale=0.1, user-scalable=no, minimal-ui">
	<link rel="stylesheet" type="text/css" media="screen, projection" href="css/coffee_style.css">
	<link href='https://fonts.googleapis.com/css?family=Annie Use Your Telescope' rel='stylesheet'>
	<script src="https://kit.fontawesome.com/f55cefa7fc.js" crossorigin="anonymous"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBqcyjHy68OLKG-qEc3Ex9qdd4k0MfYxQE&libraries=places"></script>	


	<script type="text/javascript">
    function erzeuge_kontakt_mail(name,domainbezeichnung,domainendung) {
        document.write(name + "&#91;&#228;&#116;&#93;");
        document.write(domainbezeichnung + "&#46;" + domainendung);
    }
	</script>
</head>

<body>

<div id='app-wrapper'>

	<div id='content-wrapper'>

	<!-- ÜBERSCHRIFT -->
	<div id='content-header'>
		<div id='header-header'>
			<a href='index.php'>Coffee Walk</a>
		</div>	
		<div id='header-slogan'>
			... wie  funktioniert das?
		</div>	
	</div>

    <hr>

	<div id='datenschutz-text'>
		 <h2>About</h2>

		 <h3>TL;DR</h3>
		 <p>
		 	Coffee Walk sucht mit Hilfe von Google im Umkreis zu deinem Standort nach Cafés und sucht dir - basierend auf deinen Filtern - davon ein zufälliges Café aus.
		 </p>
		 <h3>Details</h3>
		 <p><b>Standortermittlung.</b> Coffee Walk ermittelt, nach deiner Zustimmung, über die <a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API" target="_blank" rel="noopener">Geolocation API</a> deinen Standort. Achtung: Dies kann insbesondere bei nicht mobilen Endgeräten (z.B. Desktpop PC) zu großen Abweichungen zu deinem tatsächlichen Standort führen.</p>

		 <p><b>Café Suche.</b> Anschließend nutzt Coffee Walk, nach deiner Zustimmung, die <a href="https://developers.google.com/maps/documentation/places/web-service/overview" target="_blank" rel="noopener">Google Places API</a>, um mit Hilfe des <a href="https://developers.google.com/maps/documentation/places/web-service/search#nearby-search-and-text-search-responses" target="_blank" rel="noopener">Nearby Search-Algorithmus</a> nach Cafés in dem von dir definierten Umkreis zu suchen. Coffee Walk nutzt zur Café-Suche die Parameter <span class='code-text'>keyword='coffee special'</span> und <span class='code-text'>type=cafe</span>. Die Places API liefert anschließend bis zu 60 passende Ergebnisse zurück. Sollte es mehr als 60 Ergebnisse geben, werden diese innerhalb der nearby Search nach der Google-'Prominence' durch den Parameter <span class='code-text'>rankby=promincence</span> sortiert. Solltest du also ein Café vermissen, liegt dies vermutlich am Google-Algorithmus und nicht direkt an Coffee Walk.</p>

		 <p><b>Filtereinstellungen.</b> Im Anschluss werden die gefunden Cafés auf das Matching zu deinen Sucheinstellungen gefiltert und ein zufälliges Café gezogen.
		 	<ul>
		 		<li>
		 			<p><b>Hinweg zum Café: </b>Der Hinweg zum Café wird vom Nutzer in Minuten angegeben. Coffee Walk rechnet diese Zeit - unter Annahme von 5km/h Gehgeschwindigkeit - in eine Meter-Distanz um. Die Umkreissuche wird dann auf Basis der Luftline von deinem Standort zum Standort der Cafés umgesetzt. Achtung: Sollten Hindernisse wie z.B. Berge, Flüsse oder Schienen zwischen euch und eurem Ziel und euch liegen, wird die Filterung auch Ziele ausgeben die in Realität deutlich weiter entfernt sind als die Luftlinien-Distanz.</p>
		 		</li>	
		 		<li>
		 			<p><b>Offene Cafés: </b>Der Öffnungsstatus der Cafés wird durch Google Places API Parameter <span class='code-text'>opennow=true</span> ermittelt.</p>
		 		</li>	
		 		<li>
  		 			<p><b>Empfehlung: </b>Der Filter 'Empfehlung' filtert von auf coffee-walk.de getestete Cafés die sich perfekt als Coffee Walk-Ziel eignen. Aktuell nur in Frankfurt am Main verfügbar.</p>
		 		</li>	
		 		<li>
		 			<p><b>Bewertung: </b>Die Bewertung wird per Google Places API abgefragt. Sie enstspricht der Sterne-Bewertung die Nutzer für das Café abgegeben haben.</p>
		 		</li>			 				 				 		
		 	</ul>
		 </p>
		 
		<h2>Kontakt</h2>
		<span>
		<script type="text/javascript"> 
    		erzeuge_kontakt_mail('&#97;&#110;&#110;&#45;&#99;&#104;&#114;&#105;&#115;&#116;&#105;&#110;','&#99;&#111;&#102;&#102;&#101;&#101;&#45;&#119;&#97;&#108;&#107;','&#100;&#101;');
		</script>
		</span>
	</div>

    <hr>
	<div id='content-footer'>
		<a href="about.php">About</a> | <a href="datenschutzerklaerung.php">Datenschutzerklärung</a>
	</div>	
	</div>
</div>
</body>
</html>