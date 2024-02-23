onmessage = async function (message) {
  const data = await fetch("/api/twitch").then((res) => res.json());
  postMessage(data);
};
