const slider = document.querySelector(".slider");
const screen = document.querySelector(".screen");
let isScrolling = false;

// Scroll event listener
screen.addEventListener("scroll", () => {
  if (!isScrolling) {
    isScrolling = true;
    setTimeout(() => {
      const scrollPosition = screen.scrollTop;
      const slideHeight = screen.clientHeight;
      const currentSlide = Math.round(scrollPosition / slideHeight);

      // Snap to the nearest slide
      screen.scrollTo({
        top: currentSlide * slideHeight,
        behavior: "smooth",
      });

      isScrolling = false;
    }, 100); // Adjust the delay for smoother snapping
  }
});
