import { getCheckoutUrlBasedOnEnv, hashPaymentId } from "../helpers";
import { ENV, MessageType } from "../types";

type Subscriber = {
  eventName: string;
  callback: () => void;
};

export function startListener(paymentId: string, env: ENV) {
  const inPageStatusSubscribers: Subscriber[] = [];

  const listener = async (event: MessageEvent<any>) => {
    // Handle messages only if:
    // - payment id hash is matching curent one.
    // - origin is correct
    const hashedPaymentID = await hashPaymentId(paymentId);

    if (event.origin !== getCheckoutUrlBasedOnEnv(env)) {
      return false;
    }

    if (event.data.hash !== hashedPaymentID) {
      return false;
    }

    const payload = event.data.payload;

    if (event.data.type === "in_page_status") {
      inPageStatusSubscribers
        .filter(({ eventName }) => eventName === payload)
        .forEach(({ callback }) => {
          callback();
        });
    } else {
      console.warn("Unknown message type:", event.data.type);
    }
  };

  window.addEventListener("message", listener, false);

  function unsubscribe() {
    window.removeEventListener("message", listener, false);
  }

  function onInPageStatusChanged(eventName: MessageType, callback: () => void) {
    inPageStatusSubscribers.push({ eventName, callback });
  }

  return {
    onInPageStatusChanged,
    unsubscribe,
  };
}
