import Component from "../core/Component";
import { createElement } from "../utils/DomHelper";
import Block from "./Block";
import SidebarItemField from "./SidebarItemField";

export default class SidebarItem extends Component {
  effector;

  constructor(parentElement, effector) {
    super(
      parentElement,
      createElement(
        "div",
        {
          class: "item"
        },
      )
    );

    this.effector = effector;
    this.render();
  }

  mounted () {
    new Block(this.element, this.effector);
    new SidebarItemField(this.element, this.effector);
  }
}
