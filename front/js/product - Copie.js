// url argument
let i = window.location.search.substring(1);

// If manual modification of the value transmitted by the Url
if (i < 0 || i > 8 || isNaN(i)) {
    // localStorage.removeItem("jsonFiles");
    window.location.href = "index.html";
}

// Local Storage
let jsonFiles = localStorage.getItem("data");
const jsFiles = JSON.parse(jsonFiles);

// Product Feature
let productRank = i;
let productColor = jsFiles[i]["colors"];
let productId = jsFiles[i]["_id"];
let productName = jsFiles[i]["name"];
let productPrice = jsFiles[i]["price"];
let productImageUrl = jsFiles[i]["imageUrl"];
let productDescription = jsFiles[i]["description"];
let productImageAltTxt = jsFiles[i]["altTxt"];

// Html structure
let image = new Image(320, 200);
    image.src = productImageUrl;
    image.alt = productImageAltTxt;

document
    .querySelector("div .item__img")
    .append(image);

document
    .getElementById("title")
    .textContent = productName;

document
    .getElementById("price")
    .textContent = productPrice;

document
    .getElementById("description")
    .textContent = productDescription;

for (let color of productColor) {
    let link = document.createElement("option");
        link.setAttribute("value", color);
        link.textContent = color;

    document
        .getElementById("colors")
        .appendChild(link);
}

// Automatic selection of product color when opening the page
let selection = productColor[0];
document
    .querySelector("#colors option[value=" + selection + "]")
    .setAttribute("selected", "");

// `${selection}`

document
    .getElementById("description")
    .textContent = selection;

// Change image when an other color is selected
const select = document.getElementById("colors");
select.addEventListener("change", event => {
    console.log(event.target.value);
})

// Set the number of articles to one when opening the page
document
    .getElementById("quantity")
    .setAttribute("value", "1");



