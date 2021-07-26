import Component from "../core/Component";
import { createElement } from "../utils/DomHelper";

export default class Header extends Component {
  constructor(parentElement) {
    super(
      parentElement,
      createElement(
        "header",
        {
          class: "center-flex",
        },
        `
          <section class="title center-flex">
            Web Multi Effector TG-1
          </section>
        `
      )
    );

    this.render();
  }
}
