import { createTag } from "./manipDom.js";
import { subtractFromCache } from "./dataCache.js";


export function limitQuantity(value) {
    if (value == 0) {value = 1;} //  If entering a non-numeric character
    if (Math.abs(value) >= 100) {
        return 100
    }
    else {
        return Math.abs(value) % 100
    }
}


export function updateTotalPrice() {
    let cartTotalPrice = 0;
    for (var i = 0; i < localStorage.length; i++) {
        const object = subtractFromCache(localStorage.key(i));
        if (object.name !== undefined) {
            cartTotalPrice += object.price * object.quantity;
        }
    }
    return cartTotalPrice
}


export function updateTotalQuantity() {
    let cartTotalArticle = 0;
    for (var i = 0; i < localStorage.length; i++) {
        const object = subtractFromCache(localStorage.key(i));
        // if (object.name !== undefined) to exclude the catalog key located in the local storage
        if (object.name !== undefined) {
            cartTotalArticle += object.quantity
        }   
    }
    return cartTotalArticle
}


export function updateQuantity(id, quantity, naming) {
    document
        .getElementById(naming + "-seeQuantity-" + id)
        .textContent = "Qté : " + quantity;
}


export function     displayQuantityAndTotalPrice(value, quantity) {
    let letter = "";
    if (Number(quantity) > 1) {letter = "s";} else {letter = "";}
    document
        .getElementById("totalQuantity")
        .textContent = "Total (" + Number(quantity) + " article" + letter + ") : ";
    document
        .getElementById("totalPrice")
        .textContent = value.toLocaleString("fi") + "€";
}


export function removeThumbnail(naming) {
    document
    .getElementById("cart__items")
    .removeChild(document.getElementById(naming));
    localStorage.removeItem(naming);
    const totalPrice = updateTotalPrice();
    const totalQuantity = updateTotalQuantity();
    displayQuantityAndTotalPrice(totalPrice, totalQuantity);
}


export function createBoxArticle(name, naming, id, color, src, alt, price,quantity) {
    const article = createTag("article", "class", "cart__item", "id", naming, "data-color", color);

    const boxImg = createTag("div", "class", "cart__item__img");
    const img = createTag("img", "width", "120", "height", "120", "src", src, "alt", alt);
    boxImg.append(img);

    const boxContent = createTag("div", "class", "item__content");
    const boxDescription = createTag("div", "class", "cart__item__content__description");
    const boxSettings = createTag("div", "class", "cart__item__content__settings");

    // Content description
    const h2 = createTag("h2", "style", "margin: 0; font-size: 1.8rem;"); h2.textContent = name;
    const pColor = createTag("p", "style", "margin: 5px 0;"); pColor.textContent = color;
    const pPrice = createTag("p", "style", "margin: 5px 0;"); pPrice.textContent = price.toLocaleString("fi") + "€";
    boxDescription.append(h2, pColor, pPrice);

    // Content settings
    const boxQuantity = createTag("div", "class", "cart__item__content__settings__quantity");
    const pQuantity = createTag("p", "id", naming + "-seeQuantity-" + id, "style", "margin: 5px 10px 5px 0;");
    pQuantity.textContent = "Qté : " + quantity;
    const inputQuantity = createTag("input", "type", "number", "class", "itemQuantity", "name", "itemQuantity", "min", 1, "max", 100, "value", quantity, "id", naming + "-quantity-" + id);
    boxQuantity.append(pQuantity, inputQuantity);

    const boxDelete = createTag("div", "class", "cart__item__content__settings__delete", "style", "margin: 10px 0; color: #fff; background-color: red; border-radius: 20px; padding: 5px 0; font-weight: 600; text-align: center; width: 110px;");
    const pDelete = createTag("p", "class", "deleteItem", "id", naming + "-remove-" + id); pDelete.textContent = "Supprimer";
    boxDelete.append(pDelete);

    boxSettings.append(boxQuantity, boxDelete);
    boxContent.append(boxDescription, boxSettings);

    article.append(boxImg, boxContent);
    return article
}


export function createThumbnailsBox() {
    const div = createTag("div", "id", "thumbnails", "style", "text-align: center; width: 100%; margin-top: 30px;");
    document.querySelector("div .item__content").appendChild(div);
}


export function isUrlParamInvalid(param) {
    return param < 0 || param > 8 || Number.isNaN(param) || param == ""
}


export function redirectToHome() {
    window.location. href = "index.html";
}


export function extractFileNameFromUrl(url) {
    // http://localhost:3000/images/kanap01.jpeg
    const split = url.split('/');
    const style = split[4].split(".")[0]; // kanap01
    return style
}


export function createSofaStyleLink(index) {
    const lien = document.createElement("a");
    const href = "./product.html?" + index;
    lien.setAttribute("href", href);
    return lien
}


export function changeUrlSofa(url, style, color) {
    // http://localhost:3000/images/kanap01Blue.jpeg --> http://localhost:3000/images/kanap01Red.jpeg
    const value = url.split('/', 4).join("/") + "/" + style + color + ".jpeg";

    return value
}


export function createUrlForEveryColor(url, color) {
    // http://localhost:3000/images/kanap01.jpeg --> http://localhost:3000/images/kanap01Blue.jpeg

    // ===== Explode Url
    const oldUrl = url.split('/');
    const oldSofaName = oldUrl[4].split("."); // ['kanap01', 'jpeg']

    // ===== Join Url
    const colorFilter =  color.split("/").join("");  // Colors : Blue, White, Black/Red, ...
    const newSofaName = oldSofaName[0] + colorFilter + "." + oldSofaName[1]; // kanap01Blue.jpeg
    oldUrl[4] = newSofaName;

    const newUrl = oldUrl.join("/");
    return newUrl
}


export function displayThumbnails(item) {
    document.getElementById("thumbnails").textContent = "";

    const mapIter = item.entries();
    for (let element of mapIter) {
        const [id, sofa] = element
        const {imgUrl, altTxt, quantity, price} = sofa

        // Thumbnail
        const img = createTag("img", "src", imgUrl, "altTxt", altTxt, "width", 90, "height", 90, "style", "border-radius: 50px; margin: 5px 0;");
        
        // Thumbnails block
        const div = createTag("div", "id", id, "style", "display: inline-block; width: 140px;");
        div.appendChild(img);
        
        // Quantity
        const span = createTag("span");
        span.innerHTML = quantity;
        div.appendChild(span);

        // Total price for every sofa
        const p = createTag("p", "style", "background-Color: #000; text-align: center; width: 95%; font-weight: 600; border-radius: 10px;");
        const totalPrice = (price * quantity).toLocaleString("fi");
        p.innerHtml = totalPrice;
        div.appendChild(p);

        document.getElementById("thumbnails").append(div);
    }
}


export function displayId(value) {
    document
        .getElementById("orderId")
        .setAttribute("style", "display: inline-block; padding-top: 10px; font-size: 1.4rem; font-weight: 600;");
    document
        .getElementById("orderId")   
        .textContent = value;
}
