import Component from "../core/Component";
import { createElement } from "../utils/DomHelper";

const emptyEffector = {
  color: 'empty',
}

export default class Block extends Component {
  constructor(parentElement, effector = emptyEffector) {
    const isStaticBlock = effector.isStatic;

    super(
      parentElement,
      createElement(
        "div",
        {
          class: `block ${effector.color} ${isStaticBlock ? 'const' : ''}`,
          draggable: !isStaticBlock || effector !== emptyEffector,
          'data-id': effector.title,
        },
        effector.shortName
      ),
    );

    this.render();
  }
}
