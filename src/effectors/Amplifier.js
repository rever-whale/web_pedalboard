import Effector from "./Effector";

const specInfo = {
  shortName : "AMP",
  color : "red",
  title : "Amplifier",
  description : "Amplifier Effector",
};

export default class Amplifier extends Effector {
  nodes;
  gainNode;
  bassEQNode;
  midEQNode;
  trebleEQNode;

  volume = 5;
  base = -3;
  mid = 0.7;
  treble = 0.3;

  constructor(context) {
    super(context);

    this.gainNode = new GainNode(context, { gain: 10 });
    this.bassEQNode = new BiquadFilterNode(context, {
      type: "lowshelf",
      frequency: 500,
      gain: this.bass,
    });
    this.midEQNode = new BiquadFilterNode(context, {
      type: "peaking",
      Q: Math.SQRT1_2,
      frequency: 1500,
      gain: this.mid,
    });

    this.trebleEQNode = new BiquadFilterNode(context, {
      type: "highshelf",
      frequency: 3000,
      gain: this.treble,
    });

    this.nodes = [this.bassEQNode, this.midEQNode, this.trebleEQNode, this.gainNode];
    this.connectNodes(this.nodes);
  }

  static getSpec () {
    return specInfo;
  }
}
