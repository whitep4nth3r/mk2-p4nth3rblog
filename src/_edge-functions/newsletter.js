import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";

export default async (request, context) => {
  try {
    const subscribers = await fetch(
      `https://api.buttondown.email/v1/subscribers`,
      {
        headers: {
          Authorization: `Token ${Deno.env.get("BUTTONDOWN_API_KEY")}`,
        },
      },
    );

    const result = await subscribers.json();
    const response = await context.next();

    return new HTMLRewriter()
      .on("[data-wwwh-subs]", {
        element(element) {
          element.setInnerContent(result.count.toString());
        },
      })
      .transform(response);
  } catch (error) {
    console.log(error);
  }
};
