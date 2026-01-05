document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(".hero__name__inner", {
    x: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: "html",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  const headerHeight = document.querySelector("header").offsetHeight;
  const hero = document.querySelector("[data-hero]");
  hero.style.height = `calc(100svh - ${headerHeight}px)`;

  

  window.addEventListener("resize", () => {
    const updatedHeaderHeight = document.querySelector("header").offsetHeight;
    hero.style.height = `calc(100svh - ${updatedHeaderHeight}px)`;
  });
});
