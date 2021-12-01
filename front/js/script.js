if (typeof(jsFiles) == "undefined") {

    fetch("http://localhost:3000/api/products")
        .then(response => response.json())

        .then(res => {  
            // Local Storage
            const jsonFiles = JSON.stringify(res);
            localStorage.setItem("data", jsonFiles);
            
            document
                .getElementById("items") 
                .innerText += jsonFiles;

            res.forEach((sofa, i) => {
                // Products Features
                const {name, imageUrl, description,altTxt} = sofa; //Destructuring
                console.log(sofa);

                // Html structure
                const link = makeLink(i);
                const image = makeImg(imageUrl, altTxt, 160, 160);
                const title = makeElement("h3", "productName", name);

                const paragraph = makeElement("p", "productDescription", description);
                const article = makeElement("article");

                article.append(image, title, paragraph);

                link.append(article);

                document.getElementById("items").appendChild(link);
            })

        })  

        .catch(error => alert("Erreur : " + error));
}

// ==================== Functions ==================== //
function makeLink(index) {
    const lien = document.createElement("a");
    const href = "./product.html?" + index;
    lien.setAttribute("href", href);
    return lien
}

function makeImg(src, alt, width, height) {
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

