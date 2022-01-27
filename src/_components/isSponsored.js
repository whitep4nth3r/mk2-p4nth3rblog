const StarIcon = require("../_components/svg/starIcon");

function isSponsored() {
  return /*html*/ `
    <span class="isSponsored">
      <span class="isSponsored__icon">${StarIcon()}</span>
      Sponsored
    </span>
  `;
}

module.exports = isSponsored;
