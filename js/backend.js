import Project from "./classes/Project.js";
import Txt from "./classes/Txt.js";
const IP = `http://localhost:8090`;
// if you can't access it: you need my IP, doofus
// might change, so ask if it doesn' work
// ./pocketbase serve --http=0.0.0.0:8090
const pb = new PocketBase(IP);

let txtTxt = []; //this is the only one that doesn't contain any imgs
let projectsTxt = [];
let articlesTxt = [];
let teamTxt = [];
let language;
let postLimit = 5;
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
  render();
  createNews("news");
  createNews("projects");
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

function createNews(type) {
  let lib;
  let directory = ``;
  let length;

  if (type == "news") {
    lib = articlesTxt;
    directory = `articles`;
    length = 150;
  } else if (type == "projects") {
    lib = projectsTxt;
    directory = `projects`;
    length = 300;
  }
  if (document.getElementById(type)) {
    document.getElementById(type).innerHTML = ``;

    for (let i = 0; i < postLimit; i++) {
      const article = lib[lib.length - 1 - i];
      const foo = `_` + language;
      const title = foo + `Title`;
      const sub = foo + `Sub`;
      const preview = trunc(article[foo], length);
      let news = ``;
      const date = new Date(article._date);
      const form = new Intl.DateTimeFormat(language, { dateStyle: "long" });
      news = `<div class="newsPart" onclick="console.log('click, now open overlay');">
            ${
              article._img
                ? `<img
              class="newsImg"
              src="${IP}/api/files/${directory}/${article._id}/${article._img}"/>`
                : ``
            }
            <b>${article[title]}</b>
            <p class="newsDate">${form.format(date)}</p>
            <u>${article[sub]}</u>
            <div class="smallTopMargin bottomLine">
            ${preview}
            </div>
          </div>`;
      document.getElementById(type).innerHTML += news;
    }

    document.getElementById(
      type
    ).innerHTML += `<div id="more" class="newsPart"><h3>${
      language == "nl" ? "Laad meer" : "charger plus"
    }></h3></div>`;
  }
  // document.getElementById("more").addEventListener("click", function () {
  //   postLimit += 5;
  //   render();
  // });
}

function trunc(input, l) {
  if (input.length <= l) {
    return input;
  } else {
    return input.substr(0, l) + "\u2026";
  }
}
