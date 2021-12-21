export function validateInput(id, pattern, errorMessage = "Erreur.") {
    document
        .querySelector("#" + id)
        .addEventListener("change", (event) => {
            const removeStartAndEndSpace = event.target.value.trim();
            // Multiple spaces are replaced by a single space
            const changeMultipleSpaceByOne = removeStartAndEndSpace.replace(/ {2,}/g, " ");

            document.querySelector("#" + id)
                .value = changeMultipleSpaceByOne;
            if (pattern.test(changeMultipleSpaceByOne)) {
                document
                    .querySelector("#" + id + "ErrorMsg")
                    .textContent = "";
                    
                document
                    .querySelector("#" + id)
                    .textContent = changeMultipleSpaceByOne;
                
                document
                    .getElementById("order")
                    .removeAttribute("disabled");
                    
                document
                    .getElementById("order")    
                    .removeAttribute("style");
            }
            else {
                document
                    .querySelector("#" + id + "ErrorMsg")
                    .textContent = errorMessage;

                document
                    .getElementById("order")
                    .disabled = "true";

                document
                    .getElementById("order")
                    .setAttribute("style", "cursor: not-allowed; filter: blur(2px);")
                
                document
                    .querySelector("#" + id + "ErrorMsg")
                    .setAttribute("style", "color: red; background-color: white; font-size: .8rem; font-weight: 600; margin: 5px 0; padding: 0 5px; border-radius: 5px;")
            }
        });
}

