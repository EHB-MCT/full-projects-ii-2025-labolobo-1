const URL = `http://localhost:8090/api/collections`;
// if you can't access it: you need my IP, doofus
// might change, so ask if it doesn' work
// address: 10.2.88.244:8090/_/
// you know where to find the login

const projects = `/projects/records`;
const txt = `/txt/records`;
const articles = `/articles/records`;

let baseTxt = [];
let projectTxt = [];
let articleTxt = [];

let language = navigator.language;

init();

function init() {
  console.log(language);
  if (language.toLowerCase().includes("nl")) {
    localStorage.setItem("lang", "nl");
  } else if (language.toLowerCase().includes("fr")) {
    localStorage.setItem("lang", "fr");
  } else {
    localStorage.setItem("lang", "nl");
  }

  language = localStorage.getItem("lang");

  fetcher(txt);
}

async function fetcher(option) {
  const rep = await fetch(URL + option);

  const json = await rep.json();
  console.log(json.items);
  // fetch everything, put in classes
  // check if we can use `${language}` in the calls
}
