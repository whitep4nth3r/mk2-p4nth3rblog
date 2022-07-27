const BioImage = require("../_components/bioImage");

function BlogSidebarAuthor({ author }) {
  return /*html*/ `
  <div class="blogSidebarAuthor">
    <div class="blogSidebarAuthor__imgContainer">
      ${BioImage({ image: author.imageBio })}
    </div>
    <a href="/about/" class="blogSidebarAuthor__cta">by ${
      author.name
    } <span class="colorHighlight" role="presentation">→</span></a>

    <div class="blogSidebarAuthor__cta2">
      <p class="blogSidebarAuthor__cta2__text">Do you want more content about web dev, CSS and JavaScript?</p>
      <a class="blogSidebarAuthor__cta2__link" href="https://twitch.tv/whitep4nth3r" target="_blank"><svg
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Twitch logo"
          height="24"
          width="24"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z"
          />
        </svg>
        <span>Watch me Code</span></a>
    </div>
  </div>
  `;
}

module.exports = BlogSidebarAuthor;
