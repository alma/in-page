import { ENV } from "./types";

/**
 * Get the element from the DOM, if none is found, throw an error.
 *
 * @param selector string of the current element
 * @returns HTMLElement | throw exception
 */
export const getElement = (selector: string) => {
  const element = document.getElementById(selector.replace("#", ""));
  if (element) {
    return element;
  } else {
    elementNotFound();
  }
};

/**
 * Throws an error if the element is not found.
 */
export function elementNotFound() {
  throw new Error(
    "Element not found, please add an id selector for the iframe"
  );
}

export function getCheckoutUrlBasedOnEnv(env: ENV) {
  switch (env) {
    case "LOCAL":
      return "https://localhost:3000";
    case "TEST":
    case "SANDBOX":
      return "https://checkout.sandbox.getalma.eu";
    case "STAGING":
    case "DEV":
      return "https://checkout.staging.almapay.com";
    case "LIVE":
    case "PROD":
    default:
      return "https://checkout.almapay.com";
  }
}

function getAlmaAPIUrlBasedOnEnv(env: ENV) {
  switch (env) {
    case "LOCAL":
      return "http://localhost:1337";
    case "TEST":
    case "SANDBOX":
      return "https://api.sandbox.getalma.eu";
    case "STAGING":
    case "DEV":
      return "https://api.staging.almapay.com";
    case "LIVE":
    case "PROD":
    default:
      return "https://api.almapay.com";
  }
}

export function fetchReturnUrls(paymentId: string, env: ENV) {
  return fetch(getAlmaAPIUrlBasedOnEnv(env) + "/v1/payments/" + paymentId)
    .then((response) => response.json())
    .then((data) => {
      return { success: data.return_url, failure: data.failure_return_url };
    });
}

export function getCheckoutUrl(paymentId: string, env: ENV, url: string) {
  return getCheckoutUrlBasedOnEnv(env) + "/" + paymentId + url;
}

/**
 * This is used to send a hash instead of a paymentId through `postMessage for InPage`
 * * /!\ If you update this method, do not forget to update the one in the checkout project
 */
export function hashPaymentId(paymentId: string) {
  return window.crypto.subtle
    .digest("SHA-256", new TextEncoder().encode(paymentId))
    .then((hash) => {
      const hex = Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      return hex;
    });
}
