function setUserStorage(userInfo) {
  window.localStorage.setItem("user", userInfo);
}

function clearUserStorage() {
  window.localStorage.clear();
}

function checkLoginState() {
  console.log("dd");
  console.log(window.localStorage.getItem("user"));
  return window.localStorage.getItem("user") ? true : false;
}

export { setUserStorage, clearUserStorage, checkLoginState };
