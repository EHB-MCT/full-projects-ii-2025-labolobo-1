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
