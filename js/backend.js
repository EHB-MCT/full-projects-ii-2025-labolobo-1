import PocketBase from "pocketbase";

const pb = new PocketBase(`http://localhost:8090`);

init();

function init() {
  fetcher();
}

async function fetcher() {
  const rep = await pb.collection("posts").getFullList({ sort: "Dutch_title" });
  if (!Response.ok) {
    throw new Error(`response: ${rep.status}`);
  }

  const json = await rep.json();
  await console.log(json);
}
