if (typeof(jsFiles) == "undefined") {

    fetch("http://localhost:3000/api/products")
        .then(response => response.json())

        .then(res => {
            
            // const jsFiles = JSON.parse(jsonFiles);

            console.log(res);

            // Local Storage (stocker des jsons uniquement)
            const jsonFiles = JSON.stringify(res);
            localStorage.setItem("data", jsonFiles);
            
            // document
            //     .getElementById("items") 
            //     .innerText = jsonFiles;

            res.forEach((sofa, i) => {
                // Products Features
                // const name = sofa.name;
                // const imageUrl = sofa.imageUrl;
                // const description = sofa.description;
                // const altTxt = sofa.altTxt;
                const {name, imageUrl, description,altTxt} = sofa; //Destructuring

                // Html structure
                const link = makeLink(i);


                const article = document.createElement("article");
                const image = new Image(160, 160);
                image.src = imageUrl;
                image.alt = altTxt;
                const title = document.createElement("h3");
                title.classList.add("productName");
                const paragraph = document.createElement("p")
                paragraph.classList.add("productDescription");
                
                // Html content
                title.textContent = name;
                paragraph .textContent = description;
                
                article.append(image, title, paragraph);
                link.append(article);
                
                document
                    .getElementById("items")
                    .appendChild(link);
            })

        })  

        .catch(error => alert("Erreur : " + error));

}

function makeLink(index) {
    const lien = document.createElement("a");
    const href = "./product.html?" + index;
    lien.setAttribute("href", href);
    return lien
}

