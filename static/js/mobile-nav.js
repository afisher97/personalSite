document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  // Toggle .show-menu on hamburger click
  hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("show-menu");
  });

  // Close menu when clicking a link (optional)
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("show-menu");
    });
  });
});