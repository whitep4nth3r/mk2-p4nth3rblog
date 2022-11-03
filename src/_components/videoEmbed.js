function VideoEmbed({ embedUrl, title, showTitle = true }) {
  // the embed URL needs to be in a <p> tag for the youtube plugin!
  return /* html */ `
    ${showTitle ? ` <p class="videoEmbed__cta">Click below to play ${title}</p>` : ""}
    <p>${embedUrl}</p>`;
}

module.exports = VideoEmbed;
