import { updateElement } from "../utils/DomHelper";

export default class Component {
  parentElement;
  element;
  isMounted;

  constructor (parentElement, element) {
    this.parentElement = parentElement;
    this.element = element;
  }

  created () {
    this.parentElement.appendChild(this.element);
  }

  update (content) {
    updateElement(this.element, content);
  }

  destroy () {
    this.isMounted = false;
    this.parentElement.removeChild(this.element);
  }

  render () {
    if (this.isMounted) {
      this.update();
      this.updated();
    } else {
      this.created();
      this.mounted();
    }
  }

  mounted () {}
  updated () {}
}
