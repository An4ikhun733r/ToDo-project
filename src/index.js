import { blankProjectLoad } from "./blank-project-load";
import { displayTheForm, addItemToCheckList, clearForm, displayToDo } from "./dom-manip";
import { createToDo } from "./create-to-do";

blankProjectLoad();

displayToDo();

let clickEventsModule = (function() {
    const addNewToDo = document.querySelector(".add-todo-button");
    addNewToDo.addEventListener("click", displayTheForm);

    const addToCheckList = document.querySelector(".add-to-checklist");
    addToCheckList.addEventListener("click", addItemToCheckList);

    const clearButton = document.querySelector(".reset-button");
    clearButton.addEventListener("click", clearForm);

    const submitButton = document.querySelector(".submit-button");
    submitButton.addEventListener("click", createToDo)
})();


