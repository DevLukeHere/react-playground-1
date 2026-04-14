import { Calendar, DualCalendar } from "@xsolla/xui-calendar";
import { DatePicker } from "@xsolla/xui-date-picker";
import { useState } from "react";
import { ExampleSection } from "@/playground/components/example-section";
import {
	type ControlDef,
	PropControl,
} from "@/playground/components/prop-control";

const CHIPS = [
	{ label: "Today", value: "today", days: 0 },
	{ label: "Last 7 days", value: "last7", days: 7 },
	{ label: "Last 30 days", value: "last30", days: 30 },
	{ label: "Last 90 days", value: "last90", days: 90 },
];

function CalendarPage() {
	const [singleDate, setSingleDate] = useState<Date | null>(null);

	const [rangeStart, setRangeStart] = useState<Date | null>(null);
	const [rangeEnd, setRangeEnd] = useState<Date | null>(null);

	const [chipDate, setChipDate] = useState<Date | null>(null);
	const [activeChip, setActiveChip] = useState<string | null>("last30");

	const [dualStart, setDualStart] = useState<Date | null>(null);
	const [dualEnd, setDualEnd] = useState<Date | null>(null);

	const [pickerDate, setPickerDate] = useState<Date | null>(null);
	const [pickerSize, setPickerSize] = useState<string>("md");

	const pickerControls: ControlDef[] = [
		{
			type: "select",
			label: "Size",
			value: pickerSize,
			options: [
				{ label: "XS", value: "xs" },
				{ label: "SM", value: "sm" },
				{ label: "MD", value: "md" },
				{ label: "LG", value: "lg" },
				{ label: "XL", value: "xl" },
			],
			onChange: setPickerSize,
		},
	];

	return (
		<div className="max-w-4xl">
			<h2 className="text-2xl font-bold text-white mb-1">
				Calendar / Date Picker
			</h2>
			<p className="text-white/60 mb-6">
				<span className="font-mono text-xs text-cyan-400/80">
					@xsolla/xui-calendar
				</span>{" "}
				+{" "}
				<span className="font-mono text-xs text-cyan-400/80">
					@xsolla/xui-date-picker
				</span>{" "}
				— date selection with single, range, chips, and dual layouts.
			</p>

			<div className="flex flex-col gap-6">
				<ExampleSection
					title="Single Date"
					description="Click a day to select it."
				>
					<div className="flex items-start gap-6">
						<Calendar
							selectedDate={singleDate}
							onChange={(d) => setSingleDate(d as Date)}
						/>
						<div className="text-sm text-white/50 pt-2">
							Selected:{" "}
							<span className="text-white font-mono">
								{singleDate?.toLocaleDateString() ?? "none"}
							</span>
						</div>
					</div>
				</ExampleSection>

				<ExampleSection
					title="Date Range"
					description="Select start and end dates."
				>
					<div className="flex items-start gap-6">
						<Calendar
							selectsRange
							startDate={rangeStart}
							endDate={rangeEnd}
							onChange={(range) => {
								const [start, end] = range as [Date | null, Date | null];
								setRangeStart(start);
								setRangeEnd(end);
							}}
						/>
						<div className="text-sm text-white/50 pt-2">
							<div>
								Start:{" "}
								<span className="text-white font-mono">
									{rangeStart?.toLocaleDateString() ?? "none"}
								</span>
							</div>
							<div>
								End:{" "}
								<span className="text-white font-mono">
									{rangeEnd?.toLocaleDateString() ?? "none"}
								</span>
							</div>
						</div>
					</div>
				</ExampleSection>

				<ExampleSection
					title="With Preset Chips"
					description="Quick-select date ranges via chip buttons."
				>
					<Calendar
						selectedDate={chipDate}
						onChange={(d) => setChipDate(d as Date)}
						chips={CHIPS}
						activeChip={activeChip}
						onChipSelect={setActiveChip}
					/>
				</ExampleSection>

				<ExampleSection
					title="Dual Calendar"
					description="Side-by-side calendars for range selection."
				>
					<div className="flex flex-col gap-2">
						<DualCalendar
							startDate={dualStart}
							endDate={dualEnd}
							onChange={(dates) => {
								const [start, end] = dates;
								setDualStart(start);
								setDualEnd(end);
							}}
						/>
						<div className="text-sm text-white/50">
							{dualStart?.toLocaleDateString() ?? "—"} to{" "}
							{dualEnd?.toLocaleDateString() ?? "—"}
						</div>
					</div>
				</ExampleSection>

				<ExampleSection
					title="DatePicker (Input + Dropdown)"
					description="Input field that opens a calendar dropdown."
				>
					<PropControl controls={pickerControls} />
					<div className="mt-4 max-w-xs min-h-[420px]">
						<DatePicker
							selectedDate={pickerDate}
							onChange={(d) => setPickerDate(d as Date)}
							placeholder="Select a date"
							size={pickerSize as "xs" | "sm" | "md" | "lg" | "xl"}
						/>
					</div>
				</ExampleSection>
			</div>
		</div>
	);
}

export { CalendarPage };
