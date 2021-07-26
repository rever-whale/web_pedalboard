import Component from "../core/Component";
import { createElement } from "../utils/DomHelper";

export default class Equalizer extends Component {
  constructor(parentElement) {
    super(
      parentElement,
      createElement(
        'canvas',
        {
          id: "equalizer",
        }
      )
    );

    this.render();
  }
}
