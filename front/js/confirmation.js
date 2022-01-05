// If we reload the page, we return to index.html because the localStorage is empty
if (localStorage.length == 0) {
    window.location.href = "./index.html"
}

import { displayOrder,  displayOrderId, displayTotalPriceOrder, removeChild } from "./mod/manipDom.js";

// cart.html page : remove the cart.html link in the header (useless)
removeChild(".limitedWidthBlock > nav > ul", 3);

const str = document.location.href;
const url = new URL(str);
const orderId = url.searchParams.get("orderId");

displayOrderId(orderId);

displayOrder();

displayTotalPriceOrder();

localStorage.clear();
