const URL = `http://localhost:8090/api/collections`;
const posts = `/posts/records`;
init();

function init() {
  fetcher();
}

async function fetcher() {
  const rep = await fetch(URL + posts);

  const json = await rep.json();
  console.log(json);
}
