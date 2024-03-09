import { blankProjectLoad } from "./blank-project-load";

export function DisplayDefaultProject(){
    const projectInfo = document.createElement("div");
    projectInfo.textContent = blankProjectLoad().projectName;
    contentDiv.appendChild(projectInfo);
}

export function displayTheForm(){
    document.getElementById("add-todo-form").style.display = "";
}

export function addItemToCheckList(){
    const addItem = document.getElementById("add-to-checklist").value;

    if(addItem != ""){
        const ul = document.querySelector(".todo-ul");
        const li = document.createElement("li");
        li.textContent = addItem;
        const span = document.createElement("span");
        span.className = "Remove-checklist-item";
        const removeIcon = document.createTextNode("\u00D7");
        li.appendChild(span);
        span.appendChild(removeIcon);
        ul.appendChild(li);
        document.getElementById("add-to-checklist").value = ""

        if (document.querySelectorAll("li").length > 0){
            console.log("Inside module if....", document.querySelectorAll("li").length);
            const nodeListCheckList = document.querySelectorAll("li");
            console.log(nodeListCheckList);

            nodeListCheckList.forEach(checkListItem => {
                checkListItem.addEventListener("click", function removeItemFromCheckList() {
                    checkListItem.remove();
                })
            })
        }
    } else return;
}

export function clearForm(){
    const nodeListCheckList = document.querySelectorAll("li");
    for (let i = 0; i < nodeListCheckList.length; i++){
        nodeListCheckList[i].remove();
    }
    document.getElementById("add-todo").reset();
}

export function displayToDo(){
    let Title = localStorage.getItem("Title");
    let Description = localStorage.getItem("Description");
    let DueDate = localStorage.getItem("DueDate");
    let Priority = localStorage.getItem("Priority");
    let CheckList = localStorage.getItem("CheckList");

    if(Title == null || Description == null || DueDate == null || Priority == null || CheckList == null){
        return;
    }

    const removeDivs = document.querySelectorAll(".card");
    for(let i = 0; i < removeDivs.length; i++){
        removeDivs[i].remove();
    }

    const projects = document.querySelector(".right-side");
    const card = document.createElement("div");
    card.classList.add("card");
    projects.appendChild(card);

    const deleteToDoButton = document.createElement("button");
    deleteToDoButton.classList.add("remove-todo-button");
    deleteToDoButton.textContent = "Delete/Complete ToDo";
    card.appendChild(deleteToDoButton);
    deleteToDoButton.addEventListener("click", function deleteToDo() {
        card.remove();
        localStorage.clear();
    })

    let displayArray = {Title, Description, DueDate, Priority}

    for (let key in displayArray){
        const para = document.createElement("p");
        para.textContent = (`${key}: ${displayArray[key]}`);
        card.appendChild(para);
    }

    const para = document.querySelectorAll("p");
    const CheckListLabel = document.createElement("p");
    CheckListLabel.textContent = "CheckList Items (Click item when completed):";
    const ul = document.createElement("ul");
    CheckListLabel.classList.add("check-list-label");
    para[para.length - 1].appendChild(ul);
    ul.appendChild(CheckListLabel);

    let CheckListArray = CheckList.split(",");

    if (CheckListArray !== ""){
        for (let i = 0; i < CheckListArray.length; i++){
            const li = document.createElement("li");
            li.className = "display-li";
            li.textContent = CheckListArray[i];

            li.addEventListener("click", function strikeOutCheckListItem () {
                if (li.classList.toggle("done")){
                    localStorage.setItem(li.textContent, "true");
                } else if(li.classList.toggle("display-li")){
                    localStorage.setItem(li.textContent, "false");
                }
            });
            ul.appendChild(li);
       }
    }else return;

    window.onload = function(){
        const liNodes = document.querySelectorAll(".display-li");
        liNodes.forEach(liNode => {
            if(localStorage.getItem(liNode.textContent) == "true"){
                liNode.className = "done";
            }
        })
    }
}