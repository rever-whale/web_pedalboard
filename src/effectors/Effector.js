export default class Effector {
  context;
  id;

  constructor(context, id) {
    this.context = context;
    this.id = id;
    this.input = context.createGain();
    this.output = context.createGain();

    this.connectNodes([]);
  }

  connect(effector) {
    this.output.connect(effector.input);
  }

  connectNodes (nodes) {
    const nodeChain = [this.output, ...nodes, this.input];
    for (let i = nodeChain.length - 1; i > 0; --i) {
      nodeChain[i - 1].connect(nodeChain[i]);
    }
  }
}
