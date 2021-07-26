import Component from "../core/Component";
import { createElement } from "../utils/DomHelper";
import Equalizer from "./Equalizer";
import SignalChainField from "./SignalChainField";

export default class SignalChainContainer extends Component {
  constructor(parentElement) {
    super(
      parentElement,
      createElement(
        "section",
        {
          id: "board",
          class: "center-flex"
        },
        `
          <div class="board_name">Signal Chain</div>
        `
      ),
    );

    this.render();
  }

  mounted () {
    new Equalizer(this.element);
    new SignalChainField(this.element);
  }
}
