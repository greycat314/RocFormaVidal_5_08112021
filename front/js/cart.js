import { updateTotalPrice, updateTotalQuantity, displayQuantityAndTotalPrice } from "./mod/utils.js";
import { addToCache, subtractFromCache } from "./mod/datacache.js";
import { createTag, validateInput, displayThumbnails, testIfFormCompleted, removeChild } from "./mod/manipDom.js";

// cart.html page : remove the cart.html link in the header (useless)
removeChild(".limitedWidthBlock > nav > ul", 3);

const itemNumber = updateTotalQuantity();
if (itemNumber == 0) {
    window.location.href = "index.html";
}

// Extract data
for (var i = 0; i < localStorage.length; i++) {
    subtractFromCache(localStorage.key(i));
}

document
    .querySelector(".cart__order__form")
    .setAttribute("action", "/front/html/confirmation.html");

const totalQuantity = updateTotalQuantity();
const totalPrice = updateTotalPrice();
if (totalPrice == 0) {
    window.location.href = "index.html";
} 
displayQuantityAndTotalPrice(totalPrice, totalQuantity);

displayThumbnails();

validateInput("firstName", /^[a-z ]+$/i, "Caractères autorisées : lettres et espacements.");
validateInput("lastName", /^[a-z ]+$/i, "Caractères autorisées : lettres et espacements.");
validateInput("address", /^[a-z0-9 ]+$/i, "Caractères autorisées : lettres, chiffres et espacements.");
validateInput("city", /^[a-z ]+$/i, "Caractères autorisées : lettres et espacements.");
validateInput("email", /^[a-z0-9]+[a-z0-9.]+@{1}[a-z0-9.]+[a-z0-9]+$/i, "Caractères autorisées : lettres, point,  un @ est obligatoire. Ne doit pas commencer ou se terminer par un point.");

testIfFormCompleted();

const contact = makeObjectContact(".cart__order__form");
console.log(contact)
const products = makeObjectProducts();
addToCache("contact", contact);
addToCache("products", products);


document
    .querySelector("#order")
    .addEventListener("click", submitForm)


// ====================================== Home button ===================================================
const style ="font-size: 22px; border-radius: 40px; background-color: #2c3e50; border: 0; color: white; padding: 18px 28px; cursor: pointer; margin: 40px 0 0 40px;";
const homeButton = createTag("button", "id", "homeButton", "onclick", "window.location.href = './index.html'", "style", style);
homeButton.textContent = "Accueil";
document.querySelector(".cart__order__form__submit").append(homeButton);


// ====================================== Submit ===================================================
function submitForm() {
    const order = document.getElementById("order");
    order.addEventListener("click", (event) => {
        const contact = makeObjectContact(".cart__order__form");
        const products = makeObjectProducts();

        event.preventDefault();

        // on envoie en POST
        fetch("http://localhost:3000/api/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ contact, products }),
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem("order", JSON.stringify(data));
                document.location.href = "order.html";
            })
            .catch((erreur) => console.log("erreur : " + erreur));
    });
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
    const products = [];
    localStorage.removeItem("catalog");
    for (let i = 0; i < localStorage.length; i++) {
        const object = subtractFromCache(localStorage.key(i));
        products[i] = object;
    }
    console.log(products)
    return products
}
