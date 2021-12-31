import { displayQuantityAndTotalPrice, limitQuantity, updateQuantity, updateTotalPrice, updateTotalQuantity } from "./utils.js";
import { subtractFromCache,  addToCache } from "./datacache.js";

import { createBoxArticle, removeThumbnail,  } from "./utils.js";


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
    // console.log(parent.childNodes)
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

// export function validateInput(id, pattern, errorMessage = "Erreur.", quantity) {
export function validateInput(id, pattern, errorMessage = "Erreur.") {
    document
        .querySelector("#" + id)
        .addEventListener("change", (event) => {
            enableOrDisableCommandButton();

            const removeStartAndEndSpace = event.target.value.trim();
            // Multiple spaces are replaced by a single space
            const changeMultipleSpaceByOne = removeStartAndEndSpace.replace(/ {2,}/g, " ");

            document.querySelector("#" + id).value = changeMultipleSpaceByOne;
            if (pattern.test(changeMultipleSpaceByOne)) {
                deleteTextContent("#" + id + "ErrorMsg");
                    
                document
                    .querySelector("#" + id)
                    .textContent = changeMultipleSpaceByOne;

                // if (quantity != 0) {
                //     // activateOrDisable("#order", 1, "style", "cursor: not-allowed; filter: blur(2px);", "content", "aaaaaaa");
                    
                // // document
                // //     .getElementById("order")    
                // //     .removeAttribute("style");
                // }    
            }
            else {
                displayTextContent("#" + id + "ErrorMsg", errorMessage);

                // activateOrDisable("#order", 1);

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




// export function activateOrDisable(pattern, value, ...theAttributes) {
//     if (value == 0) {
//         const item = document.querySelector(pattern);
//         for (let i = 0; i <= theAttributes.length - 1; i += 2) {
//             item.setAttribute(theAttributes[i], theAttributes[i+1]);
//         }
//         item.disabled = "true";
//         // document.querySelector(pattern).setAttribute("style", "cursor: not-allowed; filter: blur(2px);")
//     }
//     else {
//         document.querySelector(pattern).removeAttribute("disabled")
//     }
// }




export function getColorSofa(colors) {
    for (let tint of colors) {
        let link = document.createElement("option");
        link.setAttribute("value", tint);
        link.textContent = tint;

        document.getElementById("colors").appendChild(link);
    }
}


// export  function removeChild(pattern, childNumber) {
//     const parent = document.querySelector(pattern);
//     const child = document.querySelector(pattern).childNodes[childNumber];
//     parent.removeChild(child);
// }


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
                // If you only have the catalog key in local storage: the cart is empty
                if (localStorage.length == 1) {
                    window.location.href = "index.html"
                }
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
        // const quantity = object.quantity;
        // const price = object.price;
        const name = object.name;
        // const color = object.color;
        // const id = object.id;

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
        const thanks = createTag("p", "style", "font-size: 1.4rem;");
        thanks.textContent = "Merci de votre visite...";
        document.querySelector("#limitedWidthBlock").append(thanks);
}
