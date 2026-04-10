type ControlDef =
	| {
			type: "text";
			label: string;
			value: string;
			onChange: (v: string) => void;
	  }
	| {
			type: "number";
			label: string;
			value: number;
			min: number;
			max: number;
			step?: number;
			onChange: (v: number) => void;
	  }
	| {
			type: "select";
			label: string;
			value: string;
			options: { label: string; value: string }[];
			onChange: (v: string) => void;
	  }
	| {
			type: "boolean";
			label: string;
			value: boolean;
			onChange: (v: boolean) => void;
	  }
	| {
			type: "color";
			label: string;
			value: string;
			onChange: (v: string) => void;
	  };

function PropControl({ controls }: { controls: ControlDef[] }) {
	return (
		<div className="flex flex-wrap gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
			{controls.map((ctrl) => (
				// biome-ignore lint/a11y/noLabelWithoutControl: inputs are nested inside label
				<label
					key={ctrl.label}
					className="flex flex-col gap-1 text-sm text-white/70"
				>
					<span>{ctrl.label}</span>
					{ctrl.type === "text" && (
						<input
							type="text"
							value={ctrl.value}
							onChange={(e) => ctrl.onChange(e.target.value)}
							className="px-2 py-1 rounded bg-white/10 border border-white/10 text-white text-sm outline-none focus:border-white/30"
						/>
					)}
					{ctrl.type === "number" && (
						<div className="flex items-center gap-2">
							<input
								type="range"
								min={ctrl.min}
								max={ctrl.max}
								step={ctrl.step ?? 1}
								value={ctrl.value}
								onChange={(e) => ctrl.onChange(Number(e.target.value))}
								className="accent-cyan-400"
							/>
							<span className="text-xs text-white/50 w-8 text-right">
								{ctrl.value}
							</span>
						</div>
					)}
					{ctrl.type === "select" && (
						<select
							value={ctrl.value}
							onChange={(e) => ctrl.onChange(e.target.value)}
							className="px-2 py-1 rounded bg-white/10 border border-white/10 text-white text-sm outline-none focus:border-white/30"
						>
							{ctrl.options.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					)}
					{ctrl.type === "boolean" && (
						<button
							type="button"
							onClick={() => ctrl.onChange(!ctrl.value)}
							className={`w-10 h-5 rounded-full transition-colors ${ctrl.value ? "bg-cyan-500" : "bg-white/20"} relative`}
						>
							<span
								className={`block w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${ctrl.value ? "translate-x-5" : "translate-x-0.5"}`}
							/>
						</button>
					)}
					{ctrl.type === "color" && (
						<input
							type="color"
							value={ctrl.value}
							onChange={(e) => ctrl.onChange(e.target.value)}
							className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
						/>
					)}
				</label>
			))}
		</div>
	);
}

export { PropControl, type ControlDef };
