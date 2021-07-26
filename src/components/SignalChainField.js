import Component from "../core/Component";
import { createElement } from "../utils/DomHelper";
import Line from "./Line";
import SignalChain from "./SignalChain";

export default class SignalChainField extends Component {
  constructor(parentElement) {
    super(
      parentElement,
      createElement(
        "div",
        {
          class: "liner-wrapper"
        },
      ),
    );

    this.render();
  }

  mounted() {
    new Line(this.element);
    new SignalChain(this.element);
  }
}
