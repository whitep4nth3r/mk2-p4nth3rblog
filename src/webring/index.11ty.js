const OpenGraph = require("../../lib/openGraph");
const pageTitle = "The Claw Webring";

exports.data = {
  layout: "base.html",
  title: pageTitle,
  pageType: "webring",
  metaDescription: "Lots of good blog links from The Internet, for you.",
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/webring/",
  includeInSitemap: true,
  sitemapChangeFreq: "monthly",
  sitemapPriority: "0.3",
};

exports.render = function (data) {
  const { webring } = data;

  return /* html */ `
    <section class="webring">
      <h1 class="page__header">${pageTitle}</h1>
      <div class="webring__actions">
        <a href="https://github.com/whitep4nth3r/the-claw-webring#join-the-claw-webring" class="webring__join">Join the webring</a>
        <button class="webring__random" data-webring-random>Visit a random website in the webring</button>
      </div>
      <ul class="webring__members">
        ${webring.members
          .map(
            (member) => `
            <li class="webring__members__listItem">
              <h2 class="webring__members__listItemName">${member.name}</h2>
              <div class="webring__members__listItemLinks">
                <a href="${
                  member.url
                }" class="webring__members__listItemLink webring__members__listItemLink--website" aria-label="Visit ${
              member.name
            }'s website" target="_blank"">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 512 512"><path fill="currentColor" d="M432 320h-32a16 16 0 0 0-16 16v112H64V128h144a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16H48a48 48 0 0 0-48 48v352a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48V336a16 16 0 0 0-16-16ZM488 0H360c-21.37 0-32.05 25.91-17 41l35.73 35.73L135 320.37a24 24 0 0 0 0 34L157.67 377a24 24 0 0 0 34 0l243.61-243.68L471 169c15 15 41 4.5 41-17V24a24 24 0 0 0-24-24Z"/></svg>
                </a>
                    ${
                      member.feed
                        ? `<a href="${member.feed}" class="webring__members__listItemLink webring__members__listItemLink--feed" aria-label="RSS feed for ${member.name}">            
                <svg xmlns="http://www.w3.org/2000/svg" height="60" width="60" viewBox="0 0 448 512">
                  <path
                    fill="currentColor"
                    d="M128.081 415.959c0 35.369-28.672 64.041-64.041 64.041S0 451.328 0 415.959s28.672-64.041 64.041-64.041 64.04 28.673 64.04 64.041zm175.66 47.25c-8.354-154.6-132.185-278.587-286.95-286.95C7.656 175.765 0 183.105 0 192.253v48.069c0 8.415 6.49 15.472 14.887 16.018 111.832 7.284 201.473 96.702 208.772 208.772.547 8.397 7.604 14.887 16.018 14.887h48.069c9.149.001 16.489-7.655 15.995-16.79zm144.249.288C439.596 229.677 251.465 40.445 16.503 32.01 7.473 31.686 0 38.981 0 48.016v48.068c0 8.625 6.835 15.645 15.453 15.999 191.179 7.839 344.627 161.316 352.465 352.465.353 8.618 7.373 15.453 15.999 15.453h48.068c9.034-.001 16.329-7.474 16.005-16.504z"></path>
                </svg>
            </a>`
                        : ""
                    }
              </div>
            </li>`,
          )
          .join("")}
      </ul>
    </section>
    <script id="members" type="application/json">${JSON.stringify(webring.members)}</script>
    <script src="/js/webring.js" type="module"></script>
  `;
};
