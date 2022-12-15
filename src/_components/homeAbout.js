const BioImage = require("../_components/bioImage.js");

function homeAbout({ person }) {
  return /* html */ `
  <div class="homeAbout">
    <div class="homeAbout__topRow">
      <div class="homeAbout__imageBio">
        ${BioImage({ image: person.imageBio })}
      </div>
      <h1 class="homeAbout__name">
        <span>Salma</span>
        <span>Alam-Naylor</span>
      </h1>
    </div>
    <h2 class="homeAbout__subtitle">✨ I write code ✨ <br />for your entertainment</h2>
    <p class="homeAbout_minibio">I'm a <a href="https://github.com/whitep4nth3r" target="_blank">software engineer</a>, <a href="/blog/">writer</a>, and <a href="https://twitch.tv/whitep4nth3r">live streamer</a>. I help developers build 🔥 cool stuff 🔥 with blog posts, tutorial videos, live coding and open source projects. I work at <a href="https://ntl.fyi/3vA7krR" target="_blank">Netlify</a>.</p>
    <a href="/activity" class="homeAbout__seeAllCta">👀 See my new activity feed <span class="colorHighlight" aria-hidden="true">→</span></a>
  </div>`;
}

module.exports = homeAbout;
