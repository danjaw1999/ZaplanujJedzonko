// Name localstorage
const nameInput = document.querySelector(".name-local-storage > input");
const nameBtn = document.querySelector(".name-local-storage > button");
const user = document.querySelector(".user-name");
const appFirstTime = document.querySelector(".app-first-time");
const appDesktop = document.querySelector(".app-desktop");
const mainApp = document.querySelector(".main-app-section-content");
const tableAppSection = document.querySelector(".table-app-section");
const newScheduleContainer = document.querySelector(".new-schedule-container");
const buttonAddRecipe = document.querySelector(".button-add-recipe");
const buttonAddSchedule = document.querySelector(".button-add-schedule");
const newRecipeSection = document.querySelector(".new-recipe-section");
var allRecipes = [];
newScheduleContainer.style.display = 'none';
newRecipeSection.style.display = 'none';

nameBtn.addEventListener("click", function (e) {
  let name = nameInput.value;
  if (name.trim() && !Number(name) && name.length > 1) {
    let userName = name;
    localStorage.setItem("savedName", userName);
  } else {
    alert("Podaj poprawnie swoję imię :)");
  }
});

if (localStorage.savedName == null) {
  user.innerText = "Imię";
  appFirstTime.style.display = "flex";
  appDesktop.style.display = "none";
  mainApp.style.border = "1px dashed $light-grey-color";
  mainApp.style.backgroundColor = "$white-color";
  mainApp.style.alignItems = "center";
  tableAppSection.style.display = "none";
} else {
  user.innerText = localStorage.savedName;
  appFirstTime.style.display = "none";
  appDesktop.style.display = "flex";
  mainApp.style.border = "none";
  mainApp.style.background = "none";
  mainApp.style.alignItems = "flex-start";
}

newScheduleContainer.style.display = "none";
newRecipeSection.style.display = "none";

nameBtn.addEventListener("click", function (e) {
  let name = nameInput.value;
  if (name.trim() && !Number(name) && name.length > 1) {
    let userName = name;
    localStorage.setItem("savedName", userName);
  } else {
    alert("Podaj poprawnie swoję imię :)");
  }
});




// Add recipe button / recipes.html
if (localStorage.addRecipe != null) {
  mainApp.style.display = "none";
  tableAppSection.style.display = "none";
  newRecipeSection.style.display = "flex";
  newRecipeSection.style.flexDirection = "column";
  let deleteTimeR = setTimeout(() => {
    localStorage.removeItem("addRecipe");
  }, 500);
}

// Add recipe button / schedules.html
if (localStorage.addSchedule != null) {
  mainApp.style.display = "none";
  tableAppSection.style.display = "none";
  newScheduleContainer.style.display = "flex";
  newScheduleContainer.style.flexDirection = "column";
  let deleteTimeS = setTimeout(() => {
    localStorage.removeItem("addSchedule");
  }, 500);
}

// Add recipe button
buttonAddRecipe.addEventListener("click", function (e) {
  mainApp.style.display = "none";
  tableAppSection.style.display = "none";
  newRecipeSection.style.display = "flex";
  newRecipeSection.style.flexDirection = "column";
});

// Add schedule button
buttonAddSchedule.addEventListener("click", function (e) {
  mainApp.style.display = "none";
  tableAppSection.style.display = "none";
  newScheduleContainer.style.display = "flex";
  newScheduleContainer.style.flexDirection = "column";
});




// Schedule add / displaying recipes
const meal = document.querySelectorAll(".meal");
const recipesLocalStoragePlans = localStorage.getItem("recipe_");
const recipesListLocalStoragePlans = JSON.parse(recipesLocalStoragePlans);

if (localStorage.recipe_ == null || localStorage.recipe_ == "[]") {
  meal.forEach(e => {
    let optionMeal = document.createElement("option");
    optionMeal.setAttribute("hidden", "");
    optionMeal.value = "null";
    optionMeal.innerText = "Brak przepisów";
    e.appendChild(optionMeal);
  })
}
else {
  meal.forEach(e => {
    recipesListLocalStoragePlans.forEach(el => {
      let optionMeal = document.createElement("option");
      optionMeal.value = el.title;
      optionMeal.innerText = el.title;
      e.appendChild(optionMeal);
    });

  });
}




// Schedule add
function Schedule(id, weekNumber, title, description) {
  this.id = id; // id przepisu
  this.title = title; // nazwa planu
  this.description = description; // opis planu
  this.weekNumber = weekNumber; // numer tygodnia do którego przypisany jest plan
  this.monday = []; // plan na poniedzialek
  this.tuesday = []; // plan na wtorek
  this.wednesday = []; // plan na środę
  this.thursday = []; // plan na czwartek
  this.friday = []; // plan na piątek
  this.saturday = []; // plan na sobotę
  this.sunday = []; // plan na niedzielę
}

const dashboardMonday = document.querySelectorAll('.schedules tr td:nth-of-type(1)');
const dashboardTuesday = document.querySelectorAll('.schedules tr td:nth-of-type(2)');
const dashboardWednesday = document.querySelectorAll('.schedules tr td:nth-of-type(3)');
const dashboardThursday = document.querySelectorAll('.schedules tr td:nth-of-type(4)');
const dashboardFriday = document.querySelectorAll('.schedules tr td:nth-of-type(5)');
const dashboardSaturday = document.querySelectorAll('.schedules tr td:nth-of-type(6)');
const dashboardSunday = document.querySelectorAll('.schedules tr td:nth-of-type(7)');

const scheduleLeft = document.querySelector(".schedule-click-left");
const scheduleRight = document.querySelector(".schedule-click-right");
const tableTitle = document.querySelector('.schedule-view h3');

let sorted = Object.entries(localStorage).filter(elem => {
  return elem[0].substring(0, 4) == "plan"
}).sort((a, b) => {
  return parseInt(a[0].substring(5, 10)) - parseInt(b[0].substring(5, 10))
});

let plan;
let page = 0;

if (sorted.length == 0) {
  tableTitle.innerText = "Brak planów";
}
else {
  function update_dashboard_table(plan) {
    dashboardMonday.forEach(function (element, index) {
      element.innerText = plan.monday[index]
    });
    dashboardTuesday.forEach(function (element, index) {
      element.innerText = plan.tuesday[index];
    });
    dashboardWednesday.forEach(function (element, index) {
      element.innerText = plan.wednesday[index];
    });
    dashboardThursday.forEach(function (element, index) {
      element.innerText = plan.thursday[index];
    });
    dashboardFriday.forEach(function (element, index) {
      element.innerText = plan.friday[index];
    });
    dashboardSaturday.forEach(function (element, index) {
      element.innerText = plan.saturday[index];
    });
    dashboardSunday.forEach(function (element, index) {
      element.innerText = plan.sunday[index];
    });
    tableTitle.innerText = `Twój plan na ${plan.weekNumber} tydzień:`
  }
}


window.addEventListener('load', function () {
  plan = JSON.parse(sorted[0][1]);
  update_dashboard_table(plan);
});

scheduleRight.addEventListener('click', function () {
  page += 1;
  if (page < sorted.length) {
    plan = JSON.parse(sorted[page][1]);
    update_dashboard_table(plan);
  }
});

scheduleLeft.addEventListener('click', function () {
  page -= 1;
  if (page >= 0) {
    plan = JSON.parse(sorted[page][1]);
    update_dashboard_table(plan);
  }
});

const saveButton = document.querySelector('.title-new-schedule a');

saveButton.addEventListener('click', function () {
  const planNumber = parseInt(document.querySelector('.nr-new-schedule input').value);
  const planDesc = document.querySelector('.dsc-new-schedule textarea').value;
  const planName = document.querySelector('.name-new-schedule input').value;

  if (planDesc.length <= 0) {
    alert("Wypełnij wszystkie pola :)");
  }
  else if (localStorage.recipe_ == null || localStorage.recipe_ == "[]") {
    alert("Najpierw dodaj przepisy, a potem planuj ;)");
  }
  else {
    let newPlan = new Schedule(
      Object.entries(localStorage).filter(elem => {
        return elem[0].substring(0, 4) == "plan"
      }).length + 1,
      planNumber,
      planName,
      planDesc
    );
    const monday = document.querySelectorAll('.monday td select');
    const tuesday = document.querySelectorAll('.tuesday td select');
    const wednesday = document.querySelectorAll('.wednesday td select');
    const thursday = document.querySelectorAll('.thursday td select');
    const friday = document.querySelectorAll('.friday td select');
    const saturday = document.querySelectorAll('.saturday td select');
    const sunday = document.querySelectorAll('.sunday td select');

    monday.forEach(function (element) {
      newPlan.monday.push(element.options[element.selectedIndex].value);
    });
    tuesday.forEach(function (element) {
      newPlan.tuesday.push(element.options[element.selectedIndex].value);
    });
    wednesday.forEach(function (element) {
      newPlan.wednesday.push(element.options[element.selectedIndex].value);
    });
    thursday.forEach(function (element) {
      newPlan.thursday.push(element.options[element.selectedIndex].value);
    });
    friday.forEach(function (element) {
      newPlan.friday.push(element.options[element.selectedIndex].value);
    });
    saturday.forEach(function (element) {
      newPlan.saturday.push(element.options[element.selectedIndex].value);
    });
    sunday.forEach(function (element) {
      newPlan.sunday.push(element.options[element.selectedIndex].value);
    });
    localStorage.setItem('plan_' + newPlan.id, JSON.stringify(newPlan));
    location.href = "./app.html";
  }
});




// Add recipe
let recipe_name = document.querySelector("#recipe_name");
let recipe_desc = document.querySelector("#recipe_desc");
let instruction_butt = document.querySelector("#instruction_butt");
let ingredient_butt = document.querySelector("#ingredient_butt");
let instruction_list = document.getElementById("instruction_list");
let ingredient_list = document.getElementById("ingredient_list");
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

function Recipe(id, title, description) {
  this.id = id; // id przepisu
  this.title = title; // nazwa przepisu
  this.description = description; // opis przepisu
  this.ingredients = []; // składniki przepisu
  this.instructions = []; // instrukcje przepisu
}

const recipesCounterList = document.querySelector(".recipes-counter-list");
const recipesLocalStorage = localStorage.getItem("recipe_");
const recipesListLocalStorage = JSON.parse(recipesLocalStorage);

let recipesIdList = 0;

if (localStorage.recipe_ == null) {
  recipesIdList = 0;
  recipesCounterList.innerText = 0;
} else {
  recipesIdList = recipesListLocalStorage.length;
  recipesCounterList.innerText = recipesListLocalStorage.length;
}

function addRecipe(e) {
  e.preventDefault();
  if (recipe_name.value.length <= 0 || recipe_desc.value.length <= 0 || ingredient_list.childElementCount <= 0 || instruction_list.childElementCount <= 0) {
    alert("Wypełnij wszystkie pola lub dodaj instrukcje i składniki :)");
  }
  else {
    let newRecipe = new Recipe(
      recipesIdList + 1,
      recipe_name.value,
      recipe_desc.value
    );
    let allInstructions = instruction_list.querySelectorAll("li");
    let allIngredients = ingredient_list.querySelectorAll("li");
    allInstructions.forEach(function (element) {
      newRecipe.instructions.push(element.innerText);
    });
    allIngredients.forEach(function (element) {
      newRecipe.ingredients.push(element.innerText);
    });
    allRecipes.push(newRecipe);
    recipe_name.value = "";
    recipe_desc.value = "";
    addRecipesToLocalStorage(newRecipe);
    allInstructions.forEach(function (element) {
      instruction_list.removeChild(element);
    });
    allIngredients.forEach(function (element) {
      ingredient_list.removeChild(element);
    });
  }
}
save.addEventListener("click", addRecipe);
function addRecipesToLocalStorage(newRecipe) {
  var dataFromLocalStorage = [];
  if (localStorage.getItem("recipe_") != null) {
    dataFromLocalStorage = JSON.parse(localStorage.getItem("recipe_"));
    dataFromLocalStorage.push(newRecipe);
    localStorage.setItem("recipe_", JSON.stringify(dataFromLocalStorage));
  } else {
    dataFromLocalStorage.push(newRecipe);
    localStorage.setItem("recipe_", JSON.stringify(dataFromLocalStorage));
  }
  location.href = "./app.html";
}




// Widgets
let deleteWidget = document.querySelectorAll(".delete-widgets");
let noficationYellow = document.querySelector(".yellow-noficat");
let noficationBlue = document.querySelector(".blue-noficat > p > span");

// OPCJA //////////////////////////////
if (sorted.length > 0) {
  noficationYellow.style.display = "none";
}
// OPCJA //////////////////////////////

for (let i = 0; i < deleteWidget.length; i++) {
  deleteWidget[i].addEventListener("click", () => {
    deleteWidget[i].parentElement.style.display = "none";
  });
}

if (recipesListLocalStorage == null || recipesListLocalStorage == "[]") {
  recipesCounterList.innerText = "0 przepisów";
} else if (recipesListLocalStorage.length == 1) {
  recipesCounterList.innerText = recipesListLocalStorage.length + " przepis";
} else if (
  recipesListLocalStorage.length >= 2 &&
  recipesListLocalStorage.length <= 4
) {
  recipesCounterList.innerText = recipesListLocalStorage.length + " przepisy";
} else {
  recipesCounterList.innerText = recipesListLocalStorage.length + " przepisów";
}