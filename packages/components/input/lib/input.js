import "./styles/input.css";

import { componentDecorator } from "@wcag-ui/core";
import { DOM } from "@wcag-ui/dom";

import attributes from "./input.attributes";
import events from "./input.events";

export class Input extends HTMLInputElement {
  static name = "wcag-input";
  static extends = "input";
  static attributes = attributes;
  static events = events;

  static {
    componentDecorator("Input", Input);
  }

  constructor() {
    super();

    this.initialize();
  }

  initialize() {
    !this.hasAttribute("type") && this.setAttribute("type", "text");

    const fieldWrapper = DOM.wrapElement(this, {
      tag: "span",
      attributes: { "field-wrapper": "" },
    });

    const label = DOM.wrapElement(fieldWrapper, { tag: "label" });
    DOM.insertHTML(this.ariaLabel, label, "prepend");
  }
}
