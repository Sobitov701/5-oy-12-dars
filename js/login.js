const form = document.getElementById("login-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("https://auth-rg69.onrender.com/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.status === 200) {
        response.json();
      }
    })

    .then((data) => {
      if (data && data.success) {
        alert("Muvaffaqiyatli login");

        localStorage.setItem("username", email);

        location.assign(`${window.location.origin}/pages/index.html`);
      } else {
        alert("Login yoki parol noto‘g‘ri");
      }
    })
    .catch((error) => {
      alert("Tizimda xato yuz berdi. Iltimos, qaytadan urinib ko'ring.");
    });
});
