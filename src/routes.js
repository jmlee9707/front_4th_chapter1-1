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

const userRoute = () => {
  console.log("");
};

const navigateTo = (path) => {
  window.history.pushState(null, "", path);
  router();
};

const router = () => {
  if (window.location.hash) return;
  const path = matchPath(window.location.pathname) ?? "/404";
  window.history.pushState(null, null, path);

  const pageClass = ROUTES[path];

  if (pageClass) {
    const $app = document.querySelector("#root");
    $app.innerHTML = "";
    const $page = new pageClass("#root");
    $page.render();
  }
};

const hashrouter = () => {};

export { userRoute, router, navigateTo, hashrouter };
