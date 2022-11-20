"use strict";

let slideNav = document.getElementById("sliding-nav");
let openNavButtons = document.querySelectorAll("[data-command=open-nav]");
let headerEl = slideNav.querySelector(".sliding-nav-header");
let bodyEl = slideNav.querySelector(".sliding-nav-menu-items");
let closeNavButtons = document.querySelectorAll("[data-command=close-nav]");
let overlay = document.getElementById("overlay");

openNavButtons.forEach((button) => {
  button.addEventListener("click", openNav);
});

closeNavButtons.forEach((button) => {
  button.addEventListener("click", closeNav);
});

layoutNav();

window.addEventListener("resize", layoutNav);

function layoutNav() {
  let headerHeight = headerEl.offsetHeight;
  let viewportHeight = window.innerHeight;
  let bodyHeight = viewportHeight - headerHeight;
  bodyEl.style.height = bodyHeight + "px";
}

function openNav() {
  freezeUnderlyingPage();
  showOverlay();
  slideNav.style.transform = "translateX(0)";
}

function closeNav() {
  unFreezeUnderlyingPage();
  hideOverlay();
  slideNav.style.transform = "translateX(100%)";
}

function showOverlay() {
  overlay.style.transform = "translateX(0)";
  overlay.style.opacity = 0.4;
}

function hideOverlay() {
  overlay.style.opacity = 0;
  overlay.addEventListener("transitionend", function anon() {
    overlay.removeEventListener("transitionend", anon);
    overlay.style.transform = "translateX(100%)";
  });
}

function freezeUnderlyingPage() {
  document.body.style.overflow = "hidden";
}

function unFreezeUnderlyingPage() {
  document.body.style.overflow = "auto";
}
