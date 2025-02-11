const copyButtons = document.querySelectorAll(`[data-copy]`);

copyButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const codeId = e.target.dataset.copy;
    const codeAsText = document.querySelector(`[data-code-id=${codeId}]`).getAttribute("content");
    navigator.clipboard.writeText(decodeURIComponent(codeAsText));
  });
});