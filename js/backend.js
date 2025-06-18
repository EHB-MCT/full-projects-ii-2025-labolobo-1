import Project from "./classes/Project.js";
import Txt from "./classes/Txt.js";

const pb = new PocketBase("http://localhost:8090");
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
if (language.toLowerCase().includes("nl")) {
  localStorage.setItem("lang", "nl");
} else if (language.toLowerCase().includes("fr")) {
  localStorage.setItem("lang", "fr");
} else {
  localStorage.setItem("lang", "nl");
}

init();

async function init() {
  for (const i of rapid) {
    await fetcher(i);
  }
  setTimeout(render(), 100);
}

async function fetcher(option) {
  const rep = await pb.collection(option).getFullList();
  const targets = {
    txt: txtTxt,
    projects: projectsTxt,
    articles: articlesTxt,
    team: teamTxt,
  };
  let target = targets[option];

  let data;
  for (const e of rep) {
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
}
// check if we can use `${language}` in the calls

function render() {
  language = localStorage.getItem("lang");
  console.log(language);

  console.log(txtTxt);
  console.log(txtTxt[1]._nl);

  let HTML = `${txtTxt[1]._nl}`;

  document.getElementById(`slogan`).innerHTML = HTML;
}
