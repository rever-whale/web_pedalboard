import Effector from "./Effector";

const specInfo = {
  shortName : "IR",
  color : "purple",
  title : "ImpulseResponse",
  description : "Impulse Response Simulator",
};

export default class ImpulseResponse extends Effector {
  constructor(context) {
    super(context);

    this.gainNode = new GainNode(context, {gain: 20})
    this.convolverNode = new ConvolverNode(context);
    this.createConvolverNodeBuffer(context);

    this.connectNodes([this.convolverNode, this.gainNode]);
  }

  async createConvolverNodeBuffer (context) {
    let response = await fetch('../../static/ir.wav');
    let arrayBuffer = await response.arrayBuffer();
    this.convolverNode.buffer = await context.decodeAudioData(arrayBuffer);
  }

  static getSpec () {
    return specInfo;
  }
}
