function VideoEmbed({ embedUrl, title, showTitle = true, isShort = false }) {
  // the embed URL needs to be in a <p> tag for the youtube plugin!
  const modifierClass = isShort ? `class="videoEmbed__ytShort"` : "";
  return /* html */ `
    ${showTitle ? ` <p class="videoEmbed__cta">Click below to play ${title}</p>` : ""}
    <div ${modifierClass}>
      <p>${embedUrl}</p>
    </div>`;
}

module.exports = VideoEmbed;
