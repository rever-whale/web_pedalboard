import Component from "../core/Component";
import { createElement } from "../utils/DomHelper";

import Block from "./Block";
import Input from "../effectors/Input";
import Output from "../effectors/Output";

export default class SignalChain extends Component {
  constructor(parentElement) {
    super(
      parentElement,
      createElement("section", {
        id: "board-liner",
        class: "between-flex",
      })
    );

    this.render();
  }

  mounted() {
    new Block(this.element, Input.getSpec());
    new Block(this.element);
    new Block(this.element);
    new Block(this.element);
    new Block(this.element);
    new Block(this.element);
    new Block(this.element);
    new Block(this.element, Output.getSpec());
  }
}
