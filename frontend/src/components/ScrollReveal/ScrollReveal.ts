import ScrollReveal from "scrollreveal";

export function initScrollReveal() {
  ScrollReveal().reveal(".reveal", {
    distance: "50px",
    duration: 800,
    easing: "ease-out",
    origin: "bottom",
    reset: false,
  });
}