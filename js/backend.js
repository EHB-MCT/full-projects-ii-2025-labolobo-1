import Project from "./classes/Project.js";
import Txt from "./classes/Txt.js";

const URL = `http://localhost:8090/api/collections`;
// if you can't access it: you need my IP, doofus
// might change, so ask if it doesn' work
// address: 10.2.88.244:8090/_/
// you know where to find the login

let txtTxt = []; //this is the only one that doesn't contain any imgs
let projectsTxt = [];
let articlesTxt = [];
let teamTxt = [];

const rapid = [`projects`, `txt`, `articles`, `team`];

let language = navigator.language;

init();

function init() {
  if (language.toLowerCase().includes("nl")) {
    localStorage.setItem("lang", "nl");
  } else if (language.toLowerCase().includes("fr")) {
    localStorage.setItem("lang", "fr");
  } else {
    localStorage.setItem("lang", "nl");
  }

  language = localStorage.getItem("lang");
  console.log(language);

  rapid.forEach(function (e) {
    fetcher(e);
  });
  setTimeout(() => {
    render();
  }, 100);
}

async function fetcher(option) {
  const rep = await fetch(URL + `/${option}/records`);
  const json = await rep.json();
  const targets = {
    txt: txtTxt,
    projects: projectsTxt,
    articles: articlesTxt,
    team: teamTxt,
  };
  let target = targets[option];

  for (const e of json.items) {
    let data;
    if (option == `txt`) {
      data = new Txt(e.nl, e.fr);
    } else {
      data = new Project(
        e.nl,
        e.fr,
        e.nl_title,
        e.fr_title,
        e.nl_sub,
        e.fr_sub,
        e.img
      );
    }
    target.push(data);
  }
  // check if we can use `${language}` in the calls
}

function render() {
  console.log(txtTxt);
  console.log(txtTxt[1]);
  document.getElementById(`slogan`).innerHTML = txtTxt[1]._nl;
}
