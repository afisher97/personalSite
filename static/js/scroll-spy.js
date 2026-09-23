document.addEventListener("DOMContentLoaded", () => {
  // Grab all sections that have an ID (so we can match them to nav links)
  const sections = document.querySelectorAll("main section[id]");
  // Grab all nav links that have .nav-link class
  const navLinks = document.querySelectorAll(".nav-link");

  // Map section ID -> corresponding nav link
  const navLinkMap = {};
  navLinks.forEach(link => {
    const sectionId = link.getAttribute("href").replace("#", "");
    navLinkMap[sectionId] = link;
  });

  // A section becomes active once its top scrolls above this line
  // (fraction of viewport height). Works no matter how short a section is.
  const ACTIVE_LINE = 0.3;

  let currentActive = null;

  function updateActive() {
    // Default to the first section (top of page)
    let activeId = sections[0].id;

    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

    if (atBottom) {
      // Short final sections may never reach the line, so force the last one
      activeId = sections[sections.length - 1].id;
    } else {
      // Last section whose top is above the line wins
      sections.forEach(section => {
        if (section.getBoundingClientRect().top <= window.innerHeight * ACTIVE_LINE) {
          activeId = section.id;
        }
      });
    }

    // Only update highlight if we're actually in a new section
    if (activeId !== currentActive) {
      navLinks.forEach(link => link.classList.remove("active"));
      if (navLinkMap[activeId]) {
        navLinkMap[activeId].classList.add("active");
      }
      currentActive = activeId;
    }
  }

  window.addEventListener("scroll", updateActive, { passive: true });
  window.addEventListener("resize", updateActive);
  updateActive();
});
