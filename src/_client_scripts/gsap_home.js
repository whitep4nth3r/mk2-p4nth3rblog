document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);
  console.log("here");

  gsap.to(".hero__name__inner", {
    x: "-100%", // Move the text completely to the left
    ease: "none", // Linear movement
    scrollTrigger: {
      trigger: "html", // The section that triggers the animation
      start: "top top", // Start when the top of `.hero` hits the top of the viewport
      end: "bottom top", // End when the bottom of `.hero` hits the top of the viewport
      scrub: true, // Smoothly link the animation to scroll progress
    },
  });
});
