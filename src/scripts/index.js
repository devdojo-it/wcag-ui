import "@wcag-ui/accordion";
import "@wcag-ui/button";
import "@wcag-ui/details";
import "@wcag-ui/input";
import "@wcag-ui/scroll-spy";

import "./_highlight.js";

function handleMainMenu() {
  const mainMenu = document.querySelector("body > header nav");
  const path = location.pathname;

  mainMenu?.querySelector(`[href*="${path}"]`)?.setAttribute("active", "");
}

function fixExternalLinks() {
  const externalLinks = document.querySelectorAll('a[href^="http"]');

  for (const externalLink of externalLinks) {
    externalLink.setAttribute("target", "_blank");
    externalLink.setAttribute("rel", "noopener noreferrer");
  }
}

function initColorSchemeSwitcher() {
  const sessionStorageColorScheme = sessionStorage.getItem("selected-color-scheme");
  const colorSchemeMetaElement = document.querySelector('meta[name="color-scheme"]');

  const currentColorScheme =
    sessionStorageColorScheme ?? colorSchemeMetaElement?.getAttribute("content") ?? "light dark";

  colorSchemeMetaElement?.setAttribute("content", currentColorScheme);
  document.querySelector(`input[name="color-scheme"][value="${currentColorScheme}"]`).click();

  document.querySelector("body > header menu").addEventListener("change", (e) => {
    if (e.target.getAttribute("name") === "color-scheme") {
      colorSchemeMetaElement?.setAttribute("content", e.target.value);
      sessionStorage.setItem("selected-color-scheme", e.target.value);
    }
  });
}

addEventListener("DOMContentLoaded", () => {
  handleMainMenu();
  fixExternalLinks();
  initColorSchemeSwitcher();
});
