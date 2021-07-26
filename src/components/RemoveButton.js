import Component from "../core/Component";
import { createElement } from "../utils/DomHelper";

export default class RemoveButton extends Component {
  constructor(parentElement) {
    super(
      parentElement,
      createElement(
        "div",
        {
          id: "remove"
        },
        'Remove'
      )
    );

    this.render();
  }
}
