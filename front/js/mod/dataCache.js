import { limitQuantity } from "./utils.js"

export function subtractFromCache(data) {
    const jsonFiles = localStorage.getItem(data);
    const files = JSON.parse(jsonFiles);
    return files
}

export function addToCache(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}


export function getParamsFromUrl() {
    const paramsString = decodeURIComponent(location.search.substring(1).split("&"))
    console.log(paramsString)
    return 
}


export function getFormEntries(data) {
    console.log(decodeURIComponent(data).split(","))
    return decodeURIComponent(data).split(",")
}