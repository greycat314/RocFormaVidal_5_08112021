import { displayQuantityAndTotalPrice, limitQuantity, updateQuantity, updateTotalPrice, updateTotalQuantity } from "./utils.js";
import { subtractFromCache,  addToCache } from "./datacache.js";
import { createBoxArticle, removeThumbnail } from "./utils.js";


// Create tag with these attributes
export function createTag(tag, ...theAttributes) {
    const item = document.createElement(tag);
    for (let i = 0; i <= theAttributes.length - 1; i += 2) {
        item.setAttribute(theAttributes[i], theAttributes[i+1]);
    }
    return item
}


export function disableTag(pattern, ...theAttributes) {
    const item = document.querySelector(pattern);
    for (let i = 0; i <= theAttributes.length - 1; i += 2) {
        item.setAttribute(theAttributes[i], theAttributes[i+1]);
        item.disabled = "true";
    }
}


export function enableTag(pattern, ...theAttributes) {
    const item = document.querySelector(pattern);
    for (let i = 0; i <= theAttributes.length - 1; i += 1) {
        item.removeAttribute(theAttributes[i]);
    }
    item.removeAttribute("disabled");
}


export  function removeChild(pattern, childNumber) {
    const parent = document.querySelector(pattern);
    const child = document.querySelector(pattern).childNodes[childNumber];
    parent.removeChild(child);
}


export function enableOrDisableCommandButton() {
    let contact = { 
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
    };

    if (
            (contact.email != "") &
            (contact.firstName != "") &
            (contact.lastName != "") &
            (contact.city != "") &
            (contact.address != "")
        ) {
        enableTag("#order", "style", "cursor: not-allowed; filter: blur(2px);");
    }
    else {
        disableTag("#order", "style", "cursor: not-allowed; filter: blur(2px);");
    }
}


export function validateInput(id, pattern, errorMessage = "Erreur.") {
    document
        .querySelector("#" + id)
        .addEventListener("input", (event) => {
            enableOrDisableCommandButton();

            const inputText = event.target.value

            document.querySelector("#" + id).value = inputText;
            if (pattern.test(inputText)) {
                deleteTextContent("#" + id + "ErrorMsg");

                // Erase leading and trailing spaces.Multiple spaces are replaced by a single space
                document
                    .querySelector("#" + id)
                    .addEventListener("change", (event) => {
                const inputValue = event.target.value.trim().replace(/ {2,}/g, " ");
                document.querySelector("#" + id).value = inputValue;
                });
            }
            else {
                displayTextContent("#" + id + "ErrorMsg", errorMessage);

                document
                    .getElementById("order")
                    .setAttribute("style", "cursor: not-allowed; filter: blur(2px);")

                document
                    .querySelector("#" + id + "ErrorMsg")
                    .setAttribute("style", "color: red; background-color: white; font-size: .8rem; font-weight: 600; margin: 5px 0; padding: 0 5px; border-radius: 5px;")
            }
        });
}


export function deleteTextContent(element) {
    document.querySelector(element).textContent = "";
}


export function displayTextContent(element, text) {
    document.querySelector(element).textContent = text;
}


export function createListOfColorsOption(colors) {
    for (let tint of colors) {
        let link = document.createElement("option");
        link.setAttribute("value", tint);
        link.textContent = tint;

        document.getElementById("colors").appendChild(link);
    }
}


export function displayMessageEmptyCart() {
    document
    .querySelector("#cartAndFormContainer > h1")
    .textContent = "Votre panier est vide";

    document
        .querySelector(".cart__order")
        .textContent = "";
}


export function createHomeButton() {
    const homeButton = createTag("button", "id", "homeButton", "onclick", "window.location.href = './index.html'", "style", "display: block; margin: 0 auto; padding: 18px 28px; font-size: 22px; border-radius: 40px; border: 0; background-color: #2c3e50; color: white;");
    homeButton.textContent = "Accueil";
    document.querySelector("#cartAndFormContainer").append(homeButton);
}


export function displayThumbnails() {
    for (var i = 0; i < localStorage.length; i++) {
        const object = subtractFromCache(localStorage.key(i));
        const src = object.imgUrl;
        const alt  = object.altTxt;
        const quantity = object.quantity;
        const price = object.price;
        const name = object.name;
        const naming = object.naming
        const color = object.color;
        const id = object.id;

        // if there is still a sofa in the cart
        if (object.name !== undefined) {
            const article = createBoxArticle(name, naming, id, color, src, alt, price,quantity);

            document.querySelector("#cart__items").append(article);

            document
                .getElementById(naming + "-remove-" + id)
                .addEventListener("click", () => {
                // The sofas have an identifier for all colors. A “naming” is required to identify each sofa.
                removeThumbnail(naming);
                // If you only have the catalog key in local storage: the cart is empty
                if (localStorage.length == 0) {
                    displayMessageEmptyCart();
                    createHomeButton();
                }
            });

            document
                .getElementById(naming + "-quantity-" + id)
                .addEventListener("change", (event) => {
                    event.target.value = limitQuantity(event.target.value);
                    // let currentSofa = subtractFromCache(id);  // ============================================================
                    let currentSofa = subtractFromCache(naming);
                    currentSofa.quantity = Number(event.target.value);
                    
                    addToCache(naming, currentSofa)

                    updateQuantity(id, currentSofa.quantity, naming);

                    const totalPrice = updateTotalPrice();
                    const totalQuantity = updateTotalQuantity();
                    displayQuantityAndTotalPrice(totalPrice, totalQuantity);
            });
        }
    }
}


export function displayOrder() {
        const boxOfAllOrders = createTag("article", "id", "allOrders", "style", "width: 100%; margin-bottom: 50px; text-align: center; ");
        const titleArticle = createTag("h1", "id", "titleArticle", "style", "display: block; width: 100%; text-align: center; color: #fff; font-size: 1.6rem; font-family: font-family: 'Comic Sans MS', sans-serif;");
        titleArticle.textContent = "Récapitulatif de votre commande"
        boxOfAllOrders.append(titleArticle);

    for (var i = 0; i < localStorage.length; i++) {
        const orderBox = createTag("div", "id", "order", "style", "display: inline-block; width: 300px; height: 120px; margin: 10px; border: 2px solid #fff;");
        const infoBox = createTag("div", "id", "infoBox", "style", "display: inline-block; width: 60%;");
        const imgAndInfoBox = createTag("div", "id", "infoBox", "style", "display: flex; flex-flow: row wrap; align-content: center; width: 100%; height: 90px; background-color: navy;");

        const object = subtractFromCache(localStorage.key(i));
        const src = object.imgUrl;
        const alt  = object.altTxt;
        const name = object.name;

        if (object.name != null) {
            // ====================================== Html structure ==================================================
            const price = createTag("p", "style", "margin: 6px;");
            price.textContent = "Prix : " + object.price .toLocaleString("fi")  + "€";

            const quantity = createTag("p", "style", "margin: 6px;");
            quantity.textContent = "Quantité : " + object.quantity;

            const totalPrice = createTag("p", "style", "margin: 6px;");
            totalPrice.textContent = "Prix total : " + (object.price * object.quantity).toLocaleString("fi")  + "€";

            infoBox.append(price, quantity, totalPrice);
            
            const img = createTag("img", "src", src, "alt", alt, "width", 80, "height", 80, "style", "display-block; border-radius: 50px; margin: 0 auto; background-color: maroon;")   
            imgAndInfoBox.append(img);

            imgAndInfoBox.append(infoBox)

            const title = createTag("h2", "style", "width: 100%; margin: 0; padding: 2px 0; font-size: 1.2rem; font-weight: 600; border-top: 2px solid #fff; background-color: #000;");
            title.textContent = name;

            orderBox.append(imgAndInfoBox);
            orderBox.append(title);

            boxOfAllOrders.append(orderBox);

            document.querySelector("#limitedWidthBlock").append(boxOfAllOrders);
        }
    }
        const thanks = createTag("p", "style", "font-size: 1.2rem;");
        thanks.textContent = "Merci d’avoir fait vos achats chez nous...";
        document.querySelector("#limitedWidthBlock").append(thanks);
}


export function displayOrderId(value) {
    document
    .querySelector("#orderId")
    .textContent = value

document
    .querySelector("#orderId")
    .setAttribute("style", "display: block; margin-top: 10px; font-size: 1.5rem; font-weight: 600; font-family: 'Comic Sans MS', sans-serif;")
}


export function displayTotalPriceOrder() {
    const totalPriceTag = createTag("p", "id", "totalPrice", "style", "display: block; border-top: 2px solid #fff; text-align: right; color: #fff; font-size: 1.6rem; font-family: 'Comic Sans MS', sans-serif;");
const totalPrice = Number(localStorage.getItem("totalPrice")).toLocaleString("fi");
totalPriceTag
    .textContent =  "TOTAL : " + totalPrice + "€";

document
    .querySelector("#allOrders")
    .append(totalPriceTag)
}
