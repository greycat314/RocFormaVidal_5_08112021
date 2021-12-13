// if (typeof(sofaFiles) == "undefined") {

    fetch("http://localhost:3000/api/products")
        .then(response => response.json())

        .then(res => { 
            let sofaArray = []; // Array of sofa object

            res.forEach((sofa, i) => {
                // Products Features
                const {name, description,altTxt} = sofa;
                sofaArray[i] = sofa;

                const color = sofa.colors[0].split("/").join("");   // Colors : Blue, White, Black/Red, ...
                sofa.color = color;

                const style = findStyle(sofa.imageUrl);
                sofa.style = style;
                
                // ===== Rename the image of every sofa (append the first color)
                // http://localhost:3000/images/kanap01.jpeg --> http://localhost:3000/images/kanap01Blue.jpeg
                const url = changeUrl(sofa.imageUrl, color);
                sofa.imageUrl = url;

                // ===== Html structure
                const link = makeLink(i);
                const image = img(sofa.imageUrl, altTxt, 160, 160);
                const title = makeElement("h3", "productName", name);

                const paragraph = makeElement("p", "productDescription", description);
                const article = makeElement("article");

                article.append(image, title, paragraph);

                link.append(article);

                document.getElementById("items").appendChild(link);
            })

            // ===== Local Storage
            localStorage.setItem("sofaData", JSON.stringify(sofaArray));
        })  

        .catch(error => console.log(error));
// }


// ====================================== Functions ===================================================
function makeLink(index) {
    const lien = document.createElement("a");
    const href = "./product.html?" + index;
    lien.setAttribute("href", href);
    return lien
}


function img(src, alt, width, height) {
    const tag = document.createElement("img");
    tag.setAttribute("src", src);
    tag.setAttribute("alt", alt);
    tag.setAttribute("width", width);
    tag.setAttribute("height", height);  
    return tag
}


function makeElement(type = "p", classValue = null, content = null) {
    const tag = document.createElement(type);
    if (classValue != null) {
        tag.classList.add(classValue);
    };    
    tag.innerHTML = content;
    return tag
}


function changeUrl(url, color) {
    // http://localhost:3000/images/kanap01.jpeg --> http://localhost:3000/images/kanap01Blue.jpeg

    // ===== Explode Url
    const oldUrl = url.split('/');
    const oldSofaName = oldUrl[4].split("."); // ['kanap01', 'jpeg']

    // ===== Join Url
    const colorFilter =  color.split("/").join("");  // Colors : Blue, White, Black/Red, ...
    const newSofaName = oldSofaName[0] + colorFilter + "." + oldSofaName[1]; // kanap01Blue.jpeg
    oldUrl[4] = newSofaName;

    newUrl = oldUrl.join("/");
    return newUrl
}


function findStyle(url) {
    // http://localhost:3000/images/kanap01.jpeg

    // ===== Explode Url
    const split = url.split('/');
    const style = split[4].split(".")[0]; // kanap01
    return style
}