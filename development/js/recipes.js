//Name localstorage
const user = document.querySelector(".user-name");

if (localStorage.savedName == null) {
    user.innerText = "Imię";
} else {
    user.innerText = localStorage.savedName;
}




// Add recipe
const buttonAddRecipe = document.querySelector(".button-add-recipe");

buttonAddRecipe.addEventListener("click", function (e) {
    if (localStorage.savedName == null) {
        alert("Najpierw podaj swoję imię");
    }
    else {
        localStorage.setItem("addRecipe", "dodaj przepis");
        location.href = "./app.html";
    }
});




//Recipes list localstorage
const tBodyRecipe = document.querySelector(".recipes-table-tbody");
const recipesLocalStorage = localStorage.getItem("recipe_");
const recipesListLocalStorage = JSON.parse(recipesLocalStorage);
const newRecipeSection = document.querySelector(".new-recipe-section");
const mainAppSectionContent = document.querySelector(
    ".main-app-section-content"
);
const sectionRecipeNameInput = document.querySelector(".new-recipe-name input");
const sectionRecipeDscTextarea = document.querySelector(
    ".new-recipe-dsc textarea"
);
const instructionList = document.getElementById("instruction_list");
const ingredientList = document.getElementById("ingredient_list");
const saveAndClose = document.getElementById("saveAndClose");

newRecipeSection.style.display = "none";

if (localStorage.recipe_ == null || localStorage.recipe_ == "[]") {
    let h2 = document.createElement("h2");
    h2.innerText = "Twoja lista przepisów jest pusta :(";
    tBodyRecipe.appendChild(h2);
    tBodyRecipe.style.display = "flex";
    tBodyRecipe.style.alignItems = "center";
    tBodyRecipe.style.justifyContent = "center";
} else {
    recipesListLocalStorage.forEach((e) => {
        const trRecipe = document.createElement("tr");
        const tdRecipeId = document.createElement("td");
        const tdRecipeName = document.createElement("td");
        const tdRecipeDes = document.createElement("td");
        const tdRecipeIco = document.createElement("td");

        const editBtn = document.createElement("i");
        const deleteBtn = document.createElement("i");
        const saveBtn = document.createElement("i");
        const printBtn = document.createElement("i");

        editBtn.className = "fas fa-edit";
        deleteBtn.className = "fas fa-trash-alt";
        printBtn.className = "fas fa-print";

        trRecipe.appendChild(tdRecipeId);
        trRecipe.appendChild(tdRecipeName);
        trRecipe.appendChild(tdRecipeDes);
        trRecipe.appendChild(tdRecipeIco);

        tdRecipeId.innerText = e.id;
        tdRecipeName.innerText = e.title;
        tdRecipeDes.innerText = e.description;
        tdRecipeIco.appendChild(editBtn);
        tdRecipeIco.appendChild(deleteBtn);
        tdRecipeIco.appendChild(printBtn);
        tBodyRecipe.appendChild(trRecipe);
        tdRecipeIco.appendChild(saveBtn);

        deleteBtn.addEventListener("click", () => {
            recipesListLocalStorage.splice(this.data, 1);
            localStorage.setItem("recipe_", JSON.stringify(recipesListLocalStorage));
            window.location.reload(false);
        });

        printBtn.addEventListener("click", () => {
            let recipePrint = `${e.title}

            ${e.description}

            Skladniki:
            ${e.ingredients.join("\r\n")}

            Instrukcje:
            ${e.instructions.join("\r\n")}
            `;

            document.body.innerText = recipePrint;
            window.print();
            window.location.reload(false);
        });

        editBtn.addEventListener("click", function () {
            mainAppSectionContent.style.display = "none";
            newRecipeSection.style.display = "flex";
            newRecipeSection.style.flexDirection = "column";
            sectionRecipeNameInput.value = e.title;
            sectionRecipeDscTextarea.value = e.description;

            e.instructions.forEach(function (e) {
                let newSpan = document.createElement("span");
                let newSaveIcon = document.createElement("i");
                let newEditIcon = document.createElement("i");
                let newTrashIcon = document.createElement("i");
                newTrashIcon.className = "fas fa-trash-alt";
                newTrashIcon.style.color = "red";
                newEditIcon.className = "fas fa-edit";
                newEditIcon.style.color = "gold";
                newEditIcon.style.margin = "0 5px";
                newSaveIcon.className = "fas fa-save";
                newSaveIcon.style.color = "blue";
                newSaveIcon.style.margin = "0 5px";
                newSaveIcon.style.display = "none";
                newSaveIcon.style.cursor = "pointer";
                newTrashIcon.style.cursor = "pointer";
                newEditIcon.style.cursor = "pointer";
                newTrashIcon.style.display = "inline";
                newEditIcon.style.display = "inline";

                let newLi = document.createElement("li");
                newLi.innerText = e;
                newLi.appendChild(newSpan);
                newLi.appendChild(newEditIcon);
                newLi.appendChild(newSaveIcon);
                newLi.appendChild(newTrashIcon);
                instructionList.appendChild(newLi);
                newTrashIcon.addEventListener("click", function () {
                    this.parentElement.style.display = "none";
                });
                newEditIcon.addEventListener("click", function () {
                    this.previousSibling.parentElement.contentEditable = "true";
                    newEditIcon.style.display = "none";
                    newSaveIcon.style.display = "inline";
                });
                newSaveIcon.addEventListener("click", function () {
                    this.previousSibling.previousSibling.parentElement.contentEditable =
                        "false";
                    newSaveIcon.style.display = "none";
                    newEditIcon.style.display = "inline";
                });

                let instruction_butt = document.querySelector("#instruction_butt");
                let instruction_list = document.getElementById("instruction_list");
                const save = document.getElementById("saveAndClose");

                instruction_butt.addEventListener("click", function () {
                    let value_instruction = document.getElementById("value_instruction");
                    let newSpan = document.createElement("span");
                    let newSaveIcon = document.createElement("i");
                    let newEditIcon = document.createElement("i");
                    let newTrashIcon = document.createElement("i");
                    newTrashIcon.className = "fas fa-trash-alt";
                    newTrashIcon.style.color = "red";
                    newEditIcon.className = "fas fa-edit";
                    newEditIcon.style.color = "gold";
                    newEditIcon.style.margin = "0 5px";
                    newSaveIcon.className = "fas fa-save";
                    newSaveIcon.style.color = "blue";
                    newSaveIcon.style.margin = "0 5px";
                    newSaveIcon.style.display = "none";
                    newSaveIcon.style.cursor = "pointer";
                    newTrashIcon.style.cursor = "pointer";
                    newEditIcon.style.cursor = "pointer";
                    newSpan.innerText = value_instruction.value;
                    if (!value_instruction.value) {
                        alert("Wpisz jakąś instrukcję :)");
                    } else {
                        let newLi = document.createElement("li");
                        newLi.appendChild(newSpan);
                        newLi.appendChild(newEditIcon);
                        newLi.appendChild(newSaveIcon);
                        newLi.appendChild(newTrashIcon);
                        value_instruction.value = "";
                        instruction_list.appendChild(newLi);
                    }
                    newTrashIcon.addEventListener("click", function () {
                        this.parentElement.style.display = "none";
                    });
                    newEditIcon.addEventListener("click", function () {
                        this.previousSibling.contentEditable = "true";
                        newEditIcon.style.display = "none";
                        newSaveIcon.style.display = "inline";
                    });
                    newSaveIcon.addEventListener("click", function () {
                        this.previousSibling.previousSibling.contentEditable = "false";
                        newSaveIcon.style.display = "none";
                        newEditIcon.style.display = "inline";
                    });
                });
            });

            e.ingredients.forEach(function (e) {
                let newSaveIcon = document.createElement("i");
                let newSpan = document.createElement("span");
                let newEditIcon = document.createElement("i");
                let newTrashIcon = document.createElement("i");
                newTrashIcon.className = "fas fa-trash-alt";
                newTrashIcon.style.color = "red";
                newEditIcon.className = "fas fa-edit";
                newEditIcon.style.color = "gold";
                newEditIcon.style.margin = "0 5px";
                newSaveIcon.className = "fas fa-save";
                newSaveIcon.style.color = "blue";
                newSaveIcon.style.margin = "0 5px";
                newSaveIcon.style.display = "none";
                newSaveIcon.style.cursor = "pointer";
                newTrashIcon.style.cursor = "pointer";
                newEditIcon.style.cursor = "pointer";
                let newLi = document.createElement("li");
                newLi.innerText = e;
                newLi.appendChild(newSpan);
                newLi.appendChild(newEditIcon);
                newLi.appendChild(newSaveIcon);
                newLi.appendChild(newTrashIcon);
                ingredientList.appendChild(newLi);
                newTrashIcon.addEventListener("click", function () {
                    this.parentElement.style.display = "none";
                });
                newEditIcon.addEventListener("click", function () {
                    this.previousSibling.parentElement.contentEditable = "true";
                    newEditIcon.style.display = "none";
                    newSaveIcon.style.display = "inline";
                });
                newSaveIcon.addEventListener("click", function () {
                    this.previousSibling.previousSibling.parentElement.contentEditable =
                        "false";
                    newSaveIcon.style.display = "none";
                    newEditIcon.style.display = "inline";
                });
                ingredient_butt.addEventListener("click", function () {
                    let value_ingredient = document.getElementById("value_ingredient");
                    let newSpan = document.createElement("span");
                    let newSaveIcon = document.createElement("i");
                    let newEditIcon = document.createElement("i");
                    let newTrashIcon = document.createElement("i");
                    newTrashIcon.className = "fas fa-trash-alt";
                    newTrashIcon.style.color = "red";
                    newEditIcon.className = "fas fa-edit";
                    newEditIcon.style.color = "gold";
                    newEditIcon.style.margin = "0 5px";
                    newSaveIcon.className = "fas fa-save";
                    newSaveIcon.style.color = "blue";
                    newSaveIcon.style.margin = "0 5px";
                    newSaveIcon.style.display = "none";
                    newSaveIcon.style.cursor = "pointer";
                    newTrashIcon.style.cursor = "pointer";
                    newEditIcon.style.cursor = "pointer";
                    newSpan.innerText = value_ingredient.value;
                    if (!value_ingredient.value) {
                        alert("Wpisz jakiś składnik :)");
                    } else {
                        let newLi = document.createElement("li");
                        newLi.appendChild(newSpan);
                        newLi.appendChild(newEditIcon);
                        newLi.appendChild(newSaveIcon);
                        newLi.appendChild(newTrashIcon);
                        value_ingredient.value = "";
                        ingredient_list.appendChild(newLi);
                    }
                    newTrashIcon.addEventListener("click", function () {
                        this.parentElement.style.display = "none";
                    });
                    newEditIcon.addEventListener("click", function () {
                        this.previousSibling.contentEditable = "true";
                        newEditIcon.style.display = "none";
                        newSaveIcon.style.display = "inline";
                    });
                    newSaveIcon.addEventListener("click", function () {
                        this.previousSibling.previousSibling.contentEditable = "false";
                        newSaveIcon.style.display = "none";
                        newEditIcon.style.display = "inline";
                    });
                });
            });
            saveAndClose.addEventListener("click", function () {
                updatedRecipeName = sectionRecipeNameInput.value;
                updatedRecipeDsc = sectionRecipeDscTextarea.value;
                updatedInstructionElements = document.querySelectorAll(
                    "#instruction_list li"
                );
                updatedIngredientsElements = document.querySelectorAll(
                    "#ingredient_list li"
                );
                let updatedInstructionsList = [];
                let updatedIngredientsList = [];
                updatedInstructionElements.forEach(function (e) {
                    updatedInstructionsList.push(e.innerText);
                });
                updatedIngredientsElements.forEach(function (e) {
                    updatedIngredientsList.push(e.innerText);
                });
                let currentRecipeValue = localStorage.getItem("recipe_");
                currentRecipeValue = JSON.parse(currentRecipeValue);
                currentRecipeValue[e.id - 1].title = updatedRecipeName;
                currentRecipeValue[e.id - 1].description = updatedRecipeDsc;
                currentRecipeValue[e.id - 1].instructions = updatedInstructionsList;
                currentRecipeValue[e.id - 1].ingredients = updatedIngredientsList;
                localStorage.setItem(
                    "recipe_",
                    JSON.stringify(currentRecipeValue).toString()
                );
                window.location.reload(false);
                location.href = "./recipes.html";
            });
        });
    });
}