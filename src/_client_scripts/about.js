document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  const mediaQuery = window.matchMedia("(min-width: 1080px)");
  let aboutTween;
  function handleMediaQuery(e) {
    if (e.matches) {
      aboutTween = gsap.to(".about__hero__image", {
        y: "-15%",
        scale: "1.2",
        ease: "none",
        scrollTrigger: {
          trigger: ".about__hero__image",
          start: "top top",
          endTrigger: ".footer",
          end: "top top",
          pin: true,
          pinSpacing: false,
          scrub: true,
        },
      });
    } else {
      if (aboutTween) {
        aboutTween.scrollTrigger?.kill();
        aboutTween.kill();
        aboutTween = null;
      }
    }
  }

  handleMediaQuery(mediaQuery);
  mediaQuery.addEventListener("change", handleMediaQuery);
});
