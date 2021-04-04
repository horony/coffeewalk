// Entfernung als Slider
var slider = document.getElementById("myRange");
var slider_output = document.getElementById("slider_output");
var slider_user_input = slider.value;
slider_output.innerHTML = slider.value; //Default Wert

slider.oninput = function() {
	slider_user_input = this.value
	slider_output.innerHTML = slider_user_input;
} 

// Ist das Café geöffnet? 
function switchCafeOpen(){
	user_input_cafe_open = document.getElementById("cafe-open-switch").className
	if (user_input_cafe_open == 'fas fa-door-open cw-filter-off'){
		document.getElementById("cafe-open-switch").setAttribute('class','fas fa-door-open cw-filter-on');
	} else if (user_input_cafe_open ='fas fa-door-open cw-filter-on') {
		document.getElementById("cafe-open-switch").setAttribute('class','fas fa-door-open cw-filter-off'); 
	}
}

// Secret Mode 
function switchSecretMode(){
	user_input_secret_mode = document.getElementById("secret-mode-switch").className
	if (user_input_secret_mode == 'fas fa-eye-slash cw-filter-off'){
		document.getElementById("secret-mode-switch").setAttribute('class','fas fa-eye-slash cw-filter-on');
	} else if (user_input_secret_mode == 'fas fa-eye-slash cw-filter-on') {
		document.getElementById("secret-mode-switch").setAttribute('class','fas fa-eye-slash cw-filter-off');
	}
}   			

// Coffee Walk Empfehlung
function switchCWApproved(){
	user_cw_approved = document.getElementById("cw-approved-switch").className
	if (user_cw_approved == 'fas fa-award cw-filter-off'){
		document.getElementById("cw-approved-switch").setAttribute('class','fas fa-award cw-filter-on');
	} else if (user_cw_approved == 'fas fa-award cw-filter-on') {
		document.getElementById("cw-approved-switch").setAttribute('class','fas fa-award cw-filter-off');
	}
}    

// Mindestbewertung in Sternen
var user_input_star_rating = 3;

$('.stars a').on('click', function(){
  	$('.stars span, .stars a').removeClass('active');
  	$(this).addClass('active');
 	$('.stars span').addClass('active');
	user_input_star_rating = $(this).text();
});;