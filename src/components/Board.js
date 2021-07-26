import Component from "../core/Component";
import { createElement } from "../utils/DomHelper";
import RemoveButton from "./RemoveButton";
import Sidebar from "./Sidebar";
import SignalChainContainer from "./SignalChainContainer";

export default class Board extends Component {
  constructor(parentElement) {
    super(
      parentElement,
      createElement(
        "section",
        {
          id: "board-wrapper"
        }
      ),
    );

    this.render();
  }

  mounted () {
    new RemoveButton(this.element);
    new Sidebar(this.element);
    new SignalChainContainer(this.element);
  }
}
