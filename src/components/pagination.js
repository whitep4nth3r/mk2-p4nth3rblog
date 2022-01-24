function Pagination(data) {
  return `<nav aria-labelledby="pagination">
  <p>START PAGINATION</p>
     <ol>
      <li>${data.pagination.href.previous ? `<a href="${data.pagination.href.previous}">Previous</a>` : `Previous`}</li>
      <li>Page ${data.pagination.pageNumber + 1} of ${data.pagination.pages.length}</li>
      <li>${data.pagination.href.next ? `<a href="${data.pagination.href.next}">Next</a>` : `Next`}</li>
    </ol>
    </nav>`;
}

module.exports = Pagination;
