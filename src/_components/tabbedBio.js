const VideoEmbed = require("./videoEmbed");

function TabbedBio({ shortBio, speakerBio, longBio }) {
  return /*html*/ `
  
  <div class="bio">
    <div class="bio__block">
      ${shortBio}
    </div>
    <div class="bio__block">
      <h2 id="speaker">Speaker bio</h2>
      ${speakerBio}
    </div>
    <div class="bio__block">
      <h2 id="long">Long bio</h2>
      ${longBio}
    </div>
  </div>
  `;
}

module.exports = TabbedBio;
