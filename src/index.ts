import { createStore } from "./store";
import { InitializeOptions } from "./types";

import { fetchReturnUrls } from "./helpers";
import { startListener } from "./messages/listener";
import { removeModal, removeModalCloseElement, showModal } from "./Modal/modal";
import { mount } from "./mount";
import { startPayment } from "./startPayment";
import { unmount } from "./unmount";

export namespace InPage {
  /**
   * Initialize the InPage component
   *
   * @param paymentId
   * @param options: InitializeOptions
   */
  export function initialize(
    paymentId: string,
    options: InitializeOptions = {}
  ) {
    const store = createStore(paymentId, options.environment);
    const urls = {
      success: null,
      failure: null,
    };

    fetchReturnUrls(store.getPaymentId(), store.getEnvironment()).then(
      (returnUrls) => {
        urls.success = returnUrls.success;
        urls.failure = returnUrls.failure;
      }
    );

    const { onInPageStatusChanged, unsubscribe } = startListener(
      store.getPaymentId(),
      store.getEnvironment()
    );

    onInPageStatusChanged("embedded_loaded", () => {
      store.setIsCheckoutLoaded(true);
    });

    onInPageStatusChanged("can_open_modal", () => {
      showModal(store.getPaymentId(), store.getEnvironment());
    });

    onInPageStatusChanged("payment_succeeded", removeModalCloseElement);
    onInPageStatusChanged("payment_rejected", removeModalCloseElement);

    onInPageStatusChanged("trigger_success_callback", () => {
      removeModal(false);

      if (options.onPaymentSucceeded) {
        options.onPaymentSucceeded();
      } else if (urls.success) {
        window.location.assign(urls.success);
      }
    });

    onInPageStatusChanged("trigger_reject_callback", () => {
      removeModal(false);

      if (options.onPaymentRejected) {
        options.onPaymentRejected();
      } else if (urls.failure) {
        window.location.assign(urls.failure);
      }
    });

    return {
      mount: (selector: string) => mount(store, selector),
      startPayment: () => startPayment(store),
      unmount: () => unmount(store, unsubscribe),
    };
  }
}
