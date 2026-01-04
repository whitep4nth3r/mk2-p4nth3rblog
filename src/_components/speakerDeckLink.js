const ResponsiveImage = require("./responsiveImage");

function SpeakerDeckLink({ speakerDeckLink }) {
  return /* html */ `
  <div class="speakerDeckLink">
    ${ResponsiveImage({ image: speakerDeckLink.image })}
    <a href="${speakerDeckLink.link}" class="speakerDeckLink__viewCta" target="_blank">
        View slides
    </a>
  </div>
  `;
}

module.exports = SpeakerDeckLink;
