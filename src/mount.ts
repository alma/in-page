import { URLS } from "./constants";
import { elementNotFound, getCheckoutUrl, getElement } from "./helpers";
import { Store } from "./store";

export function mount(store: Store, selector: string) {
  if (!selector) {
    elementNotFound();
  }
  if (store.getEmbeddedSelector()) {
    throw new Error("Alma.InPage is already mounted.");
  }

  store.setEmbeddedSelector(selector);

  const url = getCheckoutUrl(
    store.getPaymentId(),
    store.getEnvironment(),
    URLS.embedded
  );

  injectIframe(selector, url);
}

function injectIframe(selector: string, url: string) {
  const element = getElement(selector);
  if (element && element?.childNodes.length > 0) {
    throw new Error(
      `Failed to inject iframe: element ${selector} already has a child node. Please leave it empty.`
    );
  }
  const iframe = document.createElement("iframe");
  iframe.src = url;

  // TODO Pass options to the iframe via the API
  iframe.style.width = "100%";
  iframe.style.height = "500px";
  iframe.style.border = "none";
  element?.appendChild(iframe);
}
