import {parseISO, startOfToday} from 'date-fns'
import { clearForm } from './dom-manip';
import { saveToDoToLocal } from './manage-local-storage';

let toDoArray = [];

export const createToDo = () => {
    let Title = document.getElementById("Title").value;
    let Description = document.getElementById("Description").value;
    let DueDate = document.getElementById("DueDate").value;
    let Priority = document.getElementById("Priority").value;

    if (Title == "" || Description == "" || DueDate == ""){
        alert("The Title, Desctiption and Due Date are required fields");
        return;
    }

    if (parseISO(DueDate) < startOfToday()){
        alert("This date is already passed!");
        console.log("Due Date: ", DueDate);
        console.log("Current Date: ", startOfToday());
        return;
    }

    const nodeListCheckList = document.querySelectorAll("li");
    let CheckListArray = [];
    for (let i = 0; i < nodeListCheckList.length; i++){
        let strippedCheckList = nodeListCheckList[i].textContent.replace("\u00D7", '');
        CheckListArray.push(strippedCheckList);
    }

    let CheckList = CheckListArray.join(", ");

    console.log("called createToDo module, creating todo now");
    console.log({Title, Description, DueDate, Priority, CheckList});
    console.log("pushed the data in the array");
    toDoArray.push({Title, Description, DueDate, Priority, CheckList});
    console.log(toDoArray);

    saveToDoToLocal({Title, Description, DueDate, Priority}, CheckList);

    clearForm();
    return {Title, Description, DueDate, Priority, CheckList};
}