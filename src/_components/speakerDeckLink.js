const ResponsiveImage = require("./responsiveImage");

function SpeakerDeckLink({ speakerDeckLink }) {
  return /* html */ `
  <div class="speakerDeckLink">
    ${ResponsiveImage({ image: speakerDeckLink.image })}
    <a href="${speakerDeckLink.link}"  class="speakerDeckLink__viewCta" target="_blank" title="View ${
    speakerDeckLink.title
  } on Speaker Deck">
        View slides
    </a>
  </div>
  `;
}

module.exports = SpeakerDeckLink;
