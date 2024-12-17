import { navigateTo, router, userRoute } from "./routes";
import { clearUserStorage } from "./store/userStore";

window.addEventListener("load", () => router());
window.addEventListener("popstate", () => router());

window.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    const path = e.target.getAttribute("href");
    if (path !== "#") {
      navigateTo(path);
    } else {
      clearUserStorage();
      userRoute();
    }
  }
});
