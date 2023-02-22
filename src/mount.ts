import { URLS } from "./constants";
import { elementNotFound, getCheckoutUrl, getElement } from "./helpers";
import { Store } from "./store";

export function mount(
  store: Store,
  selector: string,
  iframeOptions?: Record<string, string>
) {
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

  injectIframe(selector, url, iframeOptions);
}

function injectIframe(
  selector: string,
  url: string,
  iframeOptions?: Record<string, string>
) {
  const element = getElement(selector);
  if (element && element?.childNodes.length > 0) {
    throw new Error(
      `Failed to inject iframe: element ${selector} already has a child node. Please leave it empty.`
    );
  }
  const iframe = document.createElement("iframe");
  iframe.src = url;

  iframe.style.width = iframeOptions?.width ?? "100%";
  iframe.style.height = iframeOptions?.height ?? "500px";
  iframe.style.border = iframeOptions?.border ?? "none";
  element?.appendChild(iframe);
}
