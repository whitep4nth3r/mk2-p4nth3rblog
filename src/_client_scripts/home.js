function updateHeroHeight(hero, height) {
  hero.style.height = `calc(100svh - ${height}px)`;
}

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  const mediaQuery = window.matchMedia("(min-width: 1080px)");
  let heroTween;

  function handleMediaQuery(e) {
    if (e.matches) {
      if (!heroTween) {
        heroTween = gsap.to(".hero__name__inner", {
          x: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: "html",
            start: "top top",
            end: "+=500",
            scrub: true,
          },
        });
      }
    } else {
      if (heroTween) {
        heroTween.scrollTrigger.kill();
        heroTween.kill();
        heroTween = null;
      }
    }
  }

  handleMediaQuery(mediaQuery);
  mediaQuery.addEventListener("change", handleMediaQuery);

  const headerHeight = document.querySelector("header").offsetHeight;
  const hero = document.querySelector("[data-hero]");

  updateHeroHeight(hero, headerHeight);

  window.addEventListener("resize", () => {
    const updatedHeaderHeight = document.querySelector("header").offsetHeight;
    updateHeroHeight(hero, updatedHeaderHeight);
  });
});
