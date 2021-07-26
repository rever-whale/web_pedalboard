import Component from "../core/Component";
import { createElement } from "../utils/DomHelper";

export default class Footer extends Component {
  constructor(parentElement) {
    super(
      parentElement,
      createElement(
        "footer",
        {
          class: "center-flex"
        },
        'developed by cayde.abdo'
      ),
    );

    this.render();
  }
}
