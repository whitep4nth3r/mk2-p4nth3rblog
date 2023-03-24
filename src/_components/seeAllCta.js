function SeeAllCta({ things, url }) {
  return /*html*/ `
    <a href="${url}" class="seeAllCta">See all ${things} <span aria-hidden="true">→</span></a>
  `;
}

module.exports = SeeAllCta;
