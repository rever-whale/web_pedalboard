import { changeSoundChain } from "./AudioEngine";

export function bindEvent () {
  let origin;
  let removeZone = document.querySelector('#remove');
  const modal = document.querySelector('.dimmedLayer');
  const emptyHtml = '<div class="block empty"></div>';
  
  window.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#app").addEventListener("dragstart", dragstart_handler);
    document.querySelector("#app").addEventListener("dragover", dragover_handler);
    document.querySelector("#app").addEventListener("dragenter", dragenter_handler);
    document.querySelector("#app").addEventListener("dragleave", dragleave_handler);
    document.querySelector("#app").addEventListener("drop", drop_handler);
    document.querySelector("#app").addEventListener("click", click_handler);
  });
  
  function showModal (name) {
    modal.querySelector('.effector_title').innerText = name;
    modal.classList.add('show');
  }
  
  function removeModal () {
    modal.classList.remove('show');
  }
  
  function click_handler (ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const target = ev.target;
    const isBlock = target.classList.contains('block');
    const isSideMenu = target.parentNode.classList.contains('item');
    const isEmpty = target.classList.contains('empty');
  
    if (target === modal) {
      removeModal();
    }
  
    if (isBlock && !isSideMenu && !isEmpty) {
      showModal(target.innerText);
    }
  }
  
  function dragstart_handler(ev) {
    if (ev.target.classList.contains("block")) {
      origin = ev.target;
      removeZone.classList.add('show');
    }
  }
  
  function dragover_handler(ev) {
    ev.preventDefault();
  
    if (ev.target.classList.contains("block") || ev.target.id === "remove") {
      ev.dataTransfer.dropEffect = "move";
    }
  }
  
  function dragenter_handler (ev) {
    ev.preventDefault();
  
    if (ev.target.classList.contains("block") || ev.target.id === "remove") {
      ev.target.classList.add('dragenter');
    }
  }
  
  function dragleave_handler (ev) {
    ev.preventDefault();
  
    if (ev.target.classList.contains("block") || ev.target.id === "remove") {
      ev.target.classList.remove('dragenter');
    }
  }
  
  function drop_handler(ev) {
    ev.preventDefault();
    removeZone.classList.remove('show');
    ev.target.classList.remove('dragenter');

    if (origin === ev.target) return;
  
    const isTargetOrigin = ev.target.classList.contains("const");
    const isOriginStatic = origin.classList.contains("const");
    const isOriginSidebarItem = origin.parentNode.classList.contains("item");
  
    const originHtml = origin.outerHTML;
    const targetHtml = ev.target.outerHTML;
    const isTargetRemove = ev.target.id === "remove";
  
    if (isTargetRemove && !isOriginStatic && !isOriginSidebarItem) {
      origin.outerHTML = emptyHtml;
      ev.target.classList.remove('dragenter');
    }
  
    if (ev.target.classList.contains("block")) {
      if (isOriginSidebarItem) {
        ev.target.outerHTML = originHtml;
      } else if (!(isOriginStatic || isTargetOrigin)) {
        origin.outerHTML = targetHtml;
        ev.target.outerHTML = originHtml;
      }
    }

    changeSoundChain();
  }
  
}
