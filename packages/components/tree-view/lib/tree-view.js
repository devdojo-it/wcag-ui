/** biome-ignore-all lint/correctness/noUnusedImports: <this is a template> */
import { componentDecorator, helpers } from "@wcag-ui/core";
import { DOM } from "@wcag-ui/dom";

import attributes from './tree-view.attributes';
import events from './tree-view.events';

/**
 * wcagUI treeView class
 *
 * @export
 * @class treeView
 * @extends {HTMLElement}
 */
export class TreeView extends HTMLElement {
  static isAttribute = 'wcag-tree-view';
  static extendsElement = 'section';
  static attributes = attributes;
  static events = events;

  /**
   * static initialization
   *
   * @static
   * @memberof treeView
   */
  static {
    // biome-ignore lint/complexity/noThisInStatic: <"this" is needed to keep names with esbuild>
    componentDecorator(this);

  }

  constructor() {
    super();

    this.#init();
  }

  #init() {
  }
}
