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
let language;

const rapid = [`projects`, `txt`, `articles`, `team`];
if (!localStorage.getItem("lang")) {
  language = navigator.language;
} else {
  language = localStorage.getItem("lang");
}

init();

async function init() {
  for (const i of rapid) {
    await fetcher(i);
  }
  setTimeout(render(), 1000);
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
      data = new Txt(e.id, e.nl, e.fr);
    } else {
      data = new Project(
        e.id,
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

function render() {
  if (language.toLowerCase().includes("fr")) {
    localStorage.setItem("lang", "fr");
    document.getElementById("language").innerHTML = `FR`;
  } else {
    localStorage.setItem("lang", "nl");
    document.getElementById("language").innerHTML = `NL`;
  }

  console.log(language);
  let elements = document.querySelectorAll("[aria-label]");
  for (const i of elements) {
    const item = i.ariaLabel;
    const foo = `_` + language;
    const HTML = txtTxt.find((obj) => obj._id == item);

    console.log(HTML[foo]);
    i.innerHTML = HTML[foo];
  }
}
