const SeeAllCta = require("./seeAllCta");

function GetInvolvedOpenSource() {
  return /*html*/ `
    <div class="homeCard">
      <h1 class="homeCard__title">Get involved with open source</h1>
      <div class="homeCard__excerpt">
        <p>TO DO TO DO</p>
      </div>
    ${SeeAllCta({ things: "open source projects", url: "/projects/" })}
    </div>
  `;
}

module.exports = GetInvolvedOpenSource;
