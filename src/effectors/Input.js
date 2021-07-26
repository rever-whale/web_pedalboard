import Effector from "./Effector";


const specInfo = {
  shortName : "Input",
  color : "white",
  title : "Input",
  description : "",
  isStatic: true,
};

export default class Input extends Effector {
  constructor(context) {
    super(context);
  }

  static getSpec () {
    return specInfo;
  }
}
