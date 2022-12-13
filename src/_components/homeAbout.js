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
    <h2 class="homeAbout__subtitle">✨ I write code for your entertainment ✨</h2>
    <p class="homeAbout_minibio">I'm a <a href="https://github.com/whitep4nth3r" target="_blank">software engineer</a>, <a href="/blog/">writer</a>, and <a href="https://twitch.tv/whitep4nth3r">live streamer</a>. I help developers build 🔥 cool stuff 🔥 with blog posts, tutorial videos, live coding and open source projects. I work at <a href="https://ntl.fyi/3vA7krR" target="_blank">Netlify</a>.</p>
    <a href="/activity" class="homeAbout__seeAllCta">👀 See my new activity feed <span class="colorHighlight" aria-hidden="true">→</span></a>

    <script src="https://the-claw-webring-widget.netlify.app/the-claw-webring-widget.mjs" type="module"></script>
    <the-claw-webring-widget>
      <!-- fallback content in the case of no JavaScript -->
      <style>
        .tcww__inner {
          color: inherit;
          font-family: system-ui;
          padding: 1rem;
          font-size: 1rem;
        }
        .tcww__header {
          display: grid;
          gap: 0.5rem 1rem;
          align-items: center;
          margin-bottom: 1rem;
          justify-content: flex-start;
          grid-template-areas: "image title" "image view";
        }
        .tcww__title {
          grid-area: title;
          font-size: 1.4rem;
          margin: 0;
        }
        .tcww__image {
          grid-area: image;
          height: 4rem;
          transform: rotate(-8deg);
        }
        .tcww__view {
          grid-area: view;
          margin: 0;
          color: inherit;
        }
      </style>
      <div class="tcww__inner">
        <div class="tcww__header">
          <img
          src="https://the-claw-webring.netlify.app/img/theclaw.png"
          alt="The Claw Webring"
          class="tcww__image"
          />
          <h2 class="tcww__title">The Claw Webring</h2>
          <a href="https://github.com/whitep4nth3r/the-claw-webring" class="tcww__view">View on GitHub</p>
        </div>
      </div>
    </the-claw-webring-widget>
  </div>`;
}

module.exports = homeAbout;
