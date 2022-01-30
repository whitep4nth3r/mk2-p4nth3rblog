const SeeAllCta = require("./seeAllCta");

function GetInvolvedOpenSource() {
  return /*html*/ `
    <div class="homeCard">
      <h3 class="homeCard__title">Get involved with open source</h3>
      <div class="homeCard__excerpt">
        <p>TO DO TO DO</p>
      </div>
    ${SeeAllCta({ things: "open source projects", url: "/projects/" })}
    </div>
  `;
}

module.exports = GetInvolvedOpenSource;
