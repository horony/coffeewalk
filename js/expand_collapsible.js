/* Javascript zum ausklappen des Bereichs mit den ansonsten versteckten Userfiltern */

var coll = document.getElementsByClassName("collapsible-button");
var i;

for (i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function() {
	    this.classList.toggle("collapsible-active");
		var content = this.nextElementSibling;
		if (content.style.maxHeight){
		    content.style.maxHeight = null;
		} else {
		    content.style.maxHeight = content.scrollHeight + "px";
		} 
	});
}