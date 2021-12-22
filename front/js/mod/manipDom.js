 // Create tag with these attributes
export function createTag(tag, ...theAttributes) {
    const item = document.createElement(tag);
    for (let i = 0; i <= theAttributes.length - 1; i += 2) {
        item.setAttribute(theAttributes[i], theAttributes[i+1]);
    }
    return item
}

export function validateInput(id, pattern, errorMessage = "Erreur.", quantity) {
    document
        .querySelector("#" + id)
        .addEventListener("change", (event) => {
            const removeStartAndEndSpace = event.target.value.trim();
            // Multiple spaces are replaced by a single space
            const changeMultipleSpaceByOne = removeStartAndEndSpace.replace(/ {2,}/g, " ");

            document.querySelector("#" + id).value = changeMultipleSpaceByOne;
            if (pattern.test(changeMultipleSpaceByOne)) {
                deleteTextContent("#" + id + "ErrorMsg");
                    
                document
                    .querySelector("#" + id)
                    .textContent = changeMultipleSpaceByOne;

                if (quantity != 0) {
                    activateOrDisable("#order", 1);
                    
                document
                    .getElementById("order")    
                    .removeAttribute("style");
                }    
            }
            else {
                displayTextContent("#" + id + "ErrorMsg", errorMessage);

                activateOrDisable("#order", 0);

                document
                    .getElementById("order")
                    .setAttribute("style", "cursor: not-allowed; filter: blur(2px);")

                document
                    .querySelector("#" + id + "ErrorMsg")
                    .setAttribute("style", "color: red; background-color: white; font-size: .8rem; font-weight: 600; margin: 5px 0; padding: 0 5px; border-radius: 5px;")
            }
        });
}


export function deleteTextContent(element) {
    document.querySelector(element).textContent = "";
}


export function displayTextContent(element, text) {
    document.querySelector(element).textContent = text;
}


export function activateOrDisable(element, value) {
    if (value == 0) {
        document.querySelector(element).disabled = "true";
        document.querySelector(element).setAttribute("style", "cursor: not-allowed; filter: blur(2px);")
    }
    else {
        document.querySelector(element).removeAttribute("disabled")
    }
}


export function getColorSofa(colors) {
    for (let tint of colors) {
        let link = document.createElement("option");
        link.setAttribute("value", tint);
        link.textContent = tint;

        document.getElementById("colors").appendChild(link);
    }
}