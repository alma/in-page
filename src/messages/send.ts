import { getCheckoutUrlBasedOnEnv, getElement } from "../helpers";
import { Store } from "../store";
import { ENV, Message } from "../types";

export function sendMessage(store: Store, message: Message, env: ENV) {
  if (store.getIsCheckoutLoaded() === false) {
    console.error("Can not send message yet, Checkout is not loaded.");
    return false;
  }

  const selector = store.getEmbeddedSelector();
  if (!selector) {
    console.error("Can not send message yet, mount() has not been called.");
    return false;
  }

  const element = getElement(selector);
  const iframe = element?.firstChild as HTMLIFrameElement; // We get the iframe inside

  iframe.contentWindow?.postMessage(message, getCheckoutUrlBasedOnEnv(env));
  return true;
}
