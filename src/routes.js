import userStore from "./core/userStore";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";

const ROUTES = {
  "/": MainPage,
  "/login": LoginPage,
  "/404": NotFoundPage,
  "/profile": ProfilePage,
};

class Router {
  constructor() {
    this.routes = {};
  }

  addRoute(path, component) {
    this.routes[path] = component;
  }

  getPath() {
    if (window.location.hash) {
      console.log(window.location.hash);
      return window.location.hash.replace("#", "");
    } else return window.location.pathname;
  }

  // 1
  router() {
    const path = this.getPath();
    const currentPath = this.matchUrl(path);
    const redirectUser = this.userRoute(currentPath);
    if (redirectUser) return;

    this.renderPage(currentPath);
  }

  renderPage(path) {
    const pageClass = this.routes[path];
    const $app = document.querySelector("#root");
    $app.innerHTML = "";

    if (pageClass) {
      const $page = new pageClass("#root");
      $page.render();
    } else {
      const Not = this.routes["/404"];
      const $not = new Not("#root");
      $not.render();
    }
  }

  userRoute(path) {
    const isLogin = userStore.checkLoginState();

    if (path === "/login" && isLogin) {
      this.navigateTo("/");
      return true;
    }
    if (path === "/profile" && !isLogin) {
      this.navigateTo("/login");
      return true;
    }
    return false;
  }

  navigateTo(path) {
    if (path.startsWith("#")) {
      window.location.hash = path.replace("#", "");
    } else {
      window.history.pushState(null, "", path);
      this.router();
    }
  }

  matchUrl(path) {
    return (
      Object.keys(this.routes).find((routePath) => routePath === path) ?? "/404"
    );
  }

  initRoute() {
    // 초기화 및 이벤트 설정
    this.router();

    window.addEventListener("popstate", () => {
      if (!window.location.hash) this.router();
    });

    window.addEventListener("hashchange", () => {
      this.router();
    });

    // button, navbar 이동 처리
    window.addEventListener("click", (e) => {
      if (e.target.tagName === "A" && e.target.getAttribute("href")) {
        e.preventDefault();
        this.navigateTo(e.target.getAttribute("href"));
      } else if (e.target.id === "logout") {
        e.preventDefault();
        userStore.clearUserState();
        this.navigateTo("/");
      }
    });
  }
}

const router = new Router();
Object.keys(ROUTES).forEach((url) => router.addRoute(url, ROUTES[url]));

export default router;
