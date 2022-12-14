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

    <script src="https://the-claw-webring-widget.netlify.app/the-claw-webring-widget.mjs" type="module"></script>
    <the-claw-webring-widget>
      <!-- fallback content in the case of no JavaScript -->
      <div style="color: inherit; font-family: system-ui; padding: 1rem; font-size: 1rem;">
        <div style="display: grid; gap: 0.5rem 1rem; align-items: center; margin-bottom: 1rem; justify-content: flex-start; grid-template-areas: 'image title' 'image view';">
          <img
            src="https://the-claw-webring.netlify.app/img/theclaw.png"
            alt="The Claw Webring"
            style="grid-area: image; height: 4rem; transform: rotate(-8deg);"
          />
          <h2 style="grid-area: title; font-size: 1.4rem; margin: 0;">The Claw Webring</h2>
          <a href="https://github.com/whitep4nth3r/the-claw-webring" style="grid-area: view; margin: 0; color: inherit;">View on GitHub</a>
        </div>
      </div>
    </the-claw-webring-widget>
  </div>`;
}

module.exports = homeAbout;
