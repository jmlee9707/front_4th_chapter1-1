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

const matchPath = (path) => {
  return Object.keys(ROUTES).find((el) => el === path);
};

const userRouter = () => {
  console.log(window.localStorage.getItem("user"));
  if (!window.localStorage.getItem("user")) {
    navigateTo("/login");
  }
};

const navigateTo = (path) => {
  window.history.pushState(null, "", path);
  router();
};

const router = (path) => {
  if (window.location.hash) return;
  const currentPath = path ?? matchPath(window.location.pathname) ?? "/404";

  if (currentPath === "/profile") {
    userRouter();
    if (!window.localStorage.getItem("user")) return;
  }

  handleRouter(currentPath);
};

const handleRouter = (path) => {
  window.history.pushState(null, "", path);
  const pageClass = ROUTES[path];

  if (pageClass) {
    const $app = document.querySelector("#root");
    $app.innerHTML = "";
    const $page = new pageClass("#root");
    $page.render();
  }
};

const hashrouter = () => {};

export { userRouter, router, navigateTo, hashrouter };
