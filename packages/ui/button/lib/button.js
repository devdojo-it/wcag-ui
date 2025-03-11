import { componentDecorator } from "@wcag-ui/core";

import './styles/button.css';

import attributes from "./button.attributes";
import events from "./button.events";

export class Button extends HTMLButtonElement {
  static name = "wcag-button";
  static extends = "button";
  static attributes = attributes;
  static events = events;

  static {
    componentDecorator("Button", Button);
  }

  constructor() {
    super();

    this.initialize();
  }

  initialize() {
    !this.hasAttribute("type") && this.setAttribute("type", "button");
    !this.hasAttribute("role") && this.setAttribute("role", "button");
  }
}
