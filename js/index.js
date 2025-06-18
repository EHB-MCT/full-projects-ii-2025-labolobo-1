document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.getElementById("burgerMenu");
  const menu = document.getElementById("menu");

  burgerMenu.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
});

document.getElementById(`pdfOpen`).addEventListener("click", function () {
  window.open(`../assets/documents/GDPR_2021_NL.pdf`);
});

// eventlistener language button
// geef language button een ID
