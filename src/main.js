import { createRouter } from "./lib";
import { HomePage, LoginPage, ProfilePage } from "./pages";
import { globalStore } from "./stores";
import { ForbiddenError, UnauthorizedError } from "./errors";
import { router } from "./router";
import { render } from "./render";

const AuthGuard = (validation, CustomError, Component) => {
  return () => {
    const { loggedIn } = globalStore.getState();
    if (validation(loggedIn)) {
      throw new CustomError();
    }
    return Component();
  };
};

router.set(
  createRouter({
    "/": HomePage,
    "/login": AuthGuard(Boolean, ForbiddenError, LoginPage),
    "/profile": AuthGuard((value) => !value, UnauthorizedError, ProfilePage),
  }),
);

function main() {
  router.get().subscribe(render);
  globalStore.subscribe(render);

  render();
}

main();
