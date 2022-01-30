const SeeAllCta = require("./seeAllCta");

function GetInvolvedOpenSource() {
  return /*html*/ `
    <div class="getInvolved">
      <h3 class="getInvolved__title">Get involved with open source</h3>
      <div class="getInvolved__excerpt">
        <p>TO DO TO DO</p>
      </div>
    ${SeeAllCta({ things: "open source projects", url: "/projects/" })}
    </div>
  `;
}

module.exports = GetInvolvedOpenSource;
