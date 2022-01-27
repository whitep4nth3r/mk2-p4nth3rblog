const WavyCheckIcon = require("../_components/svg/wavyCheckIcon");

function formatUrlForDisplay(url) {
  return new URL(url).hostname;
}

function ExternalUrl({ url }) {
  if (url) {
    return /* html */ `
      <a
        class="externalUrl"
        href="${url}"
        target="_blank"
        rel="nofollow noreferrer">
        <span class="isSponsored__icon">${WavyCheckIcon()}</span>
        Originally posted on ${formatUrlForDisplay(url)}
      </a>
      `;
  } else {
    return "";
  }
}

module.exports = ExternalUrl;
