const SocialLinks = require("./socialLinks");
const VideoEmbed = require("./videoEmbed");

function TabbedBio({ shortBio, speakerBio, longBio }) {
  return /*html*/ `
  
  <div class="bio">
    <div class="bio__topRow">
      <div class="bio__buttons">
        <a href="#speaker" class="bio__button">Speaker bio</a>
        <a href="#long" class="bio__button" data-view="long">Long bio</a>
      </div>
      <div class="bio__links">
      ${SocialLinks({ uUrl: "https://whitep4nth3r.com/about/" })}
      </div>
    </div>
  
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
