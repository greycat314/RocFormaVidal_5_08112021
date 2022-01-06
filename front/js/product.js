// If the catalog is not  in the local storage you cannot display any item
if (localStorage.getItem("catalog") === null) {
    window.location.href = "./index.html";
}

import { limitQuantity, createThumbnailsBox, changeUrlSofa, isUrlParamInvalid, redirectToHome,  displayThumbnails } from "./mod/utils.js";
import { createTag, createListOfColorsOption } from "./mod/manipDom.js";
import { addToCache, subtractFromCache } from "./mod/datacache.js";


// ===================================== url argument ===================================================
const param = window.location.search.substring(1);


// ===================== If manual modification of the value transmitted by the Url =================================
if (isUrlParamInvalid(param)) redirectToHome();


// ========================================= Data ======================================================
const cartMap = new Map();


// ===================================== Local Storage ==================================================
let currentSofa = subtractFromCache("catalog")[param];

const {colors} = currentSofa;
currentSofa.quantity = Number(1);


// ========================================= Cart =====================================================
createThumbnailsBox();
document
    .getElementById("addToCart")
    .addEventListener("click", () => {
        const cartMap = addToCart(currentSofa);
        displayThumbnails(cartMap);
});


// ====================================== Html structure ==================================================
let image = createTag("img", "src", currentSofa.imageUrl, "alt", currentSofa.altTxt, "width", 200, "height", 200)
document.querySelector("div .item__img").append(image);
document.getElementById("title").textContent = currentSofa.name;
document.getElementById("price").textContent = currentSofa.price.toLocaleString("fi");
document.getElementById("description").textContent = currentSofa.description;


// ========== Creation of option tags in select tag (name="color-select")
createListOfColorsOption(colors);


// ========== Change sofa image when an other sofa color is selected
displayNewSofaColor();


// ========== Automatically sets the chosen amount of sofa to 1
document.getElementById("quantity").setAttribute("value", "1");


// ========== Control the quantity of sofa
quantityControl("quantity");


// ===================================== Classes ==================================================
class Sofa {
    constructor(id, name, price, quantity, imgUrl, altTxt, description, color, style) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.imgUrl = imgUrl;
        this.altTxt = altTxt;
        this.description = description;
        this.color = color;
        this.id = id;
        this.style = style; // kanap01
        this.naming = this.style + this.color;
    }
}


// ====================================== Cart button ===================================================
const cartButton = createTag("button", "id", "cartButton", "onclick", "window.location.href = './cart.html'", "style", "margin-left: 50px;");
cartButton.textContent = "Panier";
document.querySelector("div .item__content__addButton").append(cartButton);


// ====================================== Functions ===================================================
function displayNewSofaColor() {
    document
        .getElementById("colors")
        .addEventListener("change", (event) => {
            const colorChoice = event.target.value.split("/").join(""); // Black/Red --> BlackRed
            const newUrl = changeUrlSofa(currentSofa.imageUrl, currentSofa.style, colorChoice);
            document.querySelector(".item__img img").setAttribute("src", newUrl);
            
            currentSofa.color = colorChoice;
            currentSofa.imageUrl = newUrl;
    });
}


function addToCart(sofa) { 
    const limitedQuantity = limitQuantity(sofa.quantity)
    const item = new Sofa(
        sofa._id,
        sofa.name,
        sofa.price,
        limitedQuantity,
        sofa.imageUrl,
        sofa.description,
        sofa.altTxt,
        sofa.color,
        sofa.style,
    );
    
    // ========== Sofas map
    cartMap.set(item.naming, item); 
    addToCache(item.naming, item);
    return cartMap
}


function quantityControl(id) {
    document.getElementById(id).addEventListener("change", (event) => {
        document
            .getElementById("quantity")
            .setAttribute("value", limitQuantity(event.target.value));

        currentSofa.quantity = event.target.value;
    });
}