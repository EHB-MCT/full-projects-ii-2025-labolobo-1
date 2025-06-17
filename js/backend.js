const URL = `http://localhost:8090/api/collections`;
const posts = `/posts/records`;
let language = navigator.language;

init();

function init() {
  fetcher();

  console.log(language);
}

async function fetcher() {
  const rep = await fetch(URL + posts);

  const json = await rep.json();
  console.log(json);
}
