import { validateRegister } from "./function.js";

const form = document.getElementById("register-form");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmpassword = document.getElementById("confirmpassword");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const isValid = validateRegister(username, email, password, confirmpassword);

  if (!isValid) {
    return;
  }

  const user = {
    username: username.value.trim(),
    email: email.value.trim(),
    password: password.value,
  };

  fetch("https://auth-rg69.onrender.com/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Ro'yxatdan o'tishda xatolik yuz berdi");
      }
    })
    .then((data) => {
      if (data.message === "User registered successfully!") {
        alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
        localStorage.setItem("user", JSON.stringify(user));
        location.assign(`${window.location.origin}/pages/login.html`);
      } else {
        throw new Error(data.message);
      }
    })
    .catch((error) => {
      alert(error.message);
    });
});
