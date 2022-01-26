function formatUrlForDisplay(url) {
  return new URL(url).hostname;
}

function ExternalUrl({ url }) {
  if (url) {
    return /* html */ `<div>
      <p>Originally published on
        <a
        href="${url}"
        target="_blank"
        rel="nofollow noreferrer">
        ${formatUrlForDisplay(url)}
        </a>
      </p>
    </div>`;
  } else {
    return "";
  }
}

module.exports = ExternalUrl;
