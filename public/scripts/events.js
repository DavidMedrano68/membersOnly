const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#passwordCon");
console.log({
  pass: password.value,
  pasC: passwordConfirm.value,
});

password.addEventListener("input", () => {
  if (password.value == passwordConfirm.value) {
    password.classList.remove("border-red-700");
    passwordConfirm.classList.remove("border-red-700");
  } else {
    if (!password.classList.contains("border-red-700")) {
      password.classList.add("border-red-700");
    }
    if (!passwordConfirm.classList.contains("border-red-700")) {
      passwordConfirm.classList.add("border-red-700");
    }
  }
});
passwordConfirm.addEventListener("input", () => {
  if (password.value == passwordConfirm.value) {
    passwordConfirm.classList.remove("border-red-700");
    password.classList.remove("border-red-700");
  } else {
    if (!password.classList.contains("border-red-700")) {
      password.classList.add("border-red-700");
    }
    if (!passwordConfirm.classList.contains("border-red-700")) {
      passwordConfirm.classList.add("border-red-700");
    }
  }
});
