function Webring({ members, prevUrl, nextUrl }) {
  return /* html */ `
  <h2 class="tcwr__title">The Claw <span>webring</span></h2>
  <div class="tcwr__nav">
    <a href=${prevUrl} class="tcwr__navItem">Previous</a>
    <button class="tcwr__navItem--random" data-webring-random>Random</button>
    <a href="${nextUrl}" class="tcwr__navItem">Next</a>
  </div>
  <ul class="tcwr__membersList">
    ${members
      .map(
        (member) => `
        <li class="tcwr__membersListItem">
          <a href="${member.url}" class="tcwr__membersListItemLink">
            ${member.name}
          </a>
        </li>`,
      )
      .join("")}
  </ul>
  <a href="https://github.com/whitep4nth3r/the-claw-webring#join-the-claw-webring" class="tcwr__join">Join</a>

  <script type="text/json" id="members">
    ${JSON.stringify(members)}
  </script>
  
  <script type="module">
    function getRandomInt(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }

    export function getRandomEntry(array) {
      return array[getRandomInt(0, array.length - 1)];
    }

    const members = JSON.parse(document.getElementById("members").textContent);
    const randomButton = document.querySelector("[data-webring-random]");

    randomButton.addEventListener("click", () => {
      window.location.href = getRandomEntry(members).url;
    })
  </script>
  `;
}

module.exports = Webring;
