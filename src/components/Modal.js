import Component from "../core/Component";
import { createElement } from "../utils/DomHelper";

export default class Modal extends Component {
  title = 'Title';
  description = 'Description'

  constructor(parentElement) {
    super(
      parentElement,
      createElement(
        "div",
        {
          class: "dimmedLayer",
        },
        `
          <div class="modal">
            <div class="effector_title">Title</div>
            <div class="effector_control">Description</div>
          </div>
        `
      )
    );

    this.render();
  }
}
