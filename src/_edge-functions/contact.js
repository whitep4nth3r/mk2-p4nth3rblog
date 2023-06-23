import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";

export default async (request, context) => {
  const url = new URL(request.url);
  const response = await context.next();

  if (url.searchParams.get("success") !== "true") {
    return;
  }

  return new HTMLRewriter()
    .on("[data-success]", {
      element(element) {
        element.setAttribute("class", "sponsorships__success sponsorships__success--show");
      },
    })
    .transform(response);
};
