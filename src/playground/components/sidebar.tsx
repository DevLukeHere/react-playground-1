import { Link, useRouterState } from "@tanstack/react-router";
import { ThemeSwitcher } from "./theme-switcher";

interface NavItem {
	label: string;
	to: string;
}

interface NavGroup {
	category: string;
	items: NavItem[];
}

const NAV_CONFIG: NavGroup[] = [
	{
		category: "Overview",
		items: [{ label: "Home", to: "/" }],
	},
	{
		category: "Feedback",
		items: [{ label: "Toast", to: "/toast" }],
	},
	{
		category: "Foundation",
		items: [
			{ label: "Icons", to: "/icons" },
			{ label: "Theme", to: "/theme" },
		],
	},
];

function Sidebar() {
	const routerState = useRouterState();
	const currentPath = routerState.location.pathname;

	return (
		<aside className="w-60 h-screen fixed left-0 top-0 flex flex-col bg-[#0d1517] border-r border-white/10 overflow-y-auto">
			<div className="px-4 py-4 border-b border-white/10">
				<h1 className="text-sm font-bold text-white tracking-wide">
					XUI Playground
				</h1>
			</div>
			<ThemeSwitcher />
			<nav className="flex-1 py-3">
				{NAV_CONFIG.map((group) => (
					<div key={group.category} className="mb-4">
						<span className="block px-4 pb-1 text-[10px] uppercase tracking-widest text-white/30 font-semibold">
							{group.category}
						</span>
						{group.items.map((item) => {
							const isActive = currentPath === item.to;
							return (
								<Link
									key={item.to}
									to={item.to}
									className={`block px-4 py-1.5 text-sm transition-colors ${
										isActive
											? "text-cyan-400 bg-cyan-400/10"
											: "text-white/70 hover:text-white hover:bg-white/5"
									}`}
								>
									{item.label}
								</Link>
							);
						})}
					</div>
				))}
			</nav>
		</aside>
	);
}

export { Sidebar, NAV_CONFIG };
