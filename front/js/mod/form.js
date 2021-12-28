export function validateInput(id, pattern, errorMessage = "Erreur.") {
    document
        .querySelector("#" + id)
        .addEventListener("input", (event) => {
            // validateForm();
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
            }
            else {
                document
                    .querySelector("#" + id + "ErrorMsg")
                    .textContent = errorMessage;
                
                document
                    .querySelector("#" + id + "ErrorMsg")
                    .setAttribute("style", "color: red; background-color: white; font-size: .8rem; font-weight: 600; margin: 5px 0; padding: 0 5px; border-radius: 5px;")
            }
        });
}
