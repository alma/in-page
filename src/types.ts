export type ENV =
  | "TEST"
  | "LIVE"
  | "LOCAL"
  | "DEV"
  | "STAGING"
  | "SANDBOX"
  | "PROD";

export type InitializeOptions = {
  environment?: ENV;
  onPaymentSucceeded?: () => void;
  onPaymentRejected?: () => void;
  onUserCloseModal?: () => void;
};

// Must be kept up to date with `Checkout/src/InPage/types.ts`
export type MessageType =
  | "embedded_loaded"
  | "user_wants_to_pay"
  | "can_open_modal"
  | "payment_succeeded"
  | "payment_rejected"
  | "trigger_success_callback"
  | "trigger_reject_callback";

export type Message = {
  from: "checkout" | "in-page";
  type: MessageType;
  payload?: string;
};
