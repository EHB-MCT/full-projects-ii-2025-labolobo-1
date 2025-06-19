document.addEventListener("DOMContentLoaded", () => {
	const burgerMenu = document.getElementById("burgerMenu");
	const menu = document.getElementById("menu");

	burgerMenu.addEventListener("click", () => {
		menu.classList.toggle("active");
	});
});

document.getElementById(`language`).addEventListener("click", function () {
	let currentLang = localStorage.getItem("lang");
	if (currentLang == `nl`) {
		localStorage.setItem("lang", `fr`);
		window.location.reload();
	} else if (currentLang == `fr`) {
		localStorage.setItem("lang", `nl`);
		window.location.reload();
	}
});

document.getElementById(`pdfOpen`).addEventListener("click", function () {
	window.open(`../assets/documents/GDPR_2021_NL.pdf`);
});

document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("contactForm");
	const btn = document.getElementById("button");

	form.addEventListener("submit", function (event) {
		event.preventDefault();

		btn.value = "Versturen...";

		const serviceID = "service_du6l4p8";
		const templateID = "template_0jtjxvk";

		emailjs.sendForm(serviceID, templateID, this).then(() => {
			btn.value = "Verstuur";
			form.reset();
		});
	});
});
