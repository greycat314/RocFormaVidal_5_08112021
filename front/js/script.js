import { extractFileNameFromUrl } from "./mod/utils.js";
import { createSofaStyleLink } from "./mod/utils.js";
import { createUrlForEveryColor } from "./mod/utils.js";
import { createTag } from "./mod/manipDom.js";


fetch("http://localhost:3000/api/products")
    .then(response => response.json())

    .then(res => { 
        let sofaArray = [];

        res.forEach((sofa, i) => {
            // Products Features
            const {name, description,altTxt} = sofa;
            sofaArray[i] = sofa;

            const color = sofa.colors[0].split("/").join("");   // Colors : Blue, White, Black/Red, ...
            sofa.color = color;

            const style = extractFileNameFromUrl(sofa.imageUrl);
            sofa.style = style;
            // ===== Rename the image of every sofa (append the first color)
            // http://localhost:3000/images/kanap01.jpeg --> http://localhost:3000/images/kanap01Blue.jpeg
            const url = createUrlForEveryColor(sofa.imageUrl, color);
            sofa.imageUrl = url;

            // ===== Html structure
            const link = createSofaStyleLink(i);

            const image = createTag("img", "src", sofa.imageUrl, "altTxt", altTxt, "width", 160, "height", 160);

            const title = createTag("h3", "class", "productName");
            title.innerHTML = name;

            const paragraph =createTag("p", "class", "productDescription");
            paragraph.innerHTML = description;

            const article = createTag("article");

            article.append(image, title, paragraph);

            link.append(article);

            document.getElementById("items").appendChild(link);
        })

        // ===== Local Storage
        localStorage.setItem("catalog", JSON.stringify(sofaArray));
    })  

    .catch(error => console.log(error));
