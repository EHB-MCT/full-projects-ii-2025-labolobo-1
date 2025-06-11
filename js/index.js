document.addEventListener("DOMContentLoaded", function () {
	const burger = document.getElementById("burgerMenu");
	const nav = document.querySelector(".nav");

	burger.addEventListener("click", function () {
		nav.classList.toggle("active");
	});
});
