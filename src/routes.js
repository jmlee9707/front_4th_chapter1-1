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

  router(path) {
    const currentPath = this.matchUrl(path);
    const redirectUser = this.userRoute(currentPath);
    if (redirectUser) return;

    this.renderPage(currentPath);
  }

  renderPage(path) {
    const pageClass = this.routes[path];

    if (pageClass) {
      const $app = document.querySelector("#root");
      $app.innerHTML = "";
      const $page = new pageClass("#root");
      $page.render();
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
    window.history.pushState(null, "", path);
    this.router(path);
  }

  matchUrl(path) {
    return (
      Object.keys(this.routes).find((routePath) => routePath === path) ?? "/404"
    );
  }

  initRoute() {
    // 초기화 및 이벤트 설정
    this.router(window.location.pathname);

    window.addEventListener("popstate", () => {
      this.router(window.location.pathname);
    });

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
