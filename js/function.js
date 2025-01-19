function validateRegister(username, email, password, confirmpassword) {
  if (
    !username.value.trim() ||
    !password.value.trim() ||
    !confirmpassword.value.trim()
  ) {
    alert("Barcha maydonlarni to'ldiring!");
    return false;
  }

  const mail = email.value.trim();
  if (!mail.includes("@") || !mail.includes(".")) {
    alert("Emailni to'g'ri kiriting.");
    return false;
  }

  if (password.value !== confirmpassword.value) {
    alert("Parollar mos kelmadi!");
    return false;
  }

  return true;
}

export { validateRegister };
