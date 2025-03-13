import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7VJ3ggs8geMckFfmEJY2fOxEeys-9GU0",
  authDomain: "tech-home-38f21.firebaseapp.com",
  projectId: "tech-home-38f21",
  storageBucket: "tech-home-38f21.firebasestorage.app",
  messagingSenderId: "310801804496",
  appId: "1:310801804496:web:cc1fe6831a9adc45dcc2d5",
  measurementId: "G-9MF4CS34ND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Add a custom class to all SweetAlert2 instances
const swalCustomClass = {
  popup: 'custom-swal',
  title: 'custom-swal-title',
  content: 'custom-swal-content',
  actions: 'custom-swal-actions',
  confirmButton: 'custom-swal-confirm'
};

// Sign Up Functionality
let signUpBtn = document.getElementById("signUpBtn");

signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let signUpModal = new bootstrap.Modal(document.getElementById("signUpModal"));
  signUpModal.show();

  let signupMbtn = document.getElementById("signupMbtn");
  signupMbtn.addEventListener('click', async () => {
    let signUpName = document.getElementById('signUpName').value.trim();
    let signUpEmail = document.getElementById('signUpEmail').value.trim();
    let signUpPassword = document.getElementById('signUpPassword').value.trim();
    let signUpCpassword = document.getElementById('signUpCpassword').value.trim();

    if (signUpEmail === "" || signUpName === "" || signUpPassword === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields.",
        customClass: swalCustomClass
      }).then(() => {
        signUpModal.show();
      });
      return;
    }

    if (signUpPassword !== signUpCpassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match.",
        customClass: swalCustomClass
      }).then(() => {
        signUpModal.show();
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword).then(() => {
        Swal.fire({
          title: "Registered successfully!",
          icon: "success",
          customClass: swalCustomClass
        }).then(() => {
          document.getElementById("signUpName").value = "";
          document.getElementById("signUpEmail").value = "";
          document.getElementById("signUpPassword").value = "";
          document.getElementById("signUpCpassword").value = "";
          location.href = "./main.html";
        });
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
        customClass: swalCustomClass
      });
    }
  });
});

// Login Functionality
let loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
  loginModal.show();

  let MloginBtn = document.getElementById('MloginBtn');
  MloginBtn.addEventListener("click", async () => {
    let loginEmail = document.getElementById('loginEmail').value.trim();
    let loginPassword = document.getElementById('loginPassword').value.trim();

    if (loginEmail === "" || loginPassword === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields.",
        customClass: swalCustomClass
      }).then(() => {
        loginModal.show();
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword).then(() => {
        Swal.fire({
          title: "Logged in successfully!",
          icon: "success",
          customClass: swalCustomClass
        }).then(() => {
          document.getElementById("loginEmail").value = "";
          document.getElementById("loginPassword").value = "";
          location.href = "./main.html";
        });
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
        customClass: swalCustomClass
      });
    }
  });
});

// Skip Button Functionality
let skipBtn = document.getElementById('skipbtn');
skipBtn.addEventListener('click', (e) => {
  e.preventDefault();
  location.href = './main.html';
});