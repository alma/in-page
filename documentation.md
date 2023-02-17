# Alma.InPage

Before using `InPage`, you need to create a Payment. And use the payment id to initialize InPage.

InPage is composed of 4 different methods that you can use :

## Initialize

**This method use the paymentID to return a variable that will be used in the other methods.**

```js
const inPage = Alma.InPage.initialize("paymentID");
```

This method accepts two parameters :

`paymentID`: string, required

`options`: object, optional

### options

#### `environment`: string (default: `LIVE` ), optional

Values :

- `LIVE` (https://checkout.almapay.com)
- `TEST` (https://checkout.sandbox.almapay.com)

#### `onPaymentSucceeded`: function, optional

This function will be called when a payment has been **successfully** made. You can handle the logic that you want to do after the payment. If you don't add this option, the return_url specified during the creation of the payment will be used to redirect the customer.

<!-- #### `onPaymentRejected`: function, optional

This function will be called when a payment has been rejected. You can handle the logic that you want to do for this scenario. -->

#### `onModalClosed`: function, optional

This function will be called when the customer closes the modal. You can handle the logic that you want to do for this scenario. If you don't add this option, the modal will be closed and the customer will stay on the page.

```js
const inPage = Alma.InPage.initialize("paymentID", {
  environment: "LIVE",
  onPaymentSucceeded: () => {
    // handle logic
  },
  // onModalClosed: () => {}
});
```

## mount

This method will mount the inPage, inside the DOM element that you specify, **this must be an ID**. This dom element must be empty.

```html
<div id="alma-inpage"></div>
```

```js
inPage.mount("#alma-inpage");
```

## startPayment

This method will open the modal and let the customer pay with Alma. Once the payement is successful, the `onPaymentSucceeded` will be called.

```js
inPage.startPayment();
```

Exemple with a click on a button :

```js
document.getElementById("my-pay-button").addEventListener("click", () => {
  inPage.startPayment();
});
```

## unmount

This method will unmount the inPage, and remove content of the DOM element that is specified above. It will also close the connection with Alma.

```js
inPage.unmount();
```
