import { drawVisualizer, initVisualizer } from "../core/AudioEngine";
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

  mounted () {
    const el = document.querySelector('#equalizer');
    initVisualizer(el);
    drawVisualizer(el);
  }
}
