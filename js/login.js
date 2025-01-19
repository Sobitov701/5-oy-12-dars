const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {
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
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((data) => {
      if (data && data.success) {
        localStorage.setItem("username", email);

        location.assign(`${window.location.origin}/pages/index.html`);
      }
    })
    .catch((error) => {
      alert(error.message);
    });
});
