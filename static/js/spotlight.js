// Move the radial-gradient spotlight to follow the cursor
document.addEventListener("DOMContentLoaded", () => {
  const spotlight = document.querySelector(".spotlight");
  if (!spotlight) return;

  document.addEventListener("mousemove", (e) => {
    spotlight.style.setProperty("--x", `${e.clientX}px`);
    spotlight.style.setProperty("--y", `${e.clientY}px`);
    spotlight.classList.add("visible"); // stays hidden on touch devices
  });
});
