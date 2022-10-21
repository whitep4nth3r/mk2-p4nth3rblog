const OpenGraph = require("../../lib/openGraph");
const pageTitle = "Salma's links";

exports.data = {
  layout: "links.html",
  title: pageTitle,
  metaDescription: `This is my linktree.`,
  openGraphImageUrl: OpenGraph.generateImageUrl({ title: pageTitle }),
  openGraphImageAlt: OpenGraph.generateImageAlt(pageTitle),
  openGraphImageWidth: OpenGraph.imgWidth,
  openGraphImageHeight: OpenGraph.imgHeight,
  openGraphUrl: "https://whitep4nth3r.com/links/",
};

exports.render = function (data) {
  const { person } = data;
  return /* html */ `
  
  <section class="links">
    <img src="${person.imageBio.url}?w=200" alt="Salma Alam-Naylor" class="links__image" />
    <h1 class="links__title">Salma Alam-Naylor</h1>
    <h2 class="links__subtitle">I write code for your entertainment</h2>

    <ul class="links__list">
     <li class="links__listItem">
        <a href="/" class="links__listItemLink">Home page</a>
      </li>
      <li class="links__listItem">
        <a href="https://twitch.com/whitep4nth3r" class="links__listItemLink" target="_blank">Twitch</a>
      </li>
      <li class="links__listItem">
        <a href="https://twitter.com/whitep4nth3r" class="links__listItemLink" target="_blank">Twitter</a>
      </li>
      <li class="links__listItem">
        <a href="https://github.com/whitep4nth3r" class="links__listItemLink" target="_blank">GitHub</a>
      </li>
      <li class="links__listItem">
        <a href="https://www.youtube.com/c/whitep4nth3r/videos" class="links__listItemLink" target="_blank">YouTube</a>
      </li>
    </ul>
  </section>`;
};
