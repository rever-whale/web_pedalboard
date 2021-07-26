import Effector from "./Effector";

const specInfo = {
  shortName : "CH-2",
  color : "skyblue",
  title : "Chorus",
  description : "Chorus Effector",
};

export default class Chorus extends Effector {
  constructor(context) {
    super(context);
  }

  static getSpec () {
    return specInfo;
  }
}
