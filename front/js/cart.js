import { findItemName, limitQuantity } from "./mod/utils.js";
import { updateTotalPrice } from "./mod/utils.js";
import { updateTotalQuantity } from "./mod/utils.js";
import { updateQuantity } from "./mod/utils.js";
import { displayQuantityAndTotalPrice } from "./mod/utils.js";
import { addToCache } from "./mod/datacache.js";
import { subtractFromCache } from "./mod/datacache.js"; 
import { removeThumbnail } from "./mod/utils.js";
import { createBoxArticle } from "./mod/utils.js";
import { createTag } from "./mod/manipDom.js";
import { validateInput } from "./mod/manipDom.js";
import { displayThumbnails } from "./mod/manipDom.js";


for (var i = 0; i < localStorage.length; i++) {
    subtractFromCache(localStorage.key(i));
}

document
    .querySelector(".cart__order__form")
    .setAttribute("action", "/front/html/confirmation.html");

const totalPrice = updateTotalPrice();
const totalQuantity = updateTotalQuantity();
displayQuantityAndTotalPrice(totalPrice, totalQuantity);

displayThumbnails();

validateInput("firstName", /^[a-z ]+$/i, "Caractères autorisées : lettres et espacements.", totalQuantity);
validateInput("lastName", /^[a-z ]+$/i, "Caractères autorisées : lettres et espacements.", totalQuantity);
validateInput("address", /^[a-z0-9 ]+$/i, "Caractères autorisées : lettres, chiffres et espacements.", totalQuantity);
validateInput("city", /^[a-z ]+$/i, "Caractères autorisées : lettres et espacements.", totalQuantity);
validateInput("email", /^[a-z0-9]+[a-z0-9.]+@{1}[a-z0-9.]+[a-z0-9]+$/i, "Caractères autorisées : lettres, point,  un @ est obligatoire. Ne doit pas commencer ou se terminer par un point.", totalQuantity);

if (totalPrice == 0) {
    document
        .getElementById("order")
        .setAttribute("style", "cursor: not-allowed; filter: blur(2px);");
}

document
    .querySelector(".cart__order__form")
    .removeAttribute("action");
    
document
    .querySelector("#order")
    .addEventListener("click", submitForm)


// ====================================== Home button ===================================================
const style ="font-size: 22px; border-radius: 40px; background-color: #2c3e50; border: 0; color: white; padding: 18px 28px; cursor: pointer; margin: 40px 0 0 40px;";
const homeButton = createTag("button", "id", "homeButton", "onclick", "window.location.href = './index.html'", "style", style);
homeButton.textContent = "Accueil";
document.querySelector(".cart__order__form__submit").append(homeButton);

function submitForm() {
    const form = document.querySelector(".cart__order__form");
    
    makeObjectContact(".cart__order__form");
    makeObjectProducts();

    const body = {
        contact: makeObjectContact(".cart__order__form"),
        products: makeObjectProducts()
    }
    // console.log(body);
}


function makeObjectContact(selector) {
    const form = document.querySelector(selector);
    let contact = new Object();
    for (let item of form.elements) {
        contact[item.name] = item.value;
    }
    // console.log(contact)
    return contact
}


function makeObjectProducts() {
    let products = [];
    localStorage.removeItem("catalog");
    for (let i = 0; i < localStorage.length; i++) {
        products[i] = localStorage.key(i);
    }
    // console.log(products)
    return products
}


// const body = {
//     contact: makeObjectContact(".cart__order__form"),
//     products: makeObjectProducts()
// }

// const jsonBody = JSON.stringify(body);
// console.log(body)
// console.log(jsonBody)


const contact =  {firstName: "Michel", lastName: "Dupont",  address: "14 rue de la pompe", city: "Paris", email: "moi@sfr.fr"};
const products = ["123456", "789456", "456789"];
console.log({contact, products})
console.log(JSON.stringify({contact, products}))

fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({contact, products})
})
    .then(response => response.json()
        .then(data => console.log(data))
    )
    .catch(error => console.log(error));

