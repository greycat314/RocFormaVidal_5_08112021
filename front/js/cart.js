import { limitQuantity } from "./mod/utils.js";
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


// ====================================== Home button ===================================================
const style ="font-size: 22px; border-radius: 40px; background-color: #2c3e50; border: 0; color: white; padding: 18px 28px; cursor: pointer; margin: 40px 0 0 40px;";
const homeButton = createTag("button", "id", "homeButton", "onclick", "window.location.href = './index.html'", "style", style);
homeButton.textContent = "Accueil";
document.querySelector(".cart__order__form__submit").append(homeButton);


// ====================================== Functions ===================================================
function displayThumbnails() {
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
