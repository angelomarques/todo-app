import db from "./firebase.js";
import { auth } from "./firebase.js";

//checking if user logged in or not
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("user is signed in at users.html");
  } else {
    alert(
      "Your login session has expired or you have logged out, login again to continue"
    );
    location = "login-page.html";
  }
});

//retriving username
auth.onAuthStateChanged((user) => {
  if (user) {
    const username = document.getElementById("display-username");
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((snapshot) => {
        username.innerHTML = snapshot.data().Name;
      });
  }
});

//logout
document.querySelector(".logout").addEventListener("click", () => {
  auth.signOut();
});
