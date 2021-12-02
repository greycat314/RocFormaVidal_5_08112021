// url argument
const i = window.location.search.substring(1);

// If manual modification of the value transmitted by the Url
if (i < 0 || i > 8 || isNaN(i) || i == "") {
    window.location.href = "index.html";
}

// Local Storage
const jsonFiles = localStorage.getItem("data");
const jsFiles = JSON.parse(jsonFiles);
console.log(i)
// console.log(jsFiles[i]);

const number = Math.random();
console.log(number);
const nam = "currentSofa" + number;
console.log(nam);

let currentSofa = jsFiles[i];
 // Products Features
const {colors, _id, name, price, imageUrl, description, altTxt} = currentSofa; //Destructuring
currentSofa.quantity = Number(1);
currentSofa.chosenColor = currentSofa.colors[0];

// Html structure
const image = makeImg(imageUrl, altTxt, 200, 200);
document.querySelector("div .item__img").append(image);

document.getElementById("title").textContent = name;

document.getElementById("price").textContent = price;

document.getElementById("description").textContent = description;

// Creation of option tags in select tag (name="color-select")
colorsOption();

// Change image when color sofa is selected
displayImage(image, colors);

// Set the number of articles to one when opening the page
document.getElementById("quantity").setAttribute("value", "1");

// Control the number of articles
updateQuantity(currentSofa);
console.log(currentSofa);

// Sofa thumbnails container
var style = "text-align: center; width: 100%; margin-top: 30px; background-color: green;";
var div = makeElement("div", "thumbnails", style, "");
document.querySelector("div .item__content").appendChild(div);

displayThumbnails(currentSofa.imageUrl, currentSofa.altTxt);
// const allThumbnails = displayThumbnails(currentSofa.imageUrl, currentSofa.altTxt);
// console.log(allThumbnails);

// Cart
const response = cart();
// console.log(response);

// ==================== Functions ==================== //
function makeImg(src, alt, width, height) {
    const tag = document.createElement("img");
    tag.setAttribute("src", src);
    tag.setAttribute("alt", alt);
    tag.setAttribute("width", width);
    tag.setAttribute("height", height);  
    return tag
}

function alphanumericCharacters(string) {
    return string.replace(/[^a-z0-1]/i, "");
}

// Creation of option tags in select tag (name="color-select")
function colorsOption() {
    for (let tint of colors) {
        let link = document.createElement("option");
        link.setAttribute("value", tint);
        link.textContent = tint;
    
        document.getElementById("colors").appendChild(link);
    }
}

// Change image when color sofa is selected
function displayImage(image, colors, sofa = currentSofa) {
    const imageUrl = image.src;
    const select = document.getElementById("colors");
    
    // Change image when color sofa is selected
    select.addEventListener("change", event => {
         // Only letters or numbers for the name of the colors. Names of colors : Black, Red, Black/Red, Black/Yellow, Navy, etc...
        const colorName = alphanumericCharacters(event.target.value);
        // Image URI
        const match = imageUrl.match(/([a-z]+)([0-9]+)(?:.jpeg)/i);
        const sofaName = match[1]+match[2];
        const uri = "images/" + sofaName   + colorName + ".jpeg";

        const address = (select.value != colors[0]) ? "http://localhost:3000/" + uri : imageUrl;
        document.querySelector(".item__img img").setAttribute("src", address);
        sofa.imageUrl = address;

        sofa.chosenColor = colorName;
        // console.log(currentSofa);
        // console.log(currentSofa.imageUrl);
    })
}

// Control the number of articles
function updateQuantity(sofa) {
    document.getElementById("quantity").addEventListener("change", event => {
        if (event.target.value <= 0) {event.target.value = 1;};
        if (event.target.value > 100) {event.target.value = 100;};
        document.getElementById("quantity").setAttribute("value", event.target.value );
        sofa.quantity = Number(event.target.value);
    });
}

function makeImg(src, alt, width, height) {
    const tag = document.createElement("img");
    tag.setAttribute("src", src);
    tag.setAttribute("alt", alt);
    tag.setAttribute("width", width);
    tag.setAttribute("height", height);  
    return tag
}

function makeElement(type = "p", id = "", style = "", content = "") {
    const tag = document.createElement(type); 
    if (id != "") {
        tag.setAttribute("id", id);
    };
    if (style != "") {
        tag.setAttribute("style", style);
    };
    tag.innerHTML = content;
    return tag
}

function makeThumbnails(src, alt, width, height, quantity) {
    const img = makeImg(src, alt, width, height);
    img.setAttribute("style","border-radius: 50px; margin: 5px 0;");

    // Quantity for each item
    const tag = document.createElement("span");
    tag.textContent = quantity;
    const tab = [img, tag];
    return tab
}

// Cart
function cart(sofa = currentSofa) {
    if (typeof sofaCart == "undefined") {sofaCart = new Array();}

    const number = Math.random();
    console.log(number);
    window["nam" + number] = currentSofa;
    console.log(window["nam" + number]);
    
    sofaCart.push(sofa);
    console.log(sofaCart);
    return sofaCart
}

function displayThumbnails() {
    document.getElementById("addToCart").addEventListener("click", event => {
        // Creation of thumbnails
        const style = "display: inline-block; width: 114px; background-color: maroon;";
        const div = makeElement("div", "", style, "");
        document.querySelector("div #thumbnails").appendChild(div);

        const sofaQuantity = document.getElementById("quantity").value;
        // console.log(sofaUrl, txt, "*******");
        const thumbnails = makeThumbnails(currentSofa.imageUrl, currentSofa.altTxt, 60, 60, sofaQuantity);
        div.append(thumbnails[0], thumbnails[1]);
        console.log(thumbnails[0], thumbnails[1]);
        // console.log(currentSofa);
        cart();
        // const value = cart(currentSofa);
        // console.log(value);
    });
}






