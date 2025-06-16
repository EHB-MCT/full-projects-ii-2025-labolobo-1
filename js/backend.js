let baseURL = "https://pocketbase-labolobo.onrender.com/";

function init() {
  fetcher();
}

async function fetcher() {
  const rep = await fetch(URL);
  if (!Response.ok) {
    throw new Error(`response: ${rep.status}`);
  }

  const json = await rep.json();
}
