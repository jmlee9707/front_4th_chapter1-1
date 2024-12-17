import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";

const ROUTES = {
  "/": MainPage(),
  "/login": LoginPage(),
  "/404": NotFoundPage(),
  "/profile": ProfilePage(),
};

const mathPath = (path) => {
  return Object.keys(ROUTES).find((el) => el === path);
};

const userRoute = () => {
  console.log("");
};

const router = () => {
  if (window.location.hash) return;
  const path = mathPath(window.location.pathname) ?? "/404";
  window.history.pushState(null, null, path ?? path);

  const $app = document.querySelector("#root");
  $app.innerHTML = ROUTES[path];
};

const hashrouter = () => {};

export { userRoute, router, hashrouter };
