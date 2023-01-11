export default async (request, context) => {
  const data = fetch("https://whitep4nth3r.com/api/twitch")
    .then((res) => res.json())
    .then((data) => console.log(data.streams));
};
