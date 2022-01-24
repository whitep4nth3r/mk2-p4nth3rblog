function Pagination({ previous, next, currentPage, totalPages }) {
  return `<nav aria-labelledby="pagination">
     <p id="pagination">Next and previous pagination</p>
     <ol>
      <li>${previous ? `<a href="${previous}">Previous</a>` : `Previous`}</li>
      <li>Page ${currentPage + 1} of ${totalPages}</li>
      <li>${next ? `<a href="${next}">Next</a>` : `Next`}</li>
    </ol>
    </nav>`;
}

module.exports = Pagination;
