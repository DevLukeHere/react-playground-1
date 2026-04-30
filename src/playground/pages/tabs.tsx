import { Bell, Home, Settings, User } from "@xsolla/xui-icons";
import { type TabItemType, TabPanel, Tabs } from "@xsolla/xui-tabs";
import { useState } from "react";
import { ExampleSection } from "@/playground/components/example-section";
import { type ControlDef, PropControl } from "@/playground/components/prop-control";

const BASIC_TABS: TabItemType[] = [
	{ id: "overview", label: "Overview" },
	{ id: "details", label: "Details" },
	{ id: "settings", label: "Settings" },
];

const ICON_TABS: TabItemType[] = [
	{ id: "home", label: "Home", icon: <Home /> },
	{ id: "profile", label: "Profile", icon: <User /> },
	{ id: "alerts", label: "Alerts", icon: <Bell /> },
	{ id: "settings", label: "Settings", icon: <Settings /> },
];

const COUNTER_TABS: TabItemType[] = [
	{ id: "inbox", label: "Inbox", counter: 12 },
	{ id: "sent", label: "Sent", counter: 0 },
	{ id: "drafts", label: "Drafts", counter: 3 },
	{ id: "spam", label: "Spam", badge: true },
];

const DISABLED_TABS: TabItemType[] = [
	{ id: "active", label: "Active" },
	{ id: "pending", label: "Pending", disabled: true },
	{ id: "archived", label: "Archived" },
];

function TabsPage() {
	const [lineActive, setLineActive] = useState("overview");
	const [segActive, setSegActive] = useState("overview");
	const [iconActive, setIconActive] = useState("home");
	const [counterActive, setCounterActive] = useState("inbox");
	const [disabledActive, setDisabledActive] = useState("active");
	const [stretchedActive, setStretchedActive] = useState("overview");

	const [ctrlActive, setCtrlActive] = useState("overview");
	const [ctrlSize, setCtrlSize] = useState("md");
	const [ctrlVariant, setCtrlVariant] = useState("line");
	const [ctrlAlignLeft, setCtrlAlignLeft] = useState(false);
	const [ctrlStretched, setCtrlStretched] = useState(false);

	const controls: ControlDef[] = [
		{
			type: "select",
			label: "Size",
			value: ctrlSize,
			options: [
				{ label: "SM", value: "sm" },
				{ label: "MD", value: "md" },
				{ label: "LG", value: "lg" },
				{ label: "XL", value: "xl" },
			],
			onChange: setCtrlSize,
		},
		{
			type: "select",
			label: "Variant",
			value: ctrlVariant,
			options: [
				{ label: "Line", value: "line" },
				{ label: "Segmented", value: "segmented" },
			],
			onChange: setCtrlVariant,
		},
		{
			type: "boolean",
			label: "Align Left",
			value: ctrlAlignLeft,
			onChange: (v) => setCtrlAlignLeft(v as boolean),
		},
		{
			type: "boolean",
			label: "Stretched",
			value: ctrlStretched,
			onChange: (v) => setCtrlStretched(v as boolean),
		},
	];

	return (
		<div className="max-w-4xl">
			<h2 className="text-2xl font-bold text-white mb-1">Tabs</h2>
			<p className="text-white/60 mb-6">
				<span className="font-mono text-xs text-cyan-400/80">@xsolla/xui-tabs</span>{" "}
				— accessible tabbed interface with line and segmented variants.
			</p>

			<div className="flex flex-col gap-6">
				<ExampleSection title="Line Variant" description="Default underlined tabs.">
					<Tabs
						id="line-tabs"
						tabs={BASIC_TABS}
						activeTabId={lineActive}
						onChange={setLineActive}
					/>
					<div className="mt-4">
						{BASIC_TABS.map((t) => (
							<TabPanel
								key={t.id}
								id={t.id}
								tabsId="line-tabs"
								hidden={lineActive !== t.id}
							>
								<p className="text-sm text-white/70">{t.label} content</p>
							</TabPanel>
						))}
					</div>
				</ExampleSection>

				<ExampleSection
					title="Segmented Variant"
					description="Button-group style segmented control."
				>
					<Tabs
						id="seg-tabs"
						tabs={BASIC_TABS}
						activeTabId={segActive}
						onChange={setSegActive}
						variant="segmented"
					/>
				</ExampleSection>

				<ExampleSection title="With Icons" description="Tabs with leading icons.">
					<Tabs
						id="icon-tabs"
						tabs={ICON_TABS}
						activeTabId={iconActive}
						onChange={setIconActive}
					/>
				</ExampleSection>

				<ExampleSection
					title="Counters & Badges"
					description="Numeric counters and dot badges next to labels."
				>
					<Tabs
						id="counter-tabs"
						tabs={COUNTER_TABS}
						activeTabId={counterActive}
						onChange={setCounterActive}
					/>
				</ExampleSection>

				<ExampleSection
					title="Disabled Tab"
					description="Individual tabs can be disabled."
				>
					<Tabs
						id="disabled-tabs"
						tabs={DISABLED_TABS}
						activeTabId={disabledActive}
						onChange={setDisabledActive}
					/>
				</ExampleSection>

				<ExampleSection
					title="Stretched"
					description="Tabs fill the full width of their container."
				>
					<Tabs
						id="stretched-tabs"
						tabs={BASIC_TABS}
						activeTabId={stretchedActive}
						onChange={setStretchedActive}
						stretched
					/>
				</ExampleSection>

				<ExampleSection
					title="Sizes"
					description="Available sizes from sm to xl."
				>
					<div className="flex flex-col gap-4">
						{(["sm", "md", "lg", "xl"] as const).map((s) => (
							<div key={s}>
								<div className="text-xs text-white/40 mb-2 font-mono">{s}</div>
								<Tabs
									id={`size-${s}`}
									tabs={BASIC_TABS}
									activeTabId="overview"
									size={s}
								/>
							</div>
						))}
					</div>
				</ExampleSection>

				<ExampleSection
					title="Interactive"
					description="Adjust props to explore the component."
				>
					<PropControl controls={controls} />
					<div className="mt-4">
						<Tabs
							id="ctrl-tabs"
							tabs={BASIC_TABS}
							activeTabId={ctrlActive}
							onChange={setCtrlActive}
							size={ctrlSize as "sm" | "md" | "lg" | "xl"}
							variant={ctrlVariant as "line" | "segmented"}
							alignLeft={ctrlAlignLeft}
							stretched={ctrlStretched}
						/>
					</div>
				</ExampleSection>
			</div>
		</div>
	);
}

export { TabsPage };
