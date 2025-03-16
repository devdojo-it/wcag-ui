import "@wcag-ui/button";
import "@wcag-ui/input";
import "./_highlight.js";

addEventListener("DOMContentLoaded", () => {
  const externalLinks = document.querySelectorAll('a[href^="http"]');

  for (const externalLink of externalLinks) {
    externalLink.setAttribute("target", "_blank");
    externalLink.setAttribute("rel", "noopener noreferrer");
  }

  const sessionStorageColorScheme = sessionStorage.getItem("selected-color-scheme");
  const colorSchemeMetaElement = document.querySelector('meta[name="color-scheme"]');

  const currentColorScheme =
    sessionStorageColorScheme ?? colorSchemeMetaElement?.getAttribute("content") ?? "light dark";

  colorSchemeMetaElement?.setAttribute("content", currentColorScheme);
  document.querySelector(`input[name="color-scheme"][value="${currentColorScheme}"]`).click();

  document.addEventListener("change", (e) => {
    if (e.target.getAttribute("name") === "color-scheme") {
      colorSchemeMetaElement?.setAttribute("content", e.target.value);
      sessionStorage.setItem("selected-color-scheme", e.target.value);
    }
  });
});
