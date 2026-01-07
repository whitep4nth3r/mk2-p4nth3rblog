document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  const mediaQuery = window.matchMedia("(min-width: 1080px)");
  let authorTween;

  function handleMediaQuery(e) {
    if (e.matches) {
      if (!authorTween) {
        authorTween = gsap.to(".author__name__svg", {
          y: "-40%%",
          rotation: "-10deg",
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: ".author__name",
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
    } else {
      if (authorTween) {
        authorTween.scrollTrigger.kill();
        authorTween.kill();
        authorTween = null;
      }
    }
  }

  handleMediaQuery(mediaQuery);
  mediaQuery.addEventListener("change", handleMediaQuery);
});
