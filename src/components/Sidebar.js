import Component from "../core/Component";
import Amplifier from "../effectors/Amplifier";
import Chorus from "../effectors/Chorus";
import Delay from "../effectors/Delay";
import Distortion from "../effectors/Distortion";
import ImpulseResponse from "../effectors/ImpulseResponse";
import MetalZone from "../effectors/MetalZone";
import { createElement } from "../utils/DomHelper";
import SidebarItem from "./sidebarItem";

export default class Sidebar extends Component {
  constructor(parentElement) {
    super(
      parentElement,
      createElement(
        "section",
        {
          id: "sidebar",
        },
        '<div class="sidebar_name">Items</div>'
      )
    );

    this.render();
  }

  mounted() {
    new SidebarItem(this.element, Distortion.getSpec());
    new SidebarItem(this.element, MetalZone.getSpec());
    new SidebarItem(this.element, Amplifier.getSpec());
    new SidebarItem(this.element, ImpulseResponse.getSpec());
    new SidebarItem(this.element, Delay.getSpec());
    new SidebarItem(this.element, Chorus.getSpec());
  }
}
