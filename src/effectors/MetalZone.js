import Effector from "./Effector";

const specInfo = {
  shortName : "MT-2",
  color : "black",
  title : "Metal Zone",
  description : "Boss Metal Zone-2",
};

export default class MetalZone extends Effector {
  constructor(context) {
    super(context);
  }

  static getSpec () {
    return specInfo;
  }
}
