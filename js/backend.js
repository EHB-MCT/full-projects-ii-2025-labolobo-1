import Project from "./classes/Project.js";
import Txt from "./classes/Txt.js";

const URL = `http://localhost:8090/api/collections`;
// if you can't access it: you need my IP, doofus
// might change, so ask if it doesn' work
// address: 10.2.88.244:8090/_/
// you know where to find the login

const projects = `/projects/records`;
const base = `/txt/records`; //base is the basetxt for the website
const articles = `/articles/records`;
const team = `/team/records`;
const rapid = [projects, base, articles, team];

let baseTxt = []; //this is the only one that doesn't contain any imgs
let projectTxt = [];
let articleTxt = [];
let teamTxt = [];

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

  rapid.forEach(function (e) {
    fetcher(e);
  });
}

async function fetcher(option) {
  const rep = await fetch(URL + option);

  const json = await rep.json();
  console.log(json.items);
  // json.items.forEach(function (e) {});

  // fetch everything, put in classes
  // check if we can use `${language}` in the calls
}
