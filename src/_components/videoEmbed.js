function VideoEmbed({ embedUrl, showTitle = true, isShort = false }) {
  // the embed URL needs to be in a <p> tag for the youtube plugin!
  const modifierClass = isShort ? `class="videoEmbed__ytShort"` : "";
  return /* html */ `
    <div ${modifierClass}>
      <p>${embedUrl}</p>
    </div>
    ${showTitle ? ` <p class="videoEmbed__cta">Click the video above to play</p>` : ""}`;
}

module.exports = VideoEmbed;
