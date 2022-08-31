export default async (request, context) => {
  // Get the nf_ab cookie
  let cookieValue = context.cookies.get("nf_ab");

  //TODO — DOMAIN ENV VAR
  const sendToAirtable = await fetch("http://localhost:8888/api/airtable", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cookieValue,
    }),
  });

  await sendToAirtable.json();
};
