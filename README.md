# What is InPage?

InPage is a payment method that allows you to integrate the Alma experience directly into your website.

# Setup

## JS

```html
<script src="https://cdn.jsdelivr.net/npm/@alma/in-page@1.x/dist/index.umd.js"></script>
```

## Create the container

```html
<div id="alma-inpage"></div>
```

## Basic example

```js
const inPage = Alma.InPage.initialize("paymentID");
// Mount InPage inside the container
inPage.mount("#alma-inpage");
// Start the payment (open the modal)
inPage.startPayment();
```

## Going further

Read the [full documentation](./documentation.md) to learn more about InPage API.
