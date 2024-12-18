function setUserStorage(userInfo) {
  window.localStorage.clear();
  window.localStorage.setItem("user", JSON.stringify(userInfo));
}

function clearUserStorage() {
  window.localStorage.clear();
}

function checkLoginState() {
  return window.localStorage.getItem("user") ? true : false;
}

function getUserInfo() {
  const info = JSON.parse(window.localStorage.getItem("user")) ?? null;

  return {
    username: info.username,
    email: info.email,
    bio: info.bio,
  };
}

export { setUserStorage, clearUserStorage, checkLoginState, getUserInfo };
