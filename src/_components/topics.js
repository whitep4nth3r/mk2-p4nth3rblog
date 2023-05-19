const CrossIcon = require("./svg/crossIcon");

function Topics({ topics, selected }) {
  return /* html */ `
  <div class="topics__topRow">
    <p class="topics__title">Filters</p>
    <button type="button" class="topics__closeButton" aria-pressed="false" aria-label="Close filters" data-close>
      ${CrossIcon()}
    </button>
  </div>
  <ul class="topics">
    ${selected ? `<li><a href="/blog/" class="topics__listItemLink">View all</a></li>` : ""}
    ${topics
      .map((topic) => {
        const highlight = selected === topic.slug;
        const ariaCurrent = selected === topic.slug ? ` aria-current="page"` : "";
        return /*html*/ `<li>
            <a href="/topics/${topic.slug}/"
              class="topics__listItemLink${highlight ? " topics__listItemLink--selected" : ""}"
              aria-label="View all ${topic.name} articles"${ariaCurrent}>
              <span class="topics__listItemName">
              ${topic.name}
              </span>
            </a>
        </li>`;
      })
      .join("")}
    </ul>

    <script>
      let catsVisible = false; 

      const toggle = document.querySelector("[data-toggle]");
      const cats = document.querySelector("[data-cats]");
      const body = document.querySelector("body");
      const close = document.querySelector("[data-close]");

      function closeCats() {
        cats.style.display = "none";
        catsVisible = false;
        body.style.position = "relative";
        toggle.setAttribute("aria-pressed", false);
      }
      
      function showCats() {
        cats.style.display = "block";
        catsVisible = true;
        body.style.position = "fixed";
        toggle.setAttribute("aria-pressed", true);
      }

      function toggleCats() {
        if (catsVisible) {
          closeCats();
        } else {
          showCats();
        }
      }

      toggle.addEventListener("click", () => {
        toggleCats();
      })

      close.addEventListener("click", () => {
        closeCats();
      })

      window.addEventListener("resize", (event) => {
        if(event.target.window.innerWidth > 768) {
          cats.style.display = "block";
          catsVisible = true;
        } else {
          cats.style.display = "none";
          catsVisible = false;
        }
      });
    </script>
    `;
}

module.exports = Topics;
