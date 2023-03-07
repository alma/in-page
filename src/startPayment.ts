import { sendMessage } from "./messages/send";
import { Store } from "./store";

export function startPayment(store: Store) {
  return sendMessage(
    store,
    { from: "in-page", type: "user_wants_to_pay" },
    store.getEnvironment()
  );
}
