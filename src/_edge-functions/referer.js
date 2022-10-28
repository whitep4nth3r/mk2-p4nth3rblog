import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";

const messages = {
  "netlify.com": `🎉 You found my site via netlify.com! <a href="/blog/personalize-static-site-based-on-previous-site-referral/">Learn how to show this banner using Netlify Edge Functions</a>`,
  "reddit.com": "👀 Hello there, Redditor! I see you. Please be nice.",
  "news.ycombinator.com": "👀 Hello there, Orange Site user! I see you. Please be nice.",
  "localhost:8888": `✨ Happy developing ✨`,
  "t.co": `✨ You found this post on Twitter ✨ <a href="https://twitter.com/intent/tweet?text=Hey%20@whitep4nth3r%21%20I%20found%20your%20blog%20post%20%22{INSERT_TITLE}%22%20on%20Twitter%20and%20I%20love%20it%21%0a%0a{INSERT_LINK}" target="_blank">Say hi!</a>`,
};

export default async (request, context) => {
  // get HTTP referer header
  const referer = request.headers.get("referer");

  // get the next HTTP response in the chain
  const response = await context.next();

  // if no referer, return the response
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
  // in the response HTML with a friendly message

  return new HTMLRewriter()
    .on("aside[data-referer]", {
      element(element) {
        let message = messages[findRefererKey];
        const slug = element.getAttribute("data-slug");
        const title = element.getAttribute("data-title");

        // do something special for Twitter and provide a web intent link
        if (findRefererKey === "t.co") {
          const fullUrl = `https://whitep4nth3r.com/blog/${slug}/`;
          message = message.replace("{INSERT_TITLE}", encodeURI(title));
          message = message.replace("{INSERT_LINK}", encodeURI(fullUrl));
        }

        element.setInnerContent(message, { html: true });
        element.setAttribute("class", "header__referer");
      },
    })
    .transform(response);
};
