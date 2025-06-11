console.log("hello world");

document.addEventListener("DOMContentLoaded", () => {
	const burgerMenu = document.getElementById("burgerMenu");
	const menu = document.getElementById("menu");

	if (burgerMenu && menu) {
		burgerMenu.addEventListener("click", () => {
			burgerMenu.classList.toggle("active");
			menu.classList.toggle("active");
		});
	}
});
