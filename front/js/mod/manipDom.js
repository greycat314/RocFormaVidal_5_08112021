import { subtractFromCache } from "./datacache.js";
import { addToCache } from "./datacache.js";
import { createBoxArticle } from "./utils.js";
import { removeThumbnail } from "./utils.js";
import { limitQuantity } from "./utils.js";
import { updateQuantity } from "./utils.js";
import { updateTotalPrice } from "./utils.js";
import { updateTotalQuantity } from "./utils.js";
import { displayQuantityAndTotalPrice } from "./utils.js";

// Create tag with these attributes
export function createTag(tag, ...theAttributes) {
    const item = document.createElement(tag);
    for (let i = 0; i <= theAttributes.length - 1; i += 2) {
        item.setAttribute(theAttributes[i], theAttributes[i+1]);
    }
    return item
}


export function validateInput(id, pattern, errorMessage = "Erreur.", quantity) {
    document
        .querySelector("#" + id)
        .addEventListener("change", (event) => {
            const removeStartAndEndSpace = event.target.value.trim();
            // Multiple spaces are replaced by a single space
            const changeMultipleSpaceByOne = removeStartAndEndSpace.replace(/ {2,}/g, " ");

            document.querySelector("#" + id).value = changeMultipleSpaceByOne;
            if (pattern.test(changeMultipleSpaceByOne)) {
                deleteTextContent("#" + id + "ErrorMsg");
                    
                document
                    .querySelector("#" + id)
                    .textContent = changeMultipleSpaceByOne;

                if (quantity != 0) {
                    activateOrDisable("#order", 1);
                    
                document
                    .getElementById("order")    
                    .removeAttribute("style");
                }    
            }
            else {
                displayTextContent("#" + id + "ErrorMsg", errorMessage);

                activateOrDisable("#order", 0);

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


export function activateOrDisable(element, value) {
    if (value == 0) {
        document.querySelector(element).disabled = "true";
        document.querySelector(element).setAttribute("style", "cursor: not-allowed; filter: blur(2px);")
    }
    else {
        document.querySelector(element).removeAttribute("disabled")
    }
}


export function getColorSofa(colors) {
    for (let tint of colors) {
        let link = document.createElement("option");
        link.setAttribute("value", tint);
        link.textContent = tint;

        document.getElementById("colors").appendChild(link);
    }
}


export  function removeChild(parentNode, childNumber) {
    const parent = document.querySelector(parentNode);
    const child = document.querySelector(parentNode).childNodes[childNumber];
    parent.removeChild(child);
}


export function displayThumbnails() {
    for (var i = 0; i < localStorage.length; i++) {
        const object = subtractFromCache(localStorage.key(i));
        const src = object.imgUrl;
        const alt  = object.altTxt;
        const quantity = object.quantity;
        const price = object.price;
        const name = object.name;
        const color = object.color;
        const id = object.id;

        if (object.name != null) {
            const article = createBoxArticle(name, id, color, src, alt, price,quantity);

            document.querySelector("#cart__items").append(article);

            document
                .getElementById("remove-" + id)
                .addEventListener("click", () => {
                removeThumbnail(id);
            });

            document
                .getElementById("quantity-" + id)
                .addEventListener("change", (event) => {
                    event.target.value = limitQuantity(event.target.value);
                    let currentSofa = subtractFromCache(id);
                    currentSofa.quantity = Number(event.target.value);
                    
                    addToCache(id, currentSofa)

                    updateQuantity(id, currentSofa.quantity);

                    const totalPrice = updateTotalPrice();
                    const totalQuantity = updateTotalQuantity();
                    displayQuantityAndTotalPrice(totalPrice, totalQuantity);
            });
        }
    }
}