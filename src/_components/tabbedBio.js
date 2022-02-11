function TabbedBio({ shortBio, medBio, longBio }) {
  return /*html*/ `
  
  <div class="bio">

    <div class="bio__buttons">
      <button type="button" class="bio__button bio__button--selected" data-view="short">Short bio</button>
      <button type="button" class="bio__button" data-view="med">Medium bio</button>
      <button type="button" class="bio__button" data-view="long">Long bio</button>
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

    function selectButton(length) {
       buttons.forEach(btn => {
        if (btn.getAttribute("data-view") === length) {
          btn.classList = "bio__button bio__button--selected";
        } else {
          btn.classList = "bio__button";
        }
      });
    }
    
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
      selectButton(e.target.getAttribute("data-view"))
    }))
  </script>
  `;
}

module.exports = TabbedBio;
