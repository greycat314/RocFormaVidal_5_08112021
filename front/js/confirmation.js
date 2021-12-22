import { displayId } from "./mod/utils.js";
import { subtractFromCache } from "./mod/datacache.js";
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
const form = formData(); // Créer un objet
const uri = formDataTable(form) // Décoder un composant d'un URI
const object = {...uri} // Convertir un tableau en objet
console.log(object)



fetch("https://geo.api.gouv.fr/departements?fields=nom,code,codeRegion")
    .then(response => response.json()
        .then(data => console.log(data))
    )
    .catch(error => console.log(error));






