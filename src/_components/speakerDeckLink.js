const ResponsiveImage = require("./responsiveImage");

function SpeakerDeckLink({ speakerDeckLink }) {
  return /* html */ `
  <div>
    ${ResponsiveImage({ image: speakerDeckLink.image })}
    <a href="${speakerDeckLink.link}" target="_blank" title="View ${speakerDeckLink.title} on Speaker Deck">
        View on Speaker Deck
    </a>
  </div>
  `;
}

module.exports = SpeakerDeckLink;
