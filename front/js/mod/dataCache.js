import { limitQuantity } from "./utils.js"

export function subtractFromCache(data) {
    const jsonFiles = localStorage.getItem(data);
    const files = JSON.parse(jsonFiles);
    return files
}

export function addToCache(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}


export function formData() {
    return location.search.substring(1).split("&")
}


export function formDataTable(data) {
    return decodeURIComponent(data).split(",")
}