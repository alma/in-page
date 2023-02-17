import { style } from "./modaleStyle";
import closeButton from "./closeButton.svg";
import almaLogo from "./logo.svg";
import { MODAL_ID_PREFIX, URLS } from "../constants";
import { ENV } from "../types";
import { getCheckoutUrl } from "../helpers";

export function showModal(paymentId: string, env: ENV) {
  // Just a check to avoid creating multiple modals
  if (document.getElementById(`${MODAL_ID_PREFIX}-wrapper`)) {
    removeModal();
    return;
  }

  const wrapper = createModalWrapperElement();
  const modalContainer = createModalContainerElement();
  const modalOverlay = createModalOverlayElement();
  const modalBody = createModalBodyElement();
  const modalClose = createModalCloseElement();
  const modalLogo = createModalLogoElement();
  const iframe = createIframeElement(paymentId, env);

  document.body.appendChild(wrapper);
  wrapper.appendChild(modalContainer);
  modalContainer.appendChild(modalOverlay);
  modalContainer.appendChild(modalBody);
  modalBody.appendChild(modalClose);
  modalBody.appendChild(modalLogo);
  modalBody.appendChild(iframe);
}

export function removeModal(showConfirmation = true) {
  const modal = document.getElementById(`${MODAL_ID_PREFIX}-wrapper`);
  if (modal) {
    if (
      !showConfirmation ||
      confirm("Are you sure you want to leave the payment page ?")
    ) {
      modal.remove();
    }
  }
}

function createModalWrapperElement() {
  const element = document.createElement("style");
  element.innerHTML = style;
  // We create a wrapper to delete the style tag in the DOM easily
  const wrapper = document.createElement("div");
  wrapper.id = `${MODAL_ID_PREFIX}-wrapper`;
  wrapper.role = "dialog";
  wrapper.ariaModal = "true";
  wrapper.appendChild(element);

  return wrapper;
}

function createModalContainerElement() {
  const element = document.createElement("div");
  element.id = `${MODAL_ID_PREFIX}-element`;

  return element;
}

function createModalOverlayElement() {
  const element = document.createElement("div");
  element.id = `${MODAL_ID_PREFIX}-background`;
  return element;
}

function createModalBodyElement() {
  const element = document.createElement("div");
  element.id = `${MODAL_ID_PREFIX}-body`;

  return element;
}

function createIframeElement(paymentId: string, env: ENV) {
  const element = document.createElement("iframe");
  element.id = `${MODAL_ID_PREFIX}-iframe`;
  element.allow = "camera *;";
  element.src = getCheckoutUrl(paymentId, env, URLS.modal);
  element.title = "Alma payment iframe";

  return element;
}

function createModalCloseElement() {
  const element = document.createElement("img");
  element.id = `${MODAL_ID_PREFIX}-close`;
  element.title = "Close the alma modal (you'll lose your data)";
  element.onclick = removeModal.bind(null, true);
  element.onkeyup = (event) => {
    if (event.key === "Enter") {
      removeModal();
    }
  };

  element.src = closeButton;
  element.tabIndex = 0;
  return element;
}

export function removeModalCloseElement() {
  const element = document.getElementById(`${MODAL_ID_PREFIX}-close`);
  element?.remove();
}

function createModalLogoElement() {
  const element = document.createElement("img");
  element.id = `${MODAL_ID_PREFIX}-logo`;
  element.title = "Alma logo";
  element.src = almaLogo;

  return element;
}
