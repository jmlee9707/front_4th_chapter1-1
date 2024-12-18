import { navigateTo, router } from "./routes";
import { clearUserStorage } from "./store/userStore";

window.addEventListener("load", () => router());
window.addEventListener("popstate", () => router());

window.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    const path = e.target.getAttribute("href");
    if (path === "#") {
      clearUserStorage();
      navigateTo("/");
    } else {
      navigateTo(path);
    }
  }
});

window.addEventListener("click", (e) => {
  if (e.target.id === "logout") {
    e.preventDefault();
    console.log("ss");
    clearUserStorage();
    navigateTo("/");
  }
});
