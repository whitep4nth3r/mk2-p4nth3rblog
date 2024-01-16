import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";

export default async (request, context) => {
  const BASE_URL = "https://api.buttondown.email";
  const ENDPOINT = "/v1/subscribers";

  const subscribers = await fetch(`${BASE_URL}${ENDPOINT}`, {
    headers: {
      Authorization: `Token ${Deno.env.get("BUTTONDOWN_API_KEY")}`,
    },
  });

  const result = await subscribers.json();
  const response = await context.next();

  return new HTMLRewriter()
    .on("[data-wwwh-subs]", {
      element(element) {
        element.setInnerContent(result.count.toString());
      },
    })
    .transform(response);
};
