import { hashPaymentId } from "./helpers";
import { sendMessage } from "./messages/send";
import { Store } from "./store";

export async function startPayment(store: Store) {
  const hash = await hashPaymentId(store.getPaymentId());
  return sendMessage(
    store,
    { type: "user_wants_to_pay", hash },
    store.getEnvironment()
  );
}
