import { subtractFromCache } from "./mod/dataCache.js";
import { displayOrder } from "./mod/manipDom.js";

// const dataOrder = localStorage.getItem("order");
// console.log(dataOrder)


document
    .querySelector("#orderId")
    .textContent = "1259614875963"

document
    .querySelector("#orderId")
    .setAttribute("style", "font-size: 1.5rem; font-weight: 600;")


displayOrder();

