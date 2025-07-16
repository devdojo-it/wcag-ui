/**
 * Very rough detection of the current browser based on various feature checks and user agent parsing.
 * @return {Object} An object containing boolean flags that indicate the detected browser
 */

export const detector = () => {
  const isBlink =
    ("chrome" in window || ("Intl" in window && "v8BreakIterator" in window.Intl)) &&
    "CSS" in window;

  // Edge (Chromium Based)
  const isEdge = "chrome" in window && isBlink && navigator.userAgent.indexOf("Edg") != -1;

  // Opera 8.0+
  const isOpera =
    (!!window.opr && !!window.opr.addons) ||
    !!window.opera ||
    navigator.userAgent.indexOf(" OPR/") >= 0;

  // Chrome 1+
  const isChrome = "chrome" in window && isBlink && !isEdge && !isOpera;

  // Firefox 1.0+
  // @ts-ignore
  const isFirefox = typeof InstallTrigger !== "undefined";

  // Safari 3.0+ "[object HTMLElementConstructor]"
  const isSafari =
    (/constructor/i.test(window.HTMLElement) ||
      ((p) => p.toString() === "[object SafariRemoteNotification]")(
        !window.safari ||
          (typeof window.safari !== "undefined" && window["safari"].pushNotification)
      )) &&
    !isBlink;

  return {
    isChrome,
    isSafari,
    isOpera,
    isFirefox,
    isEdge,
  };
};
