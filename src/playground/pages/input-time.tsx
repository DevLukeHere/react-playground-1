import { InputTime, type TimeValue } from "@xsolla/xui-input-time";
import { useState } from "react";
import { ExampleSection } from "@/playground/components/example-section";
import { type ControlDef, PropControl } from "@/playground/components/prop-control";

function formatTime(value: TimeValue | null): string {
	if (!value) return "none";
	const { hours, minutes, seconds, period } = value;
	const h = String(hours).padStart(2, "0");
	const m = String(minutes).padStart(2, "0");
	const base = `${h}:${m}`;
	const withSecs = seconds !== undefined ? `${base}:${String(seconds).padStart(2, "0")}` : base;
	return period ? `${withSecs} ${period.toUpperCase()}` : withSecs;
}

function InputTimePage() {
	const [basicValue, setBasicValue] = useState<TimeValue | null>(null);
	const [secsValue, setSecsValue] = useState<TimeValue | null>(null);
	const [ampmValue, setAmpmValue] = useState<TimeValue | null>(null);
	const [disabledValue] = useState<TimeValue | null>({ hours: 9, minutes: 30 });
	const [errorValue, setErrorValue] = useState<TimeValue | null>(null);

	const [ctrlValue, setCtrlValue] = useState<TimeValue | null>(null);
	const [ctrlSize, setCtrlSize] = useState("md");
	const [ctrlShowSeconds, setCtrlShowSeconds] = useState(false);
	const [ctrlShowPeriod, setCtrlShowPeriod] = useState(false);
	const [ctrlHourCycle, setCtrlHourCycle] = useState("24");
	const [ctrlDisabled, setCtrlDisabled] = useState(false);
	const [ctrlError, setCtrlError] = useState("");

	const controls: ControlDef[] = [
		{
			type: "select",
			label: "Size",
			value: ctrlSize,
			options: [
				{ label: "XS", value: "xs" },
				{ label: "SM", value: "sm" },
				{ label: "MD", value: "md" },
				{ label: "LG", value: "lg" },
				{ label: "XL", value: "xl" },
			],
			onChange: setCtrlSize,
		},
		{
			type: "select",
			label: "Hour Cycle",
			value: ctrlHourCycle,
			options: [
				{ label: "24h", value: "24" },
				{ label: "12h", value: "12" },
			],
			onChange: (v) => {
				setCtrlHourCycle(v);
				setCtrlValue(null);
			},
		},
		{
			type: "boolean",
			label: "Show Seconds",
			value: ctrlShowSeconds,
			onChange: (v) => {
				setCtrlShowSeconds(v as boolean);
				setCtrlValue(null);
			},
		},
		{
			type: "boolean",
			label: "Show Period",
			value: ctrlShowPeriod,
			onChange: (v) => {
				setCtrlShowPeriod(v as boolean);
				setCtrlValue(null);
			},
		},
		{
			type: "boolean",
			label: "Disabled",
			value: ctrlDisabled,
			onChange: (v) => setCtrlDisabled(v as boolean),
		},
		{
			type: "text",
			label: "Error",
			value: ctrlError,
			onChange: setCtrlError,
		},
	];

	const errorMsg = errorValue
		? Number(errorValue.hours) > 17
			? "Must be before 17:00"
			: undefined
		: undefined;

	return (
		<div className="max-w-4xl">
			<h2 className="text-2xl font-bold text-white mb-1">Input Time</h2>
			<p className="text-white/60 mb-6">
				<span className="font-mono text-xs text-cyan-400/80">
					@xsolla/xui-input-time
				</span>{" "}
				— time input with 12/24-hour cycle, seconds, and period support.
			</p>

			<div className="flex flex-col gap-6">
				<ExampleSection title="Basic (24h)" description="Default 24-hour time input.">
					<div className="flex items-start gap-6">
						<div className="w-48">
							<InputTime value={basicValue} onChange={setBasicValue} />
						</div>
						<div className="text-sm text-white/50 pt-2">
							Value:{" "}
							<span className="text-white font-mono">{formatTime(basicValue)}</span>
						</div>
					</div>
				</ExampleSection>

				<ExampleSection title="With Seconds" description="Shows hours, minutes, and seconds.">
					<div className="flex items-start gap-6">
						<div className="w-56">
							<InputTime value={secsValue} onChange={setSecsValue} showSeconds />
						</div>
						<div className="text-sm text-white/50 pt-2">
							Value:{" "}
							<span className="text-white font-mono">{formatTime(secsValue)}</span>
						</div>
					</div>
				</ExampleSection>

				<ExampleSection
					title="12-Hour with AM/PM"
					description="12-hour cycle with period selector."
				>
					<div className="flex items-start gap-6">
						<div className="w-56">
							<InputTime
								value={ampmValue}
								onChange={setAmpmValue}
								hourCycle={12}
								showPeriod
							/>
						</div>
						<div className="text-sm text-white/50 pt-2">
							Value:{" "}
							<span className="text-white font-mono">{formatTime(ampmValue)}</span>
						</div>
					</div>
				</ExampleSection>

				<ExampleSection title="Disabled" description="Non-interactive with a pre-set value.">
					<div className="w-48">
						<InputTime value={disabledValue} disabled />
					</div>
				</ExampleSection>

				<ExampleSection title="With Error" description="Validation error shown below the input. Times after 17:00 are rejected.">
					<div className="w-48">
						<InputTime value={errorValue} onChange={setErrorValue} error={errorMsg} />
					</div>
				</ExampleSection>

				<ExampleSection
					title="Interactive"
					description="Adjust props to explore the component."
				>
					<PropControl controls={controls} />
					<div className="mt-4 flex items-start gap-6">
						<div className="w-64">
							<InputTime
								value={ctrlValue}
								onChange={setCtrlValue}
								size={ctrlSize as "xs" | "sm" | "md" | "lg" | "xl"}
								hourCycle={Number(ctrlHourCycle) as 12 | 24}
								showSeconds={ctrlShowSeconds}
								showPeriod={ctrlShowPeriod}
								disabled={ctrlDisabled}
								error={ctrlError || undefined}
							/>
						</div>
						<div className="text-sm text-white/50 pt-2">
							Value:{" "}
							<span className="text-white font-mono">{formatTime(ctrlValue)}</span>
						</div>
					</div>
				</ExampleSection>
			</div>
		</div>
	);
}

export { InputTimePage };
