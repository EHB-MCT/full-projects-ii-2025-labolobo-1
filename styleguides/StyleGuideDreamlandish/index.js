let button = document.getElementById("modeButton");
let mode = true;

function darkMode() {
	document.body.style.backgroundColor = "#322c3c";
	document.body.style.color = "seashell";
	document.getElementById("mainActive").style.color = "seashell";
	document.getElementById("ctaActive").style.color = "seashell";
	mode = true;
}
function lightMode() {
	document.body.style.backgroundColor = "#d6cbb6";
	document.body.style.color = "#282828";
	document.getElementById("mainActive").style.color = "#282828";
	document.getElementById("ctaActive").style.color = "#282828";
	mode = false;
}

button.onclick = function event() {
	if (mode === true) {
		lightMode();
	} else if (mode === false) {
		darkMode();
	} else {
		console.error(error);
	}
};
