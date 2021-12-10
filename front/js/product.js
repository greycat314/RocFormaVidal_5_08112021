// ===================================== url argument ==================================================
const param = getIdFromParams();


// ===================== If manual modification of the value transmitted by the Url =================================
paramControl();


// ========================================= Data =====================================================
const cart = [];
const map = new Map();


// ===================================== Local Storage ==================================================
const jsonFiles = localStorage.getItem("sofaData");
const sofaFiles = JSON.parse(jsonFiles);

let currentSofa = sofaFiles[param];

const {colors, color, _id, name, price, imageUrl, description, altTxt, style} = currentSofa; // Destructuring
currentSofa.quantity = Number(1);

const data = localStorage.getItem("mapData");


// ======================================= Cart ===================================================
thumbnailsBox();
document
    .getElementById("addToCart")
    .addEventListener("click", () => {
        addToCart(currentSofa);
        displayThumbnails();
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
class sofa {
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


function paramControl() {
    if (param < 0 || param > 8 || isNaN(param) || param == "") {
        window.location.href = "index.html";
    }
}


// function explode(value, separator) {
//     const itemName = imageUrl.split("/")[4].split(".")[0];
// }


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
    // div.innerText = "Je suis le meilleur";
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

// function test(object) {
//     // Object.defineProperty(object, color, red)

//     // return object.color = "aaaa"
// }


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


function addToCart() {    
    const item = new sofa(
        currentSofa._id,
        currentSofa.name,
        currentSofa.price,
        currentSofa.quantity,
        currentSofa.imageUrl,
        currentSofa.description,
        currentSofa.altTxt,
        currentSofa.color,
        currentSofa.style
    );
    
    // ========== Sofas map
    map.set(item.id, item);
}


function displayThumbnails() {
    document.getElementById("thumbnails").textContent = "";
    var mapIter = map.entries();
    for (let element of mapIter) {
        const src = element[1].imgUrl;
        const alt  = element[1].altTxt;
        const quantity = element[1].quantity;
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

        document.getElementById("thumbnails").append(div);
    }
}


function makeThumbnail(src, alt, width, height) {
    const thumbnail = img(src, alt, width, height);
    thumbnail.setAttribute("style", "border-radius: 50px; margin: 5px 0;");
    return thumbnail;
}


