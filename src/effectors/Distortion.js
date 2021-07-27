import Effector from "./Effector";

const specInfo = {
  shortName: "DS-1",
  color: "yellow",
  title: "Distortion",
  description: "Boss DS-1",
};

export default class Distortion extends Effector {
  constructor(context) {
    super(context);

    this.masterNode = context.createGain();
    this.waveShaperNode = context.createWaveShaper();

    this.waveShaperNode.curve = this.makeDistortionCurve(400);
    this.waveShaperNode.oversample = "4x";
    this.compressorNode = new DynamicsCompressorNode(context, {
      ratio: 20,
      threshold: -90,
    });
    this.masterNode.gain.value = 0.3;
    this.connectNodes([
      this.waveShaperNode,
      this.compressorNode,
      this.masterNode,
    ]);
  }

  makeDistortionCurve(amount) {
    let k = typeof amount === "number" ? amount : 50,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
    for (; i < n_samples; ++i) {
      x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  static getSpec() {
    return specInfo;
  }
}
