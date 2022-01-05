import { updateTotalPrice, updateTotalQuantity, displayQuantityAndTotalPrice } from "./mod/utils.js";
import { subtractFromCache } from "./mod/datacache.js";
import { validateInput, displayThumbnails, enableOrDisableCommandButton, removeChild, displayMessageEmptyCart, createHomeButton } from "./mod/manipDom.js";


// cart.html page : remove the cart.html link in the header (useless)
removeChild(".limitedWidthBlock > nav > ul", 3);

localStorage.removeItem("catalog");

const itemNumber = updateTotalQuantity();

// If your cart is empty
if (itemNumber == 0) {
    displayMessageEmptyCart();
    createHomeButton();
}

// Extract data
for (var i = 0; i < localStorage.length; i++) {
    subtractFromCache(localStorage.key(i));
}

const totalQuantity = updateTotalQuantity();
const totalPrice = updateTotalPrice();

displayQuantityAndTotalPrice(totalPrice, totalQuantity);

displayThumbnails();

validateInput("firstName", /^[a-zÀ-ÖØ-öø-ÿ -]+$/i, "Caractères autorisées : lettres, lettres accentuées, tiret. Les espaces successifs seront remplacé par un seul espace.");

validateInput("lastName", /^[a-zÀ-ÖØ-öø-ÿ -]+$/i, "Caractères autorisées : lettres, lettres accentuées, tiret. Les espaces successifs seront remplacé par un seul espace.");

validateInput("address", /^[a-zÀ-ÖØ-öø-ÿ0-9 -]+$/i, "Caractères autorisées : lettres, lettres accentuées, chiffres, tiret. Les espaces successifs seront remplacé par un seul espace.");

validateInput("city", /^[a-zÀ-ÖØ-öø-ÿ0-9 -]+$/i, "Caractères autorisées : lettres, lettres accentuées, chiffres, espacements et le tiret.");

const mailrules = "Email cohérente: user@host. L'user, ne doit contenir que des chiffres/lettres ainsi que les caractères _  -  . (Un seul consécutif. Ils ne doivent pas se trouver avant ou après @). L'user doit commencer uniquement par une lettre. Un nom de domaine (minimum 2 lettres) ne peut contenir rien d'autre que des lettres/chiffres et le tiret (-). Vient ensuite l'extension qui commence par un point et qui contient de 2 à 6 lettres. Pas d'espaces."
validateInput("email", /(^[a-z0-9]+(?:[._-]?[a-z0-9]+)*)@[a-z0-9]((?:[a-z0-9])(?:[.-]?[a-z0-9])+\.[a-z]{2,6}$)/i, mailrules);

enableOrDisableCommandButton();

submitForm();


// ======================================== Functions =====================================================
function submitForm() {
    document.querySelector("#order")
    .addEventListener("click", (e) => {
    e.preventDefault();

    const contact = makeObjectContact(".cart__order__form");
    const products = makeTableProducts();

    fetch("http://localhost:3000/api/products/order", {   
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({  contact, products })
    })
    .then(response => response.json())
    .then(data => {
        const getOrderId = data.orderId;
        localStorage.setItem("totalPrice", totalPrice)
        const link = "confirmation.html?orderId=" + getOrderId;
        window.location.href = link;
    })
    .catch(erreur => console.log(erreur));
});
}


function makeObjectContact(pattern) {
    const form = document.querySelector(pattern);
    let contact = new Object();
    for (let item of form.elements) {
        if (item.name != "") {
            contact[item.name] = item.value;
        }  
    }
    return contact
}


function makeTableProducts() {
    const products = [];
    localStorage.removeItem("catalog");
    for (let i = 0; i < localStorage.length; i++) {       
        const keyName = localStorage.key(i);
        const item = JSON.parse(localStorage.getItem(keyName));
        products.push(item.id);
    }
    return products
}
