export default class Effector {
  context;
  id;

  constructor(context, id) {
    this.context = context;
    this.id = id;
    this.input = context.createGain();
    this.output = context.createGain();
  }

  connect(effector) {
    this.output.connect(effector.input);
  }

  connectNodes (nodes = []) {
    const nodeChain = [this.input, ...nodes, this.output];
    for (let i = 0, len = nodeChain.length; i < len - 1; i++) {
      nodeChain[i].connect(nodeChain[i + 1]);
    }
  }
}
