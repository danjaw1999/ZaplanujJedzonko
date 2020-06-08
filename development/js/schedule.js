//Name localstorage
const user = document.querySelector(".user-name");

if (localStorage.savedName == null) {
    user.innerText = "Imię";
} else {
    user.innerText = localStorage.savedName;
}

let editContainer = document.querySelector('.edit-schedule-container');
let mainContainer = document.querySelector('.schedule-list');

editContainer.style.display = 'none';


// Add schedule
const buttonAddSchedule = document.querySelector(".button-add-schedule");

buttonAddSchedule.addEventListener("click", function (e) {
    if (localStorage.savedName == null) {
        alert("Najpierw podaj swoję imię");
    } else {
        localStorage.setItem("addSchedule", "dodaj plan");
        location.href = "./app.html";
    }
});


//Schedules list localstorage
const tBodySchedule = document.querySelector(".schedule-table-tbody");

let sorted = Object.entries(localStorage).filter(elem => {
    return elem[0].substring(0, 4) == "plan"
}).sort((a, b) => {
    return parseInt(a[0].substring(5, 10)) - parseInt(b[0].substring(5, 10))
});

if (sorted.length == 0) {
    let h2 = document.createElement("h2");
    h2.innerText = "Twoja lista planów jest pusta :(";
    tBodySchedule.appendChild(h2);
    tBodySchedule.style.display = "flex";
    tBodySchedule.style.alignItems = "center";
    tBodySchedule.style.justifyContent = "center";
} else {
    sorted.forEach(e => {
        const scheduleListLocalStorage = JSON.parse(e[1]);
        const trSchedule = document.createElement("tr");
        const tdScheduleId = document.createElement("td");
        const tdScheduleName = document.createElement("td");
        const tdScheduleDes = document.createElement("td");
        const tdScheduleWeek = document.createElement("td");
        const tdScheduleIco = document.createElement("td");
        const editBtn = document.createElement("i");
        const deleteBtn = document.createElement("i");

        editBtn.className = "fas fa-edit";
        deleteBtn.className = "fas fa-trash-alt";

        trSchedule.appendChild(tdScheduleId);
        trSchedule.appendChild(tdScheduleName);
        trSchedule.appendChild(tdScheduleDes);
        trSchedule.appendChild(tdScheduleWeek);
        trSchedule.appendChild(tdScheduleIco);

        tdScheduleId.innerText = scheduleListLocalStorage.id;
        tdScheduleName.innerText = scheduleListLocalStorage.title;
        tdScheduleDes.innerText = scheduleListLocalStorage.description;
        tdScheduleWeek.innerText = scheduleListLocalStorage.weekNumber;
        tdScheduleIco.appendChild(editBtn);
        tdScheduleIco.appendChild(deleteBtn);
        tBodySchedule.appendChild(trSchedule);

        deleteBtn.addEventListener("click", () => {
            localStorage.removeItem(e[0]);
            window.location.reload(false);
        })
    })
}

let editButtons = document.querySelectorAll('.fa-edit');
editButtons.forEach(function (element) {
    element.addEventListener('click', function () {
        let counter = [].indexOf.call(editButtons, element);
        mainContainer.style.display = 'none';
        editContainer.style.display = 'flex';
        editContainer.style.flexDirection = 'column';
        let currentSchedule = JSON.parse(sorted[counter][1]);
        let inputName = document.querySelector('.name-new-schedule input');
        let inputDsc = document.querySelector('.dsc-new-schedule textarea');
        let inputNr = document.querySelector('.nr-new-schedule input');
        inputName.value = currentSchedule.title;
        inputDsc.value = currentSchedule.description;
        inputNr.value = currentSchedule.weekNumber;

        let meal = document.querySelectorAll(".meal");
        let recipesLocalStoragePlans = localStorage.getItem("recipe_");
        let recipesListLocalStoragePlans = JSON.parse(recipesLocalStoragePlans)

        if (localStorage.recipe_ == null || localStorage.recipe_ == "[]") {
            meal.forEach(e => {
                let optionMeal = document.createElement("option");
                optionMeal.setAttribute("hidden", "");
                optionMeal.value = "null";
                optionMeal.innerText = "Brak przepisów";
                e.appendChild(optionMeal);
            })
        } else {
            meal.forEach(e => {
                recipesListLocalStoragePlans.forEach(el => {
                    let optionMeal = document.createElement("option");
                    optionMeal.value = el.title;
                    optionMeal.innerText = el.title;
                    e.appendChild(optionMeal);
                });

            });
        }

        let monday = document.querySelectorAll('.monday td select');
        let tuesday = document.querySelectorAll('.tuesday td select');
        let wednesday = document.querySelectorAll('.wednesday td select');
        let thursday = document.querySelectorAll('.thursday td select');
        let friday = document.querySelectorAll('.friday td select');
        let saturday = document.querySelectorAll('.saturday td select');
        let sunday = document.querySelectorAll('.sunday td select');

        monday.forEach(function (element, index) {
            element.value = currentSchedule.monday[index];
        });
        tuesday.forEach(function (element, index) {
            element.value = currentSchedule.tuesday[index];
        });
        wednesday.forEach(function (element, index) {
            element.value = currentSchedule.wednesday[index];
        });
        thursday.forEach(function (element, index) {
            element.value = currentSchedule.thursday[index];
        });
        friday.forEach(function (element, index) {
            element.value = currentSchedule.friday[index];
        });
        saturday.forEach(function (element, index) {
            element.value = currentSchedule.saturday[index];
        });
        sunday.forEach(function (element, index) {
            element.value = currentSchedule.sunday[index];
        });


        let saveAndClose = document.querySelector('.title-new-schedule a');
        saveAndClose.addEventListener('click', function () {
            if (inputDsc.value.length == 0 || inputName.value.length == 0 || inputNr.value.length == 0) {
                alert("Wypełnij wszystkie pola :)");
            } else {
                currentSchedule.title = inputName.value;
                currentSchedule.weekNumber = inputNr.value;
                currentSchedule.description = inputDsc.value;

                currentSchedule.monday = [];
                currentSchedule.tuesday = [];
                currentSchedule.wednesday = [];
                currentSchedule.thursday = [];
                currentSchedule.friday = [];
                currentSchedule.saturday = [];
                currentSchedule.sunday = [];

                monday.forEach(function (element) {
                    currentSchedule.monday.push(element.value);
                });
                tuesday.forEach(function (element) {
                    currentSchedule.tuesday.push(element.value);
                });
                wednesday.forEach(function (element) {
                    currentSchedule.wednesday.push(element.value);
                });
                thursday.forEach(function (element) {
                    currentSchedule.thursday.push(element.value);
                });
                friday.forEach(function (element) {
                    currentSchedule.friday.push(element.value);
                });
                saturday.forEach(function (element) {
                    currentSchedule.saturday.push(element.value);
                });
                sunday.forEach(function (element) {
                    currentSchedule.sunday.push(element.value);
                });

                localStorage.setItem(sorted[counter][0], JSON.stringify(currentSchedule));

                window.location.reload(false);
                location.href = "./schedules.html";
            }
        }
        )

    })
});


