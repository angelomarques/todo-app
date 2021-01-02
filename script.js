//elements needed to save a task description
const descArea = document.querySelector(".desc-container");
const descBtn = document.querySelector(".desc-btn");
const saveDesc = document.querySelector(".desc-container .save-btn");
const textareaDesc = document.querySelector(".desc-container textarea");

//variable that save the value of the description
let descText = "";

let showDescBtn = document.querySelectorAll(".card .show-desc-btn");
let descBox = document.querySelectorAll(".card .desc-box");
let descBtnImg = document.querySelectorAll(".show-desc-btn img");

//div elements(uncompleted-tasks and completed-tasks):
const uncTasks = document.querySelector(".uncompleted-tasks");
const comTasks = document.querySelector(".completed-tasks");

//event listeners for save a task description
descBtn.addEventListener("click", () => {
  descArea.style.opacity = "1";
  descArea.style.pointerEvents = "all";
  descBtn.style.display = "none";
  descArea.style.transform = "translateY(0%)";
});

saveDesc.addEventListener("click", () => {
  descBtn.style.display = "";
  descArea.style.transform = "translateY(-150%)";
  descArea.style.opacity = "0";
  descArea.style.pointerEvents = "none";
  descText = textareaDesc.value;
  textareaDesc.value = "";
});

//elements and function that add a new task
let card = document.querySelectorAll(".card");
const cardsContainer = document.querySelector(".cards-container");
const addBtn = document.querySelector(".add-btn");

//add task funcion:
const addTask = () => {
  //if this 'if' statement is false, so he will create the task
  if (document.querySelector(".task-area input").value == "") {
    alert("the task doesn't have a title");
  } else {
    //creating the divs: .card, .card-content and .card-btns and positioning in your respective places
    let newCard = document.createElement("div");
    let newCardContent = document.createElement("div");
    let newCardBtns = document.createElement("div");
    newCard.setAttribute("class", "card");
    newCardContent.setAttribute("class", "card-content");
    newCardBtns.setAttribute("class", "card-btns");
    newCard.appendChild(newCardContent);
    newCard.appendChild(newCardBtns);
    uncTasks.appendChild(newCard);

    //creating the p element that is the task's title
    let titleValue = document.querySelector("#title-inp").value;
    let titleNode = document.createTextNode(titleValue);
    let pTitle = document.createElement("p");
    pTitle.setAttribute("class", "card-title");
    pTitle.appendChild(titleNode);
    newCardContent.appendChild(pTitle);

    //creating the check button
    let newCheckBtn = document.createElement("button");
    newCheckBtn.setAttribute("class", "check-btn");
    let checkImg = document.createElement("img");
    checkImg.setAttribute("src", "./images/check-icon.svg");
    newCheckBtn.appendChild(checkImg);
    newCardBtns.appendChild(newCheckBtn);

    //creating the trash button
    let newTrashBtn = document.createElement("button");
    newTrashBtn.setAttribute("class", "trash-btn");
    let trashImg = document.createElement("img");
    trashImg.setAttribute("src", "./images/trash-icon.svg");
    newTrashBtn.appendChild(trashImg);
    newCardBtns.appendChild(newTrashBtn);

    //checking if the task has a description
    if (descText == "") {
      pTitle.style.gridArea = "1/1/2/10";
      pTitle.style.borderRadius = "15px";
    } else {
      //creating the button that shows the task's description
      let newShowBtn = document.createElement("button");
      newShowBtn.setAttribute("class", "show-desc-btn");
      newShowBtn.setAttribute("onclick", "showDescFunc(this)");
      let imgShowBtn = document.createElement("img");
      imgShowBtn.setAttribute("src", "./images/arrow-icon.svg");
      newShowBtn.appendChild(imgShowBtn);
      newCardContent.appendChild(newShowBtn);

      //creating the description box and your p element
      let newDescBox = document.createElement("div");
      newDescBox.setAttribute("class", "desc-box");
      newCardContent.appendChild(newDescBox);

      let pDesc = document.createElement("p");
      let descNodeText = document.createTextNode(descText);
      pDesc.appendChild(descNodeText);
      newDescBox.appendChild(pDesc);
    }

    //restarting the input values and the textarea value:
    descText = "";
    document.querySelector("#title-inp").value = "";

    showDescBtn = document.querySelectorAll(".card .show-desc-btn");
    descBox = document.querySelectorAll(".card .desc-box");
    descBtnImg = document.querySelectorAll(".show-desc-btn img");
    card = document.querySelectorAll(".card");

    //element and event listener for remove a task
    const trashBtn = document.querySelectorAll(".card-btns .trash-btn");

    trashBtn.forEach((elem, index) => {
      elem.addEventListener("click", () => {
        card.forEach((child, indChild) => {
          if (indChild == index) {
            child.style.transform = "rotate(90deg)";
            child.style.opacity = "0.3";
            setTimeout(() => {
              child.remove();
            }, 150);
          }
        });
      });
    });
    //element and event listener for complete a task
    const checkBtn = document.querySelectorAll(".card-btns .check-btn");

    checkBtn.forEach((elem, index) => {
      elem.addEventListener("click", () => {
        let titleTask = document.querySelectorAll(".card-title")[index];
        let titleSplited = titleTask.innerHTML.split("");
        let counter = 1;
        let strokingAnim = setInterval(() => {
          titleTask.innerHTML =
            "<s>" +
            titleSplited.slice(0, counter).join("") +
            "</s>" +
            titleSplited.slice(counter, titleSplited.length).join("");
          counter++;
          if (counter == titleSplited.length + 1) {
            clearInterval(strokingAnim);
            setTimeout(() => {
              document
                .querySelector(".completed-tasks")
                .appendChild(card[index]);
              card[index].style.transform = "";
              card[index].style.opacity = "1";
            }, 300);
          }
        }, 20);

        card[index].style.transform = "translate(100%)";
        card[index].style.opacity = "0";
        checkBtn[index].remove()
      });
    });
  }
};

//Event listeners for add a task
addBtn.addEventListener("click", addTask);
document.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    addTask();
  }
});

//Function for show the task's description
let showDescFunc = (elem) => {
  let showDescBtnArr = Array.prototype.slice.call(showDescBtn);
  let descIndex = showDescBtnArr.indexOf(elem);
  if (
    descBox[descIndex].style.opacity == "" ||
    descBox[descIndex].style.opacity == "0"
  ) {
    descBox[descIndex].style.opacity = "1";
    descBox[descIndex].style.pointerEvents = "all";
    descBox[descIndex].style.transform = "translateY(10%)";
    card[descIndex].style.height = "120px";
    descBtnImg[descIndex].style.transform = "rotate(180deg)";
  } else {
    descBox[descIndex].style.opacity = "0";
    descBox[descIndex].style.pointerEvents = "none";
    descBox[descIndex].style.transform = "translateY(-100%)";
    card[descIndex].style.height = "70px";
    descBtnImg[descIndex].style.transform = "rotate(0deg)";
  }
};

//select element configurations
const diplaySelec = document.querySelector("#display-selec");

diplaySelec.addEventListener("change", () => {
  if (diplaySelec.value == "all-types") {
    comTasks.style.display = "flex";
    uncTasks.style.display = "flex";
  }
  if (diplaySelec.value == "completed") {
    uncTasks.style.display = "none";
    comTasks.style.display = "flex";
  }
  if (diplaySelec.value == "uncompleted") {
    comTasks.style.display = "none";
    uncTasks.style.display = "flex";
  }
});