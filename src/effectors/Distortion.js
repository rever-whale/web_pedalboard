import Effector from "./Effector";

const specInfo = {
  shortName : "DS-1",
  color : "yellow",
  title : "Distortion",
  description : "Boss DS-1",
};

export default class Distortion extends Effector {
  constructor(context) {
    super(context);

    this.gainNode = context.createGain();
    this.waveShaperNode = new WaveShaperNode(context);

    this.gainNode.gain.value = 0.2;
    this.waveShaperNode.curve = this.makeDistortionCurve(0.1);
    this.connectNodes([this.waveShaperNode, this.gainNode]);
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
