function VideoEmbed({ embedUrl, title, isShort = false }) {
  const modifierClass = isShort ? ` videoEmbed__ytShort` : "";
  return /* html */ `
    <div class="videoEmbed${modifierClass}">
      <iframe
       class="videoEmbed__iframe"
        width="560"
        height="315"
        src="${embedUrl}"
        title="${title}"
        frameborder="0"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen>
      </iframe>
    </div>
    `;
}

module.exports = VideoEmbed;
