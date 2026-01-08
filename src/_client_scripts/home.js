function updateHeroHeight(hero, height) {
  hero.style.height = `calc(100dvh - ${height}px)`;
}

document.addEventListener("DOMContentLoaded", (event) => {
  const largeLayout = window.matchMedia("(min-width: 1080px)");

  const isReduced =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

  if (!!isReduced) {
  } else {
    gsap.registerPlugin(ScrollTrigger);
    let nameTween, imgTween;

    function handleMediaQuery(e) {
      if (e.matches) {
        if (!nameTween) {
          nameTween = gsap.to(".hero__name__inner", {
            x: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: "html",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          imgTween = gsap.to(".hero__image img", {
            scale: 1.2,
            y: "-20%",
            ease: "none",
            scrollTrigger: {
              trigger: "html",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      } else {
        if (nameTween) {
          nameTween.scrollTrigger.kill();
          nameTween.kill();
          nameTween = null;

          imgTween.scrollTrigger.kill();
          imgTween.kill();
          imgTween = null;
        }
      }
    }

    handleMediaQuery(largeLayout);
    largeLayout.addEventListener("change", handleMediaQuery);
  }

  const headerHeight = document.querySelector("header").offsetHeight;
  const hero = document.querySelector("[data-hero]");

  updateHeroHeight(hero, headerHeight);

  window.addEventListener("resize", () => {
    console.log("resixing");

    const updatedHeaderHeight = document.querySelector("header").offsetHeight;
    updateHeroHeight(hero, updatedHeaderHeight);
  });
});
