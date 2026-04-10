import {
	AlertCircle,
	ArrowLeft,
	ArrowRight,
	Bell,
	Check,
	Copy,
	CreditCard,
	Eye,
	EyeOff,
	File,
	Home,
	Menu,
	Minus,
	Search,
	Settings,
	ShoppingCart,
	Upload,
	User,
	X,
} from "@xsolla/xui-icons";
import { useState } from "react";
import { ExampleSection } from "@/playground/components/example-section";
import {
	type ControlDef,
	PropControl,
} from "@/playground/components/prop-control";

const ICONS = [
	{ name: "AlertCircle", component: AlertCircle },
	{ name: "ArrowLeft", component: ArrowLeft },
	{ name: "ArrowRight", component: ArrowRight },
	{ name: "Bell", component: Bell },
	{ name: "Check", component: Check },
	{ name: "Copy", component: Copy },
	{ name: "CreditCard", component: CreditCard },
	{ name: "Eye", component: Eye },
	{ name: "EyeOff", component: EyeOff },
	{ name: "File", component: File },
	{ name: "Home", component: Home },
	{ name: "Menu", component: Menu },
	{ name: "Minus", component: Minus },
	{ name: "Search", component: Search },
	{ name: "Settings", component: Settings },
	{ name: "ShoppingCart", component: ShoppingCart },
	{ name: "Upload", component: Upload },
	{ name: "User", component: User },
	{ name: "X", component: X },
] as const;

function IconsPage() {
	const [size, setSize] = useState(24);
	const [color, setColor] = useState("#55dcf6");
	const [copied, setCopied] = useState<string | null>(null);

	const controls: ControlDef[] = [
		{
			type: "number",
			label: "Size",
			value: size,
			min: 12,
			max: 48,
			step: 2,
			onChange: setSize,
		},
		{ type: "color", label: "Colour", value: color, onChange: setColor },
	];

	const copyImport = (name: string) => {
		navigator.clipboard.writeText(
			`import { ${name} } from "@xsolla/xui-icons";`,
		);
		setCopied(name);
		setTimeout(() => setCopied(null), 1500);
	};

	return (
		<div className="max-w-3xl">
			<h2 className="text-2xl font-bold text-white mb-1">Icons</h2>
			<p className="text-white/60 mb-6">
				<span className="font-mono text-xs text-cyan-400/80">
					@xsolla/xui-icons
				</span>{" "}
				— 19 Lucide-based icons. Click to copy import.
			</p>

			<div className="flex flex-col gap-6">
				<PropControl controls={controls} />

				<ExampleSection
					title="Gallery"
					description="Click any icon to copy its import statement."
				>
					<div className="grid grid-cols-5 gap-3">
						{ICONS.map(({ name, component: Icon }) => (
							<button
								key={name}
								type="button"
								onClick={() => copyImport(name)}
								className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group relative"
								title={`Copy import for ${name}`}
							>
								<Icon size={size} color={color} />
								<span className="text-[10px] text-white/40 group-hover:text-white/70 transition-colors">
									{name}
								</span>
								{copied === name && (
									<span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded">
										Copied
									</span>
								)}
							</button>
						))}
					</div>
				</ExampleSection>
			</div>
		</div>
	);
}

export { IconsPage };
