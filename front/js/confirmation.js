import { subtractFromCache } from "./mod/dataCache.js";
import { displayOrder } from "./mod/manipDom.js";

const order = localStorage.getItem("order");
const data = subtractFromCache("order");
console.log(data)



fetch("http://localhost:3000/api/products")
    .then( res => res.json())
    .then(data => console.log(data))
    .catch( error => console.log(error));


displayOrder();




