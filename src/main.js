import userStore from "./core/userStore";
import { navigateTo, router } from "./routes";

window.addEventListener("load", () => router());
window.addEventListener("popstate", () => router());

window.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    const path = e.target.getAttribute("href");
    navigateTo(path);
  }
});

window.addEventListener("click", (e) => {
  if (e.target.id === "logout") {
    e.preventDefault();
    userStore.clearUserState();
    navigateTo("/");
  }
});
