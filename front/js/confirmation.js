import { displayId } from "./mod/utils.js";
import { removeChild } from "./mod/manipDom.js";
import { formData } from "./mod/dataCache.js";
import { formDataTable } from "./mod/dataCache.js";


// Order id
const orderId = Date.now();
displayId(orderId);


// Product table
delete localStorage.catalog; // Remove item "catalog" of Product table
console.log(localStorage)
// const tab = (localStorage["107fb5b75607497b96722bda5b504926-Blue"])
// console.log(tab)
// const files = JSON.parse(tab);
// console.log(files.name + " - " + files.price + " - " + files.quantity + " - " + files.imgUrl)

// Object contact
const form = new formData(); // Créer un objet
const uri = formDataTable(form) // Décoder un composant d'un URI
const object = {...uri} // Convertir un tableau en objet
console.log(object)



// fetch("http://localhost:3000/api/products")
//     .then(response => response.json()
//         .then(data => console.log(data))
//     )
//     .catch(error => console.log(error));

// http://localhost:3000/api/products


// fetch("http://localhost:3000/api/products/id/", {
//     method : "POST",
//     headers : {
//         "Content-Type": "application/json"
//     },
//     body : JSON.stringify(localStorage)
// })
//     .then(response => response.json()
//         .then(data => console.log(data))
//     )
//     .catch(error => console.log(error));


    // localStorage.clear(); A GARDER ??? ET LE BOUTON PANIER A ENLEVER ???
    removeChild(".limitedWidthBlock > nav > ul", 3); // Delete cart button

