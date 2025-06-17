document.addEventListener("DOMContentLoaded", () => {
	const burgerMenu = document.getElementById("burgerMenu");
	const menu = document.getElementById("menu");

	burgerMenu.addEventListener("click", () => {
		menu.classList.toggle("active");
	});
});
