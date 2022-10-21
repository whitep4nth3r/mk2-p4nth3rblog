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
    <h2 class="homeAbout__subtitle">Staff Developer Experience Engineer at <a href="https://ntl.fyi/3vA7krR" target="_blank">Netlify</a></h2>
    <p class="homeAbout_minibio">I'm a <a href="https://github.com/whitep4nth3r" target="_blank">software engineer</a>, <a href="/blog/">writer</a>, and <a href="https://twitch.tv/whitep4nth3r">live streamer</a>. I help developers build stuff, learn things, and love what they do through blog posts, tutorial videos, live coding and building open source projects.</p>
  </div>`;
}

module.exports = homeAbout;
