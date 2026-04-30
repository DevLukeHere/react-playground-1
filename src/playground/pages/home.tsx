import { Link } from "@tanstack/react-router";
import pkg from "../../../package.json";

const XUI_PACKAGES = Object.entries({
	...pkg.dependencies,
	...pkg.devDependencies,
})
	.filter(([name]) => name.startsWith("@xsolla/"))
	.map(([name, version]) => ({ name, version: version.replace(/^\^/, "") }));

const QUICK_LINKS = [
	{ label: "Toast", to: "/toast" },
	{ label: "Icons", to: "/icons" },
	{ label: "Theme Tokens", to: "/theme" },
];

function HomePage() {
	return (
		<div className="max-w-2xl">
			<h2 className="text-2xl font-bold text-white mb-2">XUI Playground</h2>
			<p className="text-white/60 mb-8">
				Test and explore Xsolla UI library components interactively.
			</p>

			<section className="mb-8">
				<h3 className="text-sm uppercase tracking-widest text-white/30 font-semibold mb-3">
					Installed Packages
				</h3>
				<div className="flex flex-col gap-2">
					{XUI_PACKAGES.map((p) => (
						<div
							key={p.name}
							className="flex items-baseline justify-between p-3 rounded-lg bg-white/[0.03] border border-white/10"
						>
							<span className="text-sm font-mono text-cyan-400">{p.name}</span>
							<span className="text-xs font-mono text-white/30">
								{p.version}
							</span>
						</div>
					))}
				</div>
			</section>

			<section>
				<h3 className="text-sm uppercase tracking-widest text-white/30 font-semibold mb-3">
					Quick Links
				</h3>
				<div className="flex gap-2">
					{QUICK_LINKS.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							className="px-4 py-2 rounded-lg bg-cyan-400/10 text-cyan-400 text-sm hover:bg-cyan-400/20 transition-colors"
						>
							{link.label}
						</Link>
					))}
				</div>
			</section>
		</div>
	);
}

export { HomePage };
