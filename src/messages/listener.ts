import { getCheckoutUrlBasedOnEnv } from "../helpers";
import { ENV, MessageType } from "../types";

type Subscriber = {
  eventName: string;
  callback: () => void;
};

export function startListener(env: ENV) {
  const inPageStatusSubscribers: Subscriber[] = [];

  const listener = (event: MessageEvent<any>) => {
    // Handle messages only if origin is correct.
    if (event.origin !== getCheckoutUrlBasedOnEnv(env)) {
      return false;
    }

    if (event.data.from !== "checkout") {
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
