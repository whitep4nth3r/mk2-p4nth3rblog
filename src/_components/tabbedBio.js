const SocialLinks = require("./socialLinks");
const VideoEmbed = require("./videoEmbed");

function TabbedBio({ shortBio, speakerBio, longBio }) {
  return /*html*/ `
  
  <div class="bio">
    <div class="bio__topRow">
      <div class="bio__buttons">
        <a href="#short" class="bio__button bio__button--selected">Short bio</a>
        <a href="#speaker" class="bio__button">Speaker bio</a>
        <a href="#long" class="bio__button" data-view="long">Long bio</a>
        <a href="#video" class="bio__button" data-view="video">Video story</a>
      </div>
      <div class="bio__links">
      ${SocialLinks()}
      </div>
    </div>
  
    <div class="bio__block" id="short">
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
    <div class="bio__block" data-bio="video">
      <h2 id="video">Video story</h2>
      ${VideoEmbed({ embedUrl: "https://www.youtube.com/embed/j5ahKhnnKd4" })} 
    </div>
  </div>
  `;
}

module.exports = TabbedBio;
