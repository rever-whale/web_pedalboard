import Effector from "./Effector";

const specInfo = {
  shortName : "Output",
  color : "white",
  title : "Output",
  description : "",
  isStatic: true
};

export default class Output extends Effector {
  constructor(context) {
    super(context);
    this.connectNodes();
  }

  static getSpec () {
    return specInfo;
  }
}
