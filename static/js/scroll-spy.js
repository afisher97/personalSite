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

  let currentActive = null;

  // Intersection Observer options
  const observerOptions = {
    root: null,
    /*
      rootMargin works like extra “padding” around the viewport.
      Negative top margin => trigger earlier (when the section is ~X% down from the top).
      Negative bottom margin => un-trigger earlier.
      Tweak these numbers until the highlighting behavior feels right.
    */
    rootMargin: "-50% 0px -50% 0px",
    threshold: 0 // we only need to know if it’s intersecting at all
  };

  // Create the observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;

        // Only update highlight if we're actually in a new section
        if (currentActive !== sectionId) {
          // Remove 'active' from all nav links
          navLinks.forEach(link => link.classList.remove("active"));
          // Add 'active' to the link that matches this section
          if (navLinkMap[sectionId]) {
            navLinkMap[sectionId].classList.add("active");
          }
          currentActive = sectionId;
        }
      }
    });
  }, observerOptions);

  // Observe each section
  sections.forEach(section => observer.observe(section));
});
