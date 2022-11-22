function applyEffect() {
  let reduced = false;
  let first = true;

  let banner = document.querySelector("[role=banner]");

  document.addEventListener(
    "DOMContentLoaded",
    function () {
      window.addEventListener("scroll", resizeBanner);

      function resizeBanner() {
        let pageYOffset = window.pageYOffset;

        if (pageYOffset > 100) {
          if (!reduced) {
            reduced = true;
            banner.classList.add("reduced");
          }
        } else {
          if (reduced) {
            reduced = false;
            banner.classList.remove("reduced");
          }
        }

        document.body.offsetHeight;

        if (first) {
          banner.style.transition = ".7s ease all";
          first = false;
        }
      }
    },
    false
  );
}

applyEffect();
