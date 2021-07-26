// import {
//   Block,
//   Board,
//   Footer,
//   Header,
//   Liner,
//   Modal,
//   RemoveButton,
//   Sidebar,
//   SidebarItem,
//   SignalChain,
// } from "../components";

// const COMPONENT_LIST = [
//   Block,
//   Board,
//   Footer,
//   Header,
//   Liner,
//   Modal,
//   RemoveButton,
//   Sidebar,
//   SidebarItem,
//   SignalChain,
// ];

export const updateElement = (el, attrs, content) => {
  if (attrs) {
    for (const attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        el.setAttribute(attr, attrs[attr]);
      }
    }
  }

  if (content) {
    el.innerHTML = content;
  }

  return el;
};

export const createElement = (tag, attrs, content) => {
  const el = document.createElement(tag);
  return updateElement(el, attrs, content);
};
