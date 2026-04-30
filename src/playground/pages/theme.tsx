import {
	getTypographyTokens,
	radius,
	shadow,
	spacing,
	useDesignSystem,
} from "@xsolla/xui-core";
import { ExampleSection } from "@/playground/components/example-section";

function flattenColors(
	obj: Record<string, unknown>,
	prefix = "",
): { path: string; value: string }[] {
	const result: { path: string; value: string }[] = [];
	for (const [key, val] of Object.entries(obj)) {
		const path = prefix ? `${prefix}.${key}` : key;
		if (typeof val === "string") {
			result.push({ path, value: val });
		} else if (typeof val === "object" && val !== null) {
			result.push(...flattenColors(val as Record<string, unknown>, path));
		}
	}
	return result;
}

function ColorSwatches({
	title,
	colors,
}: {
	title: string;
	colors: Record<string, unknown>;
}) {
	const flat = flattenColors(colors);
	return (
		<ExampleSection title={title}>
			<div className="grid grid-cols-4 gap-2">
				{flat.map(({ path, value }) => (
					<div
						key={path}
						className="flex items-center gap-2 p-2 rounded bg-white/[0.03]"
					>
						<div
							className="w-8 h-8 rounded border border-white/10 shrink-0"
							style={{ backgroundColor: value }}
						/>
						<div className="min-w-0">
							<div className="text-[10px] text-white/50 truncate">{path}</div>
							<div className="text-[10px] font-mono text-white/30">{value}</div>
						</div>
					</div>
				))}
			</div>
		</ExampleSection>
	);
}

function SpacingTokens() {
	return (
		<ExampleSection title="Spacing" description="spacing.xs through spacing.xl">
			<div className="flex flex-col gap-3">
				{(Object.entries(spacing) as [string, number][]).map(
					([name, value]) => (
						<div key={name} className="flex items-center gap-3">
							<span className="text-xs text-white/50 w-8">{name}</span>
							<div
								className="h-4 rounded bg-cyan-400/30"
								style={{ width: value }}
							/>
							<span className="text-xs font-mono text-white/30">{value}px</span>
						</div>
					),
				)}
			</div>
		</ExampleSection>
	);
}

function RadiusTokens() {
	return (
		<ExampleSection title="Border Radius">
			<div className="flex flex-wrap gap-3">
				{(Object.entries(radius) as [string, number][]).map(([name, value]) => (
					<div key={name} className="flex flex-col items-center gap-1">
						<div
							className="w-14 h-14 bg-cyan-400/20 border border-cyan-400/30"
							style={{ borderRadius: value }}
						/>
						<span className="text-[10px] text-white/50">{name}</span>
						<span className="text-[10px] font-mono text-white/30">
							{value}px
						</span>
					</div>
				))}
			</div>
		</ExampleSection>
	);
}

function ShadowTokens() {
	return (
		<ExampleSection title="Shadows">
			<div className="flex flex-wrap gap-4">
				{(Object.entries(shadow) as [string, string][]).map(([name, value]) => (
					<div key={name} className="flex flex-col items-center gap-2">
						<div
							className="w-20 h-20 rounded-lg bg-[#1b2628]"
							style={{ boxShadow: value }}
						/>
						<span className="text-[10px] text-white/50">{name}</span>
					</div>
				))}
			</div>
		</ExampleSection>
	);
}

function TypographyTokens() {
	const tokens = getTypographyTokens("b2b");

	return (
		<ExampleSection
			title="Typography"
			description="Headings and body variants for b2b product context."
		>
			<div className="flex flex-col gap-4">
				{(
					Object.entries(tokens.heading) as [
						string,
						{ fontSize: number; lineHeight: string; fontWeight: number },
					][]
				).map(([name, variant]) => (
					<div key={name} className="flex items-baseline gap-4">
						<span className="text-[10px] text-white/40 w-8 shrink-0">
							{name}
						</span>
						<span
							className="text-white"
							style={{
								fontSize: variant.fontSize,
								lineHeight: variant.lineHeight,
								fontWeight: variant.fontWeight,
							}}
						>
							The quick brown fox
						</span>
						<span className="text-[10px] font-mono text-white/30 shrink-0">
							{variant.fontSize}px / {variant.lineHeight} / {variant.fontWeight}
						</span>
					</div>
				))}
				<hr className="border-white/10" />
				{(
					Object.entries(tokens.basic) as [
						string,
						{ fontSize: number; lineHeight: string; fontWeight: number },
					][]
				).map(([name, variant]) => (
					<div key={name} className="flex items-baseline gap-4">
						<span className="text-[10px] text-white/40 w-16 shrink-0">
							{name}
						</span>
						<span
							className="text-white"
							style={{
								fontSize: variant.fontSize,
								lineHeight: variant.lineHeight,
								fontWeight: variant.fontWeight,
							}}
						>
							The quick brown fox jumps over the lazy dog
						</span>
						<span className="text-[10px] font-mono text-white/30 shrink-0">
							{variant.fontSize}px / {variant.lineHeight} / {variant.fontWeight}
						</span>
					</div>
				))}
			</div>
		</ExampleSection>
	);
}

function ThemePage() {
	const { theme, mode } = useDesignSystem();

	return (
		<div className="max-w-4xl">
			<h2 className="text-2xl font-bold text-white mb-1">Theme Tokens</h2>
			<p className="text-white/60 mb-6">
				<span className="font-mono text-xs text-cyan-400/80">
					@xsolla/xui-core
				</span>{" "}
				— current mode: <span className="font-mono text-white/80">{mode}</span>
			</p>

			<div className="flex flex-col gap-8">
				<ColorSwatches
					title="Background Colours"
					colors={theme.colors.background}
				/>
				<ColorSwatches title="Content Colours" colors={theme.colors.content} />
				<ColorSwatches title="Border Colours" colors={theme.colors.border} />
				<SpacingTokens />
				<RadiusTokens />
				<ShadowTokens />
				<TypographyTokens />
			</div>
		</div>
	);
}

export { ThemePage };
