document.addEventListener("DOMContentLoaded", () => {
  const isReduced =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

  if (!!isReduced) {
    console.log("reduced");
  } else {
    gsap.registerPlugin(ScrollTrigger);

    const mediaQuery = window.matchMedia("(min-width: 1080px)");
    let heroTimeline;

    function handleMediaQuery(e) {
      if (e.matches) {
        if (heroTimeline) {
          heroTimeline.scrollTrigger?.kill();
          heroTimeline.kill();
          heroTimeline = null;
        }

        heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".about__hero__image",
            start: "top top",
            endTrigger: ".footer",
            end: "top top",
            pin: ".about__hero__image",
            pinSpacing: false,
            scrub: true,
          },
        });

        heroTimeline.to(".about__hero__image img", {
          y: "-15%",
          scale: 1.2,
          ease: "none",
        });
      } else {
        if (heroTimeline) {
          heroTimeline.scrollTrigger?.kill();
          heroTimeline.kill();
          heroTimeline = null;
        }
      }
    }

    handleMediaQuery(mediaQuery);

    mediaQuery.addEventListener("change", handleMediaQuery);
  }
});
