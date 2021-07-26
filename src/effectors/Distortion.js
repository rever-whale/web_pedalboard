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
  }

  static getSpec () {
    return specInfo;
  }
}
