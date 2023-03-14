import { getCheckoutUrlBasedOnEnv, getElement } from "../helpers";
import { Store } from "../store";
import { ENV, Message } from "../types";

export function sendMessage(store: Store, message: Message) {
  if (store.getIsCheckoutLoaded() === false) {
    store.addMessageToSendLater(message);
    return false;
  }

  const selector = store.getEmbeddedSelector();
  if (!selector) {
    console.error("Can not send message yet, mount() has not been called.");
    return false;
  }

  const element = getElement(selector);
  const iframe = element?.firstChild as HTMLIFrameElement; // We get the iframe inside
  const targetOrigin = getCheckoutUrlBasedOnEnv(store.getEnvironment());

  iframe.contentWindow?.postMessage(message, targetOrigin);
  return true;
}

export function sendWaitingMessages(store: Store) {
  const previousMessages = store.getAndResetMessagesToSendLater();

  previousMessages.forEach((message) => {
    sendMessage(store, message);
  });
}
