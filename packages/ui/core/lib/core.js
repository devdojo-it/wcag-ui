"use strict";

import { encodeBase64, decodeBase64, jsonToBase64 } from "@wcag-js/core";
import "@wcag-js/string";

console.log(
  "encodeBase64",
  encodeBase64("Hello, world!"),
  encodeBase64("Hello, world!") === "SGVsbG8lMkMlMjB3b3JsZCE="
);

console.log(
  "decodeBase64",
  decodeBase64("SGVsbG8lMkMlMjB3b3JsZCE="),
  decodeBase64("SGVsbG8lMkMlMjB3b3JsZCE=") === "Hello, world!"
);

console.log(
  "jsonToBase64",
  jsonToBase64({ hello: "world" }),
  jsonToBase64({ hello: "world" }) === "JTdCJTIyaGVsbG8lMjIlM0ElMjJ3b3JsZCUyMiU3RA=="
);

import "./polyfills";

export * from "./decorator";
