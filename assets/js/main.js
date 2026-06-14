const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll("[data-reveal]");
const siteHeader = document.querySelector(".site-header");
const heroSection = document.querySelector(".hero");
const corePhones = document.querySelectorAll(".core-phone");

function setupReveal() {
  if (!("IntersectionObserver" in window) || reducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupHeader() {
  if (!siteHeader) {
    return;
  }

  const updateHeader = () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function setupCoreShowcase() {
  if (!corePhones.length) {
    return;
  }

  corePhones.forEach((phone) => {
    phone.addEventListener("click", () => {
      corePhones.forEach((item) => item.classList.toggle("is-active", item === phone));
    });

    phone.addEventListener("focus", () => {
      corePhones.forEach((item) => item.classList.toggle("is-active", item === phone));
    });
  });
}

setupReveal();
setupHeader();
setupCoreShowcase();
