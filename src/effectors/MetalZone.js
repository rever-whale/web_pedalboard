import Effector from "./Effector";

const specInfo = {
  shortName : "MT-2",
  color : "black",
  title : "MetalZone",
  description : "Boss Metal Zone-2",
};

export default class MetalZone extends Effector {
  constructor(context) {
    super(context);

    this.gainNode = context.createGain();
    this.waveShaperNode = new WaveShaperNode(context);
    this.waveShaperNode2 = new WaveShaperNode(context);

    this.gainNode.gain.value = 0.1;
    this.waveShaperNode.curve = this.waveShaperNode2.curve = this.makeDistortionCurve(0.1);
    this.connectNodes([this.waveShaperNode, this.waveShaperNode2, this.gainNode]);
  }

 makeDistortionCurve (amount) {
    const k = amount * 150 + 50;
    const n = 8096;

    const curve = new Float32Array(n + 1);

    let x;
    for (let i = 0; i < n; ++i) {
        x = i * 2 / n - 1;
        curve[i] = (Math.PI + k) * x / (Math.PI + k * Math.abs(x));
    }

    return curve;
}
  static getSpec () {
    return specInfo;
  }
}
