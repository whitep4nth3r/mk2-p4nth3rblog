function VideoEmbed({ embedUrl, title }) {
  // the embed URL needs to be in a <p> tag for the youtube plugin!

  // TO DO
  return /* html */ `
    <p class="videoEmbed__cta">Click below to play ${title}</p>
    <p>${embedUrl}</p>`;
}

module.exports = VideoEmbed;
