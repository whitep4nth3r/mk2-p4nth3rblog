import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";

const messages = {
  "localhost:8888": `✨ Happy developing ✨`,
  "netlify.com": `🎉 You found my site via netlify.com! <a href="/blog/add-personalization-to-static-html-with-edge-functions-no-browser-javascript/">Learn how to show this banner using Netlify Edge Functions</a>`,
  "reddit.com": "👀 Hello there, Redditor! I see you. Please be nice.",
};

export default async (request, context) => {
  // get HTTP referer header
  const referer = request.headers.get("referer");

  // get the next HTTP response in the chain
  const response = await context.next();

  // if no referer, continue
  if (referer === null) {
    return response;
  }

  // get keys from refererMessages
  const refererKeys = Array.from(Object.keys(messages));

  // look through keys, and check to see if the incoming referrer contains one of the values
  const findRefererKey = refererKeys.filter((ref) => referer.includes(ref)).pop();

  // if we don't have a referer match, return the response
  if (findRefererKey === undefined) {
    return response;
  }

  // if we do have a referer match, rewrite the element
  // in the DOM with a friendly message
  return new HTMLRewriter()
    .on("p[data-referer]", {
      element(element) {
        element.setInnerContent(messages[findRefererKey], { html: true });
        element.setAttribute("class", "header__referer");
      },
    })
    .transform(response);
};
