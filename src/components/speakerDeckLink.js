const ResponsiveImage = require("../components/responsiveImage");

function SpeakerDeckLink({ speakerDeckLink }) {
  return `
  <div>
    ${ResponsiveImage({ image: speakerDeckLink.image })}
    <a href="${speakerDeckLink.link}" target="_blank" title="View ${speakerDeckLink.title} on Speaker Deck">
        View on Speaker Deck
    </a>
  </div>
  `;
}

module.exports = SpeakerDeckLink;
