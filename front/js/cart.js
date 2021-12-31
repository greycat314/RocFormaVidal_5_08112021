import { updateTotalPrice, updateTotalQuantity, displayQuantityAndTotalPrice } from "./mod/utils.js";
import { addToCache, subtractFromCache } from "./mod/datacache.js";
import { createTag, validateInput, displayThumbnails, enableOrDisableCommandButton, removeChild } from "./mod/manipDom.js";

// cart.html page : remove the cart.html link in the header (useless)
removeChild(".limitedWidthBlock > nav > ul", 3);

// localStorage.removeItem("catalog");

const itemNumber = updateTotalQuantity();
// Redirection to the index.html page when your cart is empty
if (itemNumber == 0) {
    window.location.href = "index.html";
}

// Extract data
for (var i = 0; i < localStorage.length; i++) {
    subtractFromCache(localStorage.key(i));
}

const totalQuantity = updateTotalQuantity();
const totalPrice = updateTotalPrice();

displayQuantityAndTotalPrice(totalPrice, totalQuantity);

displayThumbnails();

validateInput("firstName", /^[a-z ]+$/i, "Caractères autorisées : lettres et espacements.");
validateInput("lastName", /^[a-z ]+$/i, "Caractères autorisées : lettres et espacements.");
validateInput("address", /^[a-z0-9 ]+$/i, "Caractères autorisées : lettres, chiffres et espacements.");
validateInput("city", /^[a-z ]+$/i, "Caractères autorisées : lettres et espacements.");
const mailrules = "Une email cohérente est toujours construite sur le modèle de user@host. L'user, ne doit contenir que des chiffres/lettres ainsi que les caractères _  -  . (Un seul consécutif. Ils ne doivent pas se trouver avant ou après @). L'user doit commencer uniquement par une lettre.. Un nom de domaine (minimum 2 lettres) ne peut contenir rien d'autre que des lettres/chiffres et le tiret (-). Vient ensuite l'extension qui commence par un point /n et qui contient de 2 à 6 lettres."
validateInput("email", /(^[a-z0-9]+(?:[._-]?[a-z0-9]+)*)@[a-z0-9]((?:[a-z0-9])(?:[.-]?[a-z0-9])+\.[a-z]{2,6}$)/i, mailrules);

enableOrDisableCommandButton();

enableOrDisableCommandButton
document.querySelector("#order")
.addEventListener("click", (e) => {
    e.preventDefault();

    const contact = makeObjectContact(".cart__order__form");
    console.log(contact)
    const products = makeTableProducts();
    console.log(products)
    const order = {contact, products};
    console.log(order)
    console.log(JSON.stringify(order))

    // fetch("http://localhost:3000/api/products/order", {    
    // fetch("http://127.0.0.1:5502/api/products/order", {
    fetch("http://localhost:3000/api/products/order", {   
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contact, products })
    })
    .then(response => {response.json();})
    .then(data => {
        console.log(data)
        const getOrderId = data.orderId;
        console.log(getOrderId);
        // const link = "confirmation.html?orderId=" + getOrderId;
        // window.location.href = link;
    })
    .catch(erreur => console.log(erreur));
});








// ====================================== Home button ===================================================
const style ="font-size: 22px; border-radius: 40px; background-color: #2c3e50; border: 0; color: white; padding: 18px 28px; cursor: pointer; margin: 40px 0 0 40px;";
const homeButton = createTag("button", "id", "homeButton", "onclick", "window.location.href = './index.html'", "style", style);
homeButton.textContent = "Accueil";
document.querySelector(".cart__order__form__submit").append(homeButton);


// ======================================== Submit =====================================================
function submitForm() {
    // const order = document.getElementById("order");
    // order.addEventListener("click", () => {

    document.getElementById("order")
    .addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        
    const contact = makeObjectContact(".cart__order__form");
    const products = makeTableProducts();
    
        
        fetch("http://localhost:3000/api/order", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify( contact, products ),
        })
            .then(response => response.json())
            .then(response => {
                const getOrderId = response.orderId;
                console.log(getOrderId);

                localStorage.setItem("order", "getOrderId");
                const link = "confirmation.html";
                window.location.href = link;
            })
            .catch(erreur => console.log("erreur : " + erreur));
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
        const id = localStorage.key(i);
        
        products.push(id);
    }
    return products
}
