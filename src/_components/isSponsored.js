const StarIcon = require("../_components/svg/starIcon");

function isSponsored() {
  return /*html*/ `
    <span class="post__isSponsored">
      <span class="post__isSponsoredIcon">${StarIcon()}</span>
      Sponsored
    </span>
  `;
}

module.exports = isSponsored;
