// const Tools = require("../../lib/tools");

function AboutTableOfContents() {
  return `
    <details class="tableOfContents" open>
    <summary class="tableOfContents__header">Quick links</summary>
    <ol class="tableOfContents__list">
     <li class="tableOfContents__item">
        <a href="#about_me" class="tableOfContents__itemLink">About me<span class="tableOfContents__arrow">→</span></a>
      </li>
      <li class="tableOfContents__item">
        <a href="#about_events" class="tableOfContents__itemLink">Events<span class="tableOfContents__arrow">→</span></a>
      </li>
      <li class="tableOfContents__item">
        <a href="/uses/" class="tableOfContents__itemLink">Things I use<span class="tableOfContents__arrow">→</span></a>
      </li>
      <li class="tableOfContents__item">
        <a href="/dashboard/" class="tableOfContents__itemLink">Dashboard<span class="tableOfContents__arrow">→</span></a>
      </li>
      <li class="tableOfContents__item">
        <a href="https://www.bonfire.com/store/p4nth3rshop/"
        rel="nofollow noreferrer"
        target="_blank" class="tableOfContents__itemLink">Merch<span class="tableOfContents__arrow">→</span></a>
      </li>
    </ol>
    </details>
    `;
}

module.exports = AboutTableOfContents;
