const INIT_USER = {
  username: "",
  email: "",
  bio: "",
};

class UserState {
  constructor() {
    this.login = false;
    this.state = INIT_USER;
  }

  setUserState(userInfo) {
    window.localStorage.setItem("user", JSON.stringify(userInfo));
    this.login = true;
    this.state = userInfo;
  }

  clearUserState() {
    window.localStorage.removeItem("user");
    this.login = false;
    this.state = INIT_USER;
  }

  checkLoginState() {
    return this.login;
  }

  getUserInfo() {
    const info = JSON.parse(window.localStorage.getItem("user")) ?? null;

    return {
      username: info.username,
      email: info.email,
      bio: info.bio,
    };
  }
}

const userStore = new UserState();
export default userStore;
