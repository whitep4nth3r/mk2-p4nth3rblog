function TabbedBio({ shortBio, medBio, longBio }) {
  return /*html*/ `
  
  <div class="bio">
    <span class="bio__line"></span>
    <div class="bio__buttons">
      <button type="button" class="bio__button" data-view="short">View short bio</button>
      <button type="button" class="bio__button" data-view="med">View medium bio</button>
      <button type="button" class="bio__button" data-view="long">View long bio</button>
    </div>
  </div>

  <div class="bio__block bio__block--show" data-bio="short">
    ${shortBio}
  </div>
  <div class="bio__block" data-bio="med">
    ${medBio}
  </div>
  <div class="bio__block" data-bio="long">
    ${longBio}
  </div>
  
  <script importance="low">
    const buttons = document.querySelectorAll("[data-view]");
    const bios = document.querySelectorAll("[data-bio]");
        
    function viewBio(length) {
      bios.forEach(bio => {
        if (bio.getAttribute("data-bio") === length) {
          bio.style.display = "block";
        } else {
          bio.style.display = "none";
        }
      });
    }

    buttons.forEach(button => button.addEventListener("click", function(e) {
      viewBio(e.target.getAttribute("data-view"))
    }))
  </script>
  `;
}

module.exports = TabbedBio;
