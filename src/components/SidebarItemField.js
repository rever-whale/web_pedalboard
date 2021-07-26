import Component from "../core/Component";
import { createElement } from "../utils/DomHelper";

export default class SidebarItemField extends Component {
  constructor(parentElement, effector) {
    super(
      parentElement,
      createElement(
        'div',
        {
          class: 'item_field',
        },
        `
          <div class="item_title">${effector.title}</div>
          <div class="item_description">${effector.description}</div>
        `
      )
    );

    this.render();
  }
}
