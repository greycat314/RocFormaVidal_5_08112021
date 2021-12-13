for (var i = 0; i < localStorage.length; i++) {
    const object = subtractFromCache(localStorage.key(i));
}

thumbnailsBox();

const total = displayThumbnails();

document
    .getElementById("totalQuantity")
    .textContent = Number(total);  

// ====================================== Functions ===================================================
function addToCache(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}


function subtractFromCache(data) {
    const jsonFiles = localStorage.getItem(data);
    const files = JSON.parse(jsonFiles);
    return files
}


function img(src, alt, width, height) {
    const tag = document.createElement("img");
    tag.setAttribute("src", src);
    tag.setAttribute("alt", alt);
    tag.setAttribute("width", width);
    tag.setAttribute("height", height);
    return tag;
}


function displayThumbnails() {
    // document.getElementById("thumbnails").textContent = "";

    for (var i = 0; i < localStorage.length; i++) {
        const object = subtractFromCache(localStorage.key(i));
            const src = object.imgUrl;
            const alt  = object.altTxt;
            const quantity = object.quantity;
            const price = object.price;
            const id = object.itemName;
            const name = object.name;

        if (object.name !== undefined) {
            // Thumbnail
            const elt = makeThumbnail(src, alt, 90, 90);
            
            // Thumbnails block
            const style = "display: inline-block; width: 200px; margin: 8px; border: 2px solid #fff; border-radius: 10px; box-shadow: 1px 1px 5px 3px white;";
            const thumbnailView = makeElement("div", id, style, "");
            
            thumbnailView.appendChild(elt);
            
            // Quantity
            const span = makeElement("span", "", "", quantity);
            thumbnailView.appendChild(span);

            // Total price for every sofa
            const totalPrice = (price * quantity).toLocaleString("fi-FI");
            const priceBlock = makeElement("p", "", "background-Color: #000; text-align: center; font-weight: 600; border-radius: 10px;", totalPrice + "€");
            thumbnailView.appendChild(priceBlock);

            // Name
            const item = name;
            const nameBlock = makeElement("p", "", "text-align: center; font-size: 1.2em; font-weight: 600; text-overflow: ellipsis;", item);
            thumbnailView.appendChild(nameBlock);

            // Block command
            const model = "text-align: center; width: 100%; background-color: orange";
            const box = makeElement("div", "", model, "aaaaaaa");
            thumbnailView.appendChild(box);

            document.getElementById("thumbnails").append(thumbnailView);
        }
    }
}


function makeThumbnail(src, alt, width, height) {
    const thumbnail = img(src, alt, width, height);
    thumbnail.setAttribute("style", "border-radius: 50px; margin: 5px 0;");
    return thumbnail;
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


function thumbnailsBox() {
    const style = "text-align: center; width: 100%; margin-top: 30px;";
    const div = makeElement("div", "thumbnails", style, "");
    document.querySelector("#cart__items").appendChild(div);
}