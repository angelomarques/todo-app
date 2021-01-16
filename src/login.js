import db from './firebase';
import {auth} from './firebase';

const loginForm = document.getElementById("login-form");


//register a user
const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = registerForm["name"].value;
  const email = registerForm["email"].value;
  const password = registerForm["password"].value;
  //console.log([name, email, password]);

  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    //console.log(cred);
    return db.collection
  })
});