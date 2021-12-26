import { displayId } from "./mod/utils.js";
import { removeChild } from "./mod/manipDom.js";
import { getParamsFromUrl } from "./mod/dataCache.js";
import { getFormEntries } from "./mod/dataCache.js";


// // Order id
// const number = Date.now();
// displayId(number);
// const orderId = {"orderId" :  number}

// // Product
// const data = {"data" : localStorage}

// // Object contact
// const uri = getFormEntries(getParamsFromUrl()) // Décoder un composant d'un URI
// const formData = {"contact" : uri}

// // const body = Object.assign(orderId, formData, data);
// // const contact



fetch("http://localhost:3000/api/products")
    .then(response => response.json()
        .then(data => console.log(data))
    )
    .catch(error => console.log(error));

// http://localhost:3000/api/products


// fetch("http://localhost:3000/api/products/order", {
//     method : "POST",
//     headers : {
//         "Content-Type": "application/json"
//     },
//     body : JSON.stringify(finalResult)
// })
//     .then(response => response.json()
//         .then(data => console.log(data))
//     )
//     .catch(error => console.log(error));


    // localStorage.clear(); A GARDER ??? ET LE BOUTON PANIER A ENLEVER ???
    // remo veChild(".limitedWidthBlock > nav > ul", 3); // Delete cart button

