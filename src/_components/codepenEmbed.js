function CodePenEmbed({ embedCode, title }) {
  return /* html */ `
    <div class="codePenEmbed__container" data-codepen data-embed-code=${encodeURI(
      embedCode,
    )}>
      <div data-target></div>
    </div>

    <script>
      const codepen = document.querySelector("[data-codepen]");
      let loaded = false;
      const options = {
        root: null,
        threshold: 0.1
      }

      const loadCodePen = (entries, observer) => {
        entries.forEach(entry => {
          
          if(!loaded && entry.isIntersecting) {
            const target = entry.target.querySelector("[data-target]");
            const embedCode = entry.target.dataset.embedCode;

            target.innerHTML = decodeURI(embedCode);
            const script = document.createElement("script");
            script.src = "https://cpwebassets.codepen.io/assets/embed/ei.js";
            document.head.append(script);
            loaded = true;
          }
        });
      };

      const observer = new IntersectionObserver(loadCodePen, options);
      observer.observe(codepen);
    </script>
    `;
}

module.exports = CodePenEmbed;
