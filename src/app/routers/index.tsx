import {
	createRootRoute,
	createRoute,
	createRouter,
} from "@tanstack/react-router";
import { PlaygroundLayout } from "@/playground/layout";
import { HomePage } from "@/playground/pages/home";
import { ToastPage } from "@/playground/pages/toast";
import { IconsPage } from "@/playground/pages/icons";
import { ThemePage } from "@/playground/pages/theme";

const rootRoute = createRootRoute({
	component: PlaygroundLayout,
});

const homeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: HomePage,
});

const toastRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/toast",
	component: ToastPage,
});

const iconsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/icons",
	component: IconsPage,
});

const themeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/theme",
	component: ThemePage,
});

const routeTree = rootRoute.addChildren([
	homeRoute,
	toastRoute,
	iconsRoute,
	themeRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export { router };
