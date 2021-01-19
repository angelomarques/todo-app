import db from "./firebase.js";
import { auth } from "./firebase.js";

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
});

//elements that add a new task
let card = document.querySelectorAll(".card");
const cardsContainer = document.querySelector(".cards-container");
const addBtn = document.querySelector(".add-btn");

//adding tasks in DATABASE
const addForm = document.getElementById("add-form");
const date = new Date();
const time = date.getTime();
let counter = time;
let docId;

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoTitle = addForm["title"].value;
  descText = textareaDesc.value;
  let id = (counter += 1);
  docId = "_" + id;
  addForm.reset();
  auth.onAuthStateChanged((user) => {
    console.log(user.uid);
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("tasks")
        .doc("_" + id)
        .set({
          id: "_" + id,
          title: todoTitle,
          description: descText,
        })
        .then(() => {
          console.log("task added");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  });
});

//realtime listeners
auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .collection("tasks")
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach((change) => {
          if (change.type == "added") {
            renderData(change.doc.id);
            if(change.doc.data().title == 'angelo task') {
              change.doc.data().title = 'i changed'
            }
          }
          else if(change.type == 'removed') {
            let cardForRemove = document.querySelector('[data-id=' + change.doc.id + ']')
            cardForRemove.style.transform = "rotate(90deg)";
                cardForRemove.style.opacity = "0.3";
                setTimeout(() => {
                  cardForRemove.remove();
                }, 150);
          }
        });
      });
  }
});

//add task funcion:
const renderData = (id) => {
  //creating the divs: .card, .card-content and .card-btns and positioning in your respective places
  let newCard = document.createElement("div");
  let newCardContent = document.createElement("div");
  let newCardBtns = document.createElement("div");
  newCard.setAttribute("class", "card");
  newCard.setAttribute("data-id", id);
  newCardContent.setAttribute("class", "card-content");
  newCardBtns.setAttribute("class", "card-btns");
  newCard.appendChild(newCardContent);
  newCard.appendChild(newCardBtns);
  uncTasks.appendChild(newCard);

  //creating the p element that is the task's title
  function renderTitleDesc(title, desc) {
    let titleNode = document.createTextNode(title);
    let pTitle = document.createElement("p");
    pTitle.setAttribute("class", "card-title");
    pTitle.appendChild(titleNode);
    newCardContent.appendChild(pTitle);

    //checking if the task has a description
    if (!desc) {
      pTitle.style.gridArea = "1/1/2/10";
      pTitle.style.borderRadius = "15px";
    } else {
      //creating the button that shows the task's description
      let newShowBtn = document.createElement("button");
      newShowBtn.setAttribute("class", "show-desc-btn");
      //newShowBtn.setAttribute("onclick", "showDescFunc(this)");
      let imgShowBtn = document.createElement("img");
      imgShowBtn.setAttribute("src", "../public/images/arrow-icon.svg");
      newShowBtn.appendChild(imgShowBtn);
      newCardContent.appendChild(newShowBtn);

      //Function for show the task's description
      newShowBtn.addEventListener("click", () => {
        let showDescBtnArr = Array.prototype.slice.call(showDescBtn);
        let descIndex = showDescBtnArr.indexOf(newShowBtn);
        let cardArr = Array.prototype.slice.call(card);
        let cardIndex = cardArr.indexOf(newShowBtn.parentElement.parentElement);
        if (
          descBox[descIndex].style.opacity == "" ||
          descBox[descIndex].style.opacity == "0"
        ) {
          descBox[descIndex].style.opacity = "1";
          descBox[descIndex].style.pointerEvents = "all";
          descBox[descIndex].style.transform = "translateY(10%)";
          card[cardIndex].style.height = "120px";
          descBtnImg[descIndex].style.transform = "rotate(180deg)";
        } else {
          descBox[descIndex].style.opacity = "0";
          descBox[descIndex].style.pointerEvents = "none";
          descBox[descIndex].style.transform = "translateY(-100%)";
          card[cardIndex].style.height = "70px";
          descBtnImg[descIndex].style.transform = "rotate(0deg)";
        }
      });

      //creating the description box and your p element
      let newDescBox = document.createElement("div");
      newDescBox.setAttribute("class", "desc-box");
      newCardContent.appendChild(newDescBox);

      let pDesc = document.createElement("p");
      let descNodeText = document.createTextNode(desc);
      pDesc.appendChild(descNodeText);
      newDescBox.appendChild(pDesc);

      showDescBtn = document.querySelectorAll(".card .show-desc-btn");
      descBox = document.querySelectorAll(".card .desc-box");
      descBtnImg = document.querySelectorAll(".show-desc-btn img");
      card = document.querySelectorAll(".card");
    }
  }
  auth.onAuthStateChanged((user) =>
    db
      .collection("users")
      .doc(user.uid)
      .collection("tasks")
      .doc(id)
      .get()
      .then((doc) => {
        let taskData = doc.data();
        renderTitleDesc(taskData.title, taskData.description);
      })
  );

  //creating the check button
  let newCheckBtn = document.createElement("button");
  newCheckBtn.setAttribute("class", "check-btn");
  let checkImg = document.createElement("img");
  checkImg.setAttribute("src", "../public/images/check-icon.svg");
  newCheckBtn.appendChild(checkImg);
  newCardBtns.appendChild(newCheckBtn);

  //creating the trash button
  let newTrashBtn = document.createElement("button");
  newTrashBtn.setAttribute("class", "trash-btn");
  let trashImg = document.createElement("img");
  trashImg.setAttribute("src", "../public/images/trash-icon.svg");
  newTrashBtn.appendChild(trashImg);
  newCardBtns.appendChild(newTrashBtn);

  //element and event listener for remove a task
  let trashBtn = document.querySelectorAll(".card-btns .trash-btn");

  trashBtn.forEach((elem, index) => {
    elem.addEventListener("click", () => {
      let cardId = elem.parentElement.parentElement.getAttribute("data-id");
      auth.onAuthStateChanged((user) => {
        db.collection("users")
          .doc(user.uid)
          .collection("tasks")
          .doc(cardId)
          .delete();
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
            document.querySelector(".completed-tasks").appendChild(card[index]);
            card[index].style.transform = "";
            card[index].style.opacity = "1";
          }, 300);
        }
      }, 20);

      card[index].style.transform = "translate(100%)";
      card[index].style.opacity = "0";
      checkBtn[index].remove();
    });
  });
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

//The next code is for display a date in the page
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const weekday = document.getElementById("weekday");

function showDate() {
  let today = new Date();

  day.innerHTML = today.getDate();
  month.innerHTML = today.toLocaleString("default", { month: "long" });
  year.innerHTML = today.getFullYear();
  weekday.innerHTML = today.toLocaleDateString("default", { weekday: "long" });
}

showDate();
