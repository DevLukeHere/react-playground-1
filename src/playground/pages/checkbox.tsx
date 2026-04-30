import { Checkbox } from "@xsolla/xui-checkbox";
import { useState } from "react";
import { ExampleSection } from "@/playground/components/example-section";
import { type ControlDef, PropControl } from "@/playground/components/prop-control";

function CheckboxPage() {
	const [basic, setBasic] = useState(false);
	const [indeterminate, setIndeterminate] = useState(true);
	const [withDesc, setWithDesc] = useState(false);
	const [errorChecked, setErrorChecked] = useState(false);

	const [groupItems, setGroupItems] = useState<Record<string, boolean>>({
		apples: true,
		oranges: false,
		bananas: false,
	});
	const allChecked = Object.values(groupItems).every(Boolean);
	const someChecked = Object.values(groupItems).some(Boolean) && !allChecked;

	const [ctrlChecked, setCtrlChecked] = useState(false);
	const [ctrlSize, setCtrlSize] = useState("md");
	const [ctrlIndeterminate, setCtrlIndeterminate] = useState(false);
	const [ctrlDisabled, setCtrlDisabled] = useState(false);
	const [ctrlError, setCtrlError] = useState(false);
	const [ctrlLabel, setCtrlLabel] = useState("Accept terms");
	const [ctrlDescription, setCtrlDescription] = useState("");
	const [ctrlErrorMessage, setCtrlErrorMessage] = useState("");

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
			type: "text",
			label: "Label",
			value: ctrlLabel,
			onChange: setCtrlLabel,
		},
		{
			type: "text",
			label: "Description",
			value: ctrlDescription,
			onChange: setCtrlDescription,
		},
		{
			type: "text",
			label: "Error Message",
			value: ctrlErrorMessage,
			onChange: setCtrlErrorMessage,
		},
		{
			type: "boolean",
			label: "Indeterminate",
			value: ctrlIndeterminate,
			onChange: (v) => setCtrlIndeterminate(v as boolean),
		},
		{
			type: "boolean",
			label: "Disabled",
			value: ctrlDisabled,
			onChange: (v) => setCtrlDisabled(v as boolean),
		},
		{
			type: "boolean",
			label: "Error",
			value: ctrlError,
			onChange: (v) => setCtrlError(v as boolean),
		},
	];

	return (
		<div className="max-w-4xl">
			<h2 className="text-2xl font-bold text-white mb-1">Checkbox</h2>
			<p className="text-white/60 mb-6">
				<span className="font-mono text-xs text-cyan-400/80">
					@xsolla/xui-checkbox
				</span>{" "}
				— accessible checkbox with label, description, indeterminate, and error states.
			</p>

			<div className="flex flex-col gap-6">
				<ExampleSection title="Basic" description="A simple checkbox with a label.">
					<Checkbox checked={basic} onChange={(e) => setBasic(e.target.checked)}>
						Subscribe to newsletter
					</Checkbox>
				</ExampleSection>

				<ExampleSection
					title="Indeterminate"
					description="Tri-state checkbox useful for parent/child selection groups."
				>
					<Checkbox
						checked={false}
						indeterminate={indeterminate}
						onChange={(e) => setIndeterminate(e.target.checked)}
					>
						Partially selected
					</Checkbox>
				</ExampleSection>

				<ExampleSection
					title="With Description"
					description="Additional context shown below the label."
				>
					<Checkbox
						checked={withDesc}
						onChange={(e) => setWithDesc(e.target.checked)}
						description="You'll receive product updates and occasional promotions."
					>
						Marketing emails
					</Checkbox>
				</ExampleSection>

				<ExampleSection title="Disabled" description="Non-interactive states.">
					<div className="flex flex-col gap-3">
						<Checkbox disabled>Disabled unchecked</Checkbox>
						<Checkbox disabled checked>
							Disabled checked
						</Checkbox>
						<Checkbox disabled indeterminate>
							Disabled indeterminate
						</Checkbox>
					</div>
				</ExampleSection>

				<ExampleSection title="Error" description="Invalid state with error message.">
					<Checkbox
						checked={errorChecked}
						onChange={(e) => setErrorChecked(e.target.checked)}
						errorMessage="You must accept the terms to continue"
					>
						Accept terms and conditions
					</Checkbox>
				</ExampleSection>

				<ExampleSection title="Sizes" description="Available sizes from sm to xl.">
					<div className="flex flex-col gap-3">
						{(["sm", "md", "lg", "xl"] as const).map((s) => (
							<Checkbox key={s} size={s} checked>
								Size {s}
							</Checkbox>
						))}
					</div>
				</ExampleSection>

				<ExampleSection
					title="Group with Indeterminate Parent"
					description="Parent checkbox reflects the state of its children."
				>
					<div className="flex flex-col gap-3">
						<Checkbox
							checked={allChecked}
							indeterminate={someChecked}
							onChange={(e) => {
								const next = e.target.checked;
								setGroupItems({
									apples: next,
									oranges: next,
									bananas: next,
								});
							}}
						>
							Select all
						</Checkbox>
						<div className="flex flex-col gap-2 ml-6">
							{Object.entries(groupItems).map(([key, value]) => (
								<Checkbox
									key={key}
									checked={value}
									onChange={(e) =>
										setGroupItems((prev) => ({ ...prev, [key]: e.target.checked }))
									}
								>
									{key.charAt(0).toUpperCase() + key.slice(1)}
								</Checkbox>
							))}
						</div>
					</div>
				</ExampleSection>

				<ExampleSection
					title="Interactive"
					description="Adjust props to explore the component."
				>
					<PropControl controls={controls} />
					<div className="mt-4">
						<Checkbox
							checked={ctrlChecked}
							onChange={(e) => setCtrlChecked(e.target.checked)}
							size={ctrlSize as "sm" | "md" | "lg" | "xl"}
							indeterminate={ctrlIndeterminate}
							disabled={ctrlDisabled}
							error={ctrlError}
							description={ctrlDescription || undefined}
							errorMessage={ctrlErrorMessage || undefined}
						>
							{ctrlLabel}
						</Checkbox>
					</div>
				</ExampleSection>
			</div>
		</div>
	);
}

export { CheckboxPage };
