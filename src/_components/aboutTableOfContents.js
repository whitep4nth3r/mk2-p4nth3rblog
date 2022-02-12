const defaultOptions = { onUses: false, onDashboard: false, categories: [] };

function AboutTableOfContents({ onUses, onDashboard, categories } = defaultOptions) {
  const aboutMeLink = onUses || onDashboard ? "/about/#bio" : "#bio";
  const eventsLink = onUses || onDashboard ? "/about/#events" : "#events";

  return /*html*/ `
    <details class="tableOfContents" open>
    <summary class="tableOfContents__header">Quick links</summary>
    <ol class="tableOfContents__list">
     <li class="tableOfContents__item">
        <a href="${aboutMeLink}" class="tableOfContents__itemLink">About me<span class="tableOfContents__arrow">→</span></a>
      </li>
      <li class="tableOfContents__item">
        <a href="${eventsLink}" class="tableOfContents__itemLink">Events<span class="tableOfContents__arrow">→</span></a>
      </li>
      <li class="tableOfContents__item">
        <a href="/uses/" class="tableOfContents__itemLink">Things I use<span class="tableOfContents__arrow">→</span></a>
      </li>
      ${
        onUses
          ? categories
              .map(
                (cat) => `
          <li class="tableOfContents__item tableOfContents__item--nudged tableOfContents__item--cat">
            <a href="/uses/#${cat}" class="tableOfContents__itemLink">${cat} <span class="tableOfContents__arrow">→</span></a>
          </li>`,
              )
              .join("")
          : ""
      }
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
