import { getElement } from "./helpers";
import { removeModal } from "./Modal/modal";
import { Store } from "./store";

/**
 * Unmounts the iframe (for the Embedded component) from the dom
 *
 * @param parentOptions the options passed to the initialize function
 */
export function unmount(store: Store, unsubscribe: () => void) {
  const selector = store.getEmbeddedSelector();

  removeModal(false);
  unsubscribe();

  // This condition is to avoid cleaning the DOM, if it is already removed
  if (!selector) {
    return;
  }
  const embeddedParent = getElement(selector);
  store.setEmbeddedSelector(null);
  embeddedParent?.removeChild(embeddedParent.childNodes[0]);
}
