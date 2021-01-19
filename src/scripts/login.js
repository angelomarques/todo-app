import db from "./firebase.js";
import { auth } from "./firebase.js";

//register a user
const registerForm = document.getElementById("register-form");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = registerForm["name"].value;
  const email = registerForm["email"].value;
  const password = registerForm["password"].value;
  //console.log([name, email, password]);
  registerForm.reset();

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      //console.log(cred);
      return db
        .collection("users")
        .doc(cred.user.uid)
        .set({
          Name: name,
          Email: email,
          Password: password,
        })
        .then(() => {
          console.log("success");
          location = "login-page.html";
        })
        .catch((err) => {
          console.log(err.message);
          const registerError = document.getElementById("registerError");
          registerError.innerHTML = err.message;
        });
    })
    .catch((err) => {
      console.log(err.message);
      const registerError = document.getElementById("registerError");
      registerError.innerHTML = err.message;
    });
});

//login a user
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const loginEmail = loginForm["email"].value;
  const loginPassword = loginForm["password"].value;

  auth
    .signInWithEmailAndPassword(loginEmail, loginPassword)
    .then(() => {
      console.log("login invoked");
      location = "users.html";
    })
    .catch((err) => {
      const loginError = document.getElementById("loginError");
      loginError.innerHTML = err.message;
      console.log(err)
    });
});
