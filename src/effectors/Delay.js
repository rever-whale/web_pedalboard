import Effector from "./Effector";

const specInfo = {
  shortName : "DL-4",
  color : "skyblue",
  title : "Delay",
  description : "Time & Space Effector",
};

export default class Delay extends Effector {
  constructor(context) {
    super(context);
  }

  static getSpec () {
    return specInfo;
  }
}
