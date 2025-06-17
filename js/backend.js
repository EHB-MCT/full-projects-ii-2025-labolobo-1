const URL = `http://localhost:8090/api/collections`;
const projects = `/projects/records`;
let language = navigator.language;

init();

function init() {
  fetcher();

  console.log(language);
  if (language.toLowerCase().includes("nl")) {
    localStorage.setItem("lang", "nl");
  } else if (language.toLowerCase().includes("fr")) {
    localStorage.setItem("lang", "fr");
  }
}

async function fetcher() {
  const rep = await fetch(URL + projects);

  const json = await rep.json();
  console.log(json.items);
}
