function Pagination({ previous, next, currentPage, totalPages }) {
  return /* html */ `
  <nav aria-labelledby="pagination" class="pagination">
     <p id="pagination" class="pagination__description">Next and previous pagination</p>
     <ol class="pagination__list">
      <li class="pagination__listItem">${
        previous ? `<a href="${previous}">← Previous</a>` : ""
      }</li>
      <li class="pagination__listItem">Page ${currentPage + 1} of ${totalPages}</li>
      <li class="pagination__listItem">${next ? `<a href="${next}">Next →</a>` : ""}</li>
    </ol>
  </nav>`;
}

module.exports = Pagination;
