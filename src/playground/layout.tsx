import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "./components/sidebar";

function PlaygroundLayout() {
	return (
		<div className="min-h-screen bg-[#111819]">
			<Sidebar />
			<main className="ml-60 p-8">
				<Outlet />
			</main>
		</div>
	);
}

export { PlaygroundLayout };
