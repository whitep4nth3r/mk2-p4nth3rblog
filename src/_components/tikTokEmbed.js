//

function TikTokEmbed({ embedCode, title }) {
  return /* html */ `
    <p class="videoEmbed__cta">On TikTok: ${title}</p>
    <div class="videoEmbed__tiktok" data-tiktok data-embed-code=${encodeURI(embedCode)}>
      <span class="videoEmbed__tiktokOverlay" data-overlay></span>
      <div data-target></div>
    </div>

    <script>
      const tiktok = document.querySelector("[data-tiktok]");
      let loaded = false;
      const options = {
        root: null,
        threshold: 0.1
      }

      const loadTikTok = (entries, observer) => {
        entries.forEach(entry => {
          if(!loaded && entry.isIntersecting) {
            const overlay = entry.target.querySelector("[data-overlay]")
            const target = entry.target.querySelector("[data-target]");
            const embedCode = entry.target.dataset.embedCode;

            target.innerHTML = decodeURI(embedCode);
            const script = document.createElement("script");
            script.src = "https://www.tiktok.com/embed.js";
            document.head.append(script);
            overlay.style.opacity = 0;
            loaded = true;
          }
        });
      };

      const observer = new IntersectionObserver(loadTikTok, options);
      observer.observe(tiktok);
    </script>
    `;
}

module.exports = TikTokEmbed;
