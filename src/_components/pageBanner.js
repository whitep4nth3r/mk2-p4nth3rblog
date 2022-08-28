function PageBanner({ title, copy }) {
  return /* html */ `
  <div class="page__intro">
    <h2 class="page__introTitle">${title}</h2>
    <p class="page__introText">${copy}</p>
  </div>`;
}

module.exports = PageBanner;
