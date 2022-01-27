// function formatUrlForDisplay(url) {
//   return new URL(url).hostname;
// }

function ExternalUrl({ url }) {
  if (url) {
    return /* html */ `
    <div class="externalUrl">
      <a
      class="externalUrl__link"
      href="${url}"
      target="_blank"
      rel="nofollow noreferrer">
      Original post
      </a>
    </div>`;
  } else {
    return "";
  }
}

module.exports = ExternalUrl;
