import { router, userRoute } from "./routes";

window.addEventListener("load", () => router());
window.addEventListener("popstate", () => router());

window.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    const path = e.target.getAttribute("href");
    if (path !== "#") {
      window.history.pushState({}, "", path);
      router();
    } else {
      userRoute();
    }
  }
});
