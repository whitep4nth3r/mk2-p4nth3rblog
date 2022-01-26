function VideoEmbed({ embedUrl, title }) {
  // the embed URL needs to be in a <p> tag for the youtube plugin!
  return /* html */ `
  <div>
    <h3>Click below to play ${title}</h3>
    <p>${embedUrl}</p>
  </div>`;
}

module.exports = VideoEmbed;
