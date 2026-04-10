import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { XUIProvider } from "@xsolla/xui-core";
import { router } from "@/app/routers/index";
import "./app/index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<XUIProvider initialMode="dark" initialProductContext="b2b">
			<RouterProvider router={router} />
		</XUIProvider>
	</StrictMode>,
);
