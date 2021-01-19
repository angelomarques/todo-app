const loginArea = document.querySelector(".login-container");
const registerArea = document.querySelector(".register-container");

const registerBtn = document.getElementById("register-btn");
const loginBtn = document.getElementById("login-btn");
const closeArea = document.querySelectorAll(".close-area button");

loginArea.style.display = "none";
registerArea.style.display = "none";

registerBtn.addEventListener("click", () => {
  if (registerArea.style.display == "none") {
    registerArea.style.display = "flex";
  }
});

loginBtn.addEventListener("click", () => {
  if (loginArea.style.display == "none") {
    loginArea.style.display = "flex";
  }
});

closeArea.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (index == 1) {
      loginArea.style.display = "none";
    }
    if (index == 0) {
      registerArea.style.display = "none";
    }
  });
});
