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
  }

  static getSpec () {
    return specInfo;
  }
}
