import { useDesignSystem, type ThemeMode } from "@xsolla/xui-core";

const THEME_OPTIONS: { label: string; value: ThemeMode }[] = [
	{ label: "Dark", value: "dark" },
	{ label: "Light", value: "light" },
	{ label: "Xsolla Dark", value: "xsollaDark" },
	{ label: "Xsolla Light", value: "xsollaLight" },
	{ label: "LTG Dark", value: "ltg-dark" },
];

function ThemeSwitcher() {
	const { mode, setMode } = useDesignSystem();

	return (
		<div className="px-4 py-3 border-b border-white/10">
			<label className="flex flex-col gap-1.5 text-xs text-white/50 uppercase tracking-wider">
				Theme
				<select
					value={mode}
					onChange={(e) => setMode(e.target.value as ThemeMode)}
					className="px-2 py-1.5 rounded bg-white/10 border border-white/10 text-white text-sm outline-none focus:border-white/30 cursor-pointer"
				>
					{THEME_OPTIONS.map((opt) => (
						<option key={opt.value} value={opt.value}>
							{opt.label}
						</option>
					))}
				</select>
			</label>
		</div>
	);
}

export { ThemeSwitcher };
