import Component from "../core/Component";
import { createElement } from "../utils/DomHelper";

export default class Line extends Component {
  constructor(parentElement) {
    super(
      parentElement,
      createElement(
        "span",
        {
          class: "line"
        }
      )
    );

    this.render();
  }
}
