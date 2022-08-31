export default async (request, context) => {
  let cookieValue = context.cookies.get("nf_ab");
  context.log("Hello, there from abtest: ", cookieValue);

  if (cookieValue) {
    const domain = Deno.env.get("DOMAIN");

    const res = await fetch(`${domain}/api/airtable`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cookieValue,
      }),
    });

    const response = await res.json();

    return new Response(response.message, {
      headers: { "content-type": "application/json" },
      status: res.status,
    });
  }

  return new Response("No nf_ab cookie found, but everything is OK", {
    headers: { "content-type": "application/json" },
    status: 200,
  });
};
