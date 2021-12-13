// ===================================== url argument ===================================================
const param = getIdFromParams();


// ===================== If manual modification of the value transmitted by the Url =================================
if (isParamInvalid(param)) redirectToHome();


// ========================================= Data ======================================================
idArray = [];
const cartMap = new Map();

// ===================================== Local Storage ==================================================
// console.log(window.location.search.substring(1));
let currentSofa = subtractFromCache("sofaData")[param];

const {colors, color, _id, name, price, imageUrl, description, altTxt, style} = currentSofa; // Destructuring
currentSofa.quantity = Number(1);

// localStorage.removeItem("sofaData");

// ========================================= Cart =====================================================
thumbnailsBox();
document
    .getElementById("addToCart")
    .addEventListener("click", () => {
        const cartMap = addToCart(currentSofa);
        displayThumbnails(cartMap);
});


// ====================================== Html structure ==================================================
let image = img(currentSofa.imageUrl, currentSofa.altTxt, 200, 200);
imgBox(image);


// ========== Creation of option tags in select tag (name="color-select")
colorsOption();


// ========== Change image when color sofa is selected
displayImage();


// ========== Change sofa image when an other sofa color is selected
document.getElementById("quantity").setAttribute("value", "1");


// ========== Control the quantity of sofa
quantityControl();


// // ========== Thumbnails box
// thumbnailsBox();


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
        this.id = id + "-" + this.color; // An identifier for each color of each sofa
        this.style = style; // kanap01
        // const newDescription = description.split("bleu").join("Bleu");
        // const newColor = color.split("/").join(""); // For sofa with two colors : Black/Yellow --> BlackYellow, ...
        this.itemName = this.style + this.color;
    }
}


// ====================================== Functions ===================================================
function getIdFromParams() {
    return window.location.search.substring(1);
}


function isParamInvalid(param) {
    return param < 0 || param > 8 || isNaN(param) || param == ""
}

function redirectToHome() {
    window.location. href = "index.html";
}


function img(src, alt, width, height) {
    const tag = document.createElement("img");
    tag.setAttribute("src", src);
    tag.setAttribute("alt", alt);
    tag.setAttribute("width", width);
    tag.setAttribute("height", height);
    return tag;
}


function imgBox(value) {
    document.querySelector("div .item__img").append(value);
    document.getElementById("title").textContent = currentSofa.name;
    document.getElementById("price").textContent = currentSofa.price;
    document.getElementById("description").textContent = currentSofa.description;
}


function thumbnailsBox() {
    var style = "text-align: center; width: 100%; margin-top: 30px;";
    var div = makeElement("div", "thumbnails", style, "");
    document.querySelector("div .item__content").appendChild(div);
}


// ========== Creation of option tags in select tag (name="color-select")
function colorsOption() {
    for (let tint of colors) {
        let link = document.createElement("option");
        link.setAttribute("value", tint);
        link.textContent = tint;

        document.getElementById("colors").appendChild(link);
    }
}


// ========== Change image when color sofa is selected
function displayImage() {
    document
        .getElementById("colors")
        .addEventListener("change", (event) => {
            const colorChoice = event.target.value.split("/").join(""); // Black/Red --> BlackRed
            const newUrl = changeUrl(colorChoice);
            document.querySelector(".item__img img").setAttribute("src", newUrl);
            
            currentSofa.color = colorChoice;
            currentSofa.imageUrl = newUrl;
    });
}


function changeUrl(color) {
    // http://localhost:3000/images/kanap01Blue.jpeg --> http://localhost:3000/images/kanap01Red.jpeg
    const value = currentSofa.imageUrl.split('/', 4).join("/") + "/" + currentSofa.style + color + ".jpeg";

    return value
}


function quantityControl() {
    document.getElementById("quantity").addEventListener("change", (event) => {
        if (event.target.value <= 0) {
            event.target.value = 1;
        }
        if (event.target.value > 100) {
            event.target.value = 100;
        }
        document
            .getElementById("quantity")
            .setAttribute("value", event.target.value);

        currentSofa.quantity = Number(event.target.value);
    });
}


function makeElement(type = "p", id = "", style = "", content = "") {
    const tag = document.createElement(type);
    if (id != "") {
        tag.setAttribute("id", id);
    }
    if (style != "") {
        tag.setAttribute("style", style);
    }
    tag.innerHTML = content;
    return tag;
}


function addToCart(sofa) {    
    const item = new Sofa(
        sofa._id,
        sofa.name,
        sofa.price,
        sofa.quantity,
        sofa.imageUrl,
        sofa.description,
        sofa.altTxt,
        sofa.color,
        sofa.style
    );
    
    // ========== Sofas map
    // const cartMap = new Map();
    cartMap.set(item.id, item); 
    addToCache(item.id, item);
    return cartMap
}


function addToCache(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}


function subtractFromCache(data) {
    const jsonFiles = localStorage.getItem(data);
    const object = JSON.parse(jsonFiles);
    return object
}


function displayThumbnails(item) {
    document.getElementById("thumbnails").textContent = "";

    const mapIter = item.entries();
    for (let element of mapIter) {
        const src = element[1].imgUrl;
        const alt  = element[1].altTxt;
        const quantity = element[1].quantity;
        const price = element[1].price;
        const id = element[1].itemName;

        // Thumbnail
        const elt = makeThumbnail(src, alt, 90, 90);
        
        // Thumbnails block
        const style = "display: inline-block; width: 140px;";
        const div = makeElement("div", id, style, "");
        
        div.appendChild(elt);
        
        // Quantity
        const span = makeElement("span", "", "", quantity);
        div.appendChild(span);

        // Total price for every sofa
        const totalPrice = (price * quantity).toLocaleString("fi-FI");
        const p = makeElement("p", "", "background-Color: #000; text-align: center; width: 95%; font-weight: 600; border-radius: 10px;", totalPrice + "€");
        div.appendChild(p);

        document.getElementById("thumbnails").append(div);
    }
}


function makeThumbnail(src, alt, width, height) {
    const thumbnail = img(src, alt, width, height);
    thumbnail.setAttribute("style", "border-radius: 50px; margin: 5px 0;");
    return thumbnail;
}

function addToArray(array, item) {
    if (array.includes(item) === false) {
        array.push(item);
    }
}