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
  if (language.toLowerCase().includes("fr")) {
    localStorage.setItem("lang", "fr");
  } else {
    localStorage.setItem("lang", "nl");
  }
} else {
  language = localStorage.getItem("lang");
}

init();

async function init() {
  for (const i of rapid) {
    await fetcher(i);
  }
  console.log(`init`, language);
  render();
  createNews();
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
        e.img,
        e.updated
      );
    }

    target.push(data);
  }
}

function render() {
  let elements = document.querySelectorAll("[aria-label]");
  for (const i of elements) {
    const item = i.ariaLabel;
    const foo = `_` + language;
    const HTML = txtTxt.find((obj) => obj._id == item);
    if (HTML[foo] == undefined) {
      window.location.reload();
    }
    i.innerHTML = HTML[foo];
  }
}

function createNews() {
  // get div
  // erase innerHTML
  // add 3 most recent posts
  document.getElementById("news").innerHTML = ``;

  for (let i = 0; i < 4; i++) {
    const article = articlesTxt[articlesTxt.length - 1 - i];
    console.log(article);
    const foo = `_` + language;
    const title = foo + `Title`;
    const sub = foo + `Sub`;
    const preview = trunc(article[foo], 150);

    let news = ``;
    const date = new Date(article._date);
    const form = new Intl.DateTimeFormat(language, { dateStyle: "long" });

    news = `<div class="newsPart" onclick="console.log('click, now open overlay');">
            ${
              article._img
                ? `<img
              class="newsImg"
              src="http://localhost:8090/api/files/articles/${article._id}/${article._img}"/>`
                : ``
            }
            <b>${article[title]}</b>
            <p class="newsDate">${form.format(date)}</p>
            <u>${article[sub]}</u>
            <div class="smallTopMargin">
            ${preview}
            </div>
          </div>`;

    document.getElementById("news").innerHTML += news;
  }
}

function trunc(input, l) {
  if (input.length <= l) {
    return input;
  } else {
    return input.substr(0, l) + "\u2026";
  }
}
