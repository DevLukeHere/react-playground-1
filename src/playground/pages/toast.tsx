import { Toast, ToastProvider, useToast } from "@xsolla/xui-toast";
import { useState } from "react";
import { ExampleSection } from "@/playground/components/example-section";
import {
	type ControlDef,
	PropControl,
} from "@/playground/components/prop-control";

function ToastControls() {
	const toast = useToast();
	const [variant, setVariant] = useState<string>("info");
	const [message, setMessage] = useState("Hello from the playground!");
	const [duration, setDuration] = useState(5000);
	const [lastId, setLastId] = useState<string | null>(null);

	const controls: ControlDef[] = [
		{
			type: "select",
			label: "Variant",
			value: variant,
			options: [
				{ label: "Success", value: "success" },
				{ label: "Info", value: "info" },
				{ label: "Warning", value: "warning" },
				{ label: "Error", value: "error" },
			],
			onChange: setVariant,
		},
		{ type: "text", label: "Message", value: message, onChange: setMessage },
		{
			type: "number",
			label: "Duration (ms)",
			value: duration,
			min: 0,
			max: 15000,
			step: 500,
			onChange: setDuration,
		},
	];

	const fireToast = () => {
		const id = toast.toast({
			variant: variant as "success" | "info" | "warning" | "error",
			message,
			duration,
		});
		setLastId(id);
	};

	return (
		<div className="flex flex-col gap-6">
			<ExampleSection
				title="Interactive"
				description="Configure and fire a toast with custom props."
			>
				<PropControl controls={controls} />
				<div className="flex gap-2 mt-4">
					<button
						type="button"
						onClick={fireToast}
						className="px-4 py-2 rounded-lg bg-cyan-500 text-black text-sm font-medium hover:bg-cyan-400 transition-colors"
					>
						Fire Toast
					</button>
					<button
						type="button"
						onClick={() => lastId && toast.dismiss(lastId)}
						className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/15 transition-colors"
					>
						Dismiss Last
					</button>
					<button
						type="button"
						onClick={() => toast.dismissAll()}
						className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/15 transition-colors"
					>
						Dismiss All
					</button>
				</div>
			</ExampleSection>

			<ExampleSection
				title="Variants"
				description="All four toast variants side by side."
			>
				<div className="flex flex-wrap gap-2">
					<button
						type="button"
						onClick={() => toast.success("Quest activated")}
						className="px-3 py-1.5 rounded bg-green-500/20 text-green-400 text-sm hover:bg-green-500/30 transition-colors"
					>
						Success
					</button>
					<button
						type="button"
						onClick={() => toast.info("50 Xsolla Points received")}
						className="px-3 py-1.5 rounded bg-blue-500/20 text-blue-400 text-sm hover:bg-blue-500/30 transition-colors"
					>
						Info
					</button>
					<button
						type="button"
						onClick={() => toast.warning("Session expiring soon")}
						className="px-3 py-1.5 rounded bg-yellow-500/20 text-yellow-400 text-sm hover:bg-yellow-500/30 transition-colors"
					>
						Warning
					</button>
					<button
						type="button"
						onClick={() => toast.error("Failed to save")}
						className="px-3 py-1.5 rounded bg-red-500/20 text-red-400 text-sm hover:bg-red-500/30 transition-colors"
					>
						Error
					</button>
				</div>
			</ExampleSection>

			<ExampleSection
				title="Static Toast Display"
				description="Toast component rendered inline for visual reference."
			>
				<div className="flex flex-col gap-2 max-w-md">
					<Toast
						id="s1"
						variant="success"
						message="Quest has been activated"
						onClose={() => {}}
					/>
					<Toast
						id="s2"
						variant="info"
						message="You received 50 Xsolla Points"
						onClose={() => {}}
					/>
					<Toast
						id="s3"
						variant="warning"
						message="Your session is about to expire"
						onClose={() => {}}
					/>
					<Toast
						id="s4"
						variant="error"
						message="Failed to save changes"
						onClose={() => {}}
					/>
				</div>
			</ExampleSection>

			<ExampleSection
				title="Multiple Toasts"
				description="Fire a rapid burst of toasts to see stacking behaviour."
			>
				<button
					type="button"
					onClick={() => {
						toast.success("First — Success");
						setTimeout(() => toast.info("Second — Info"), 200);
						setTimeout(() => toast.warning("Third — Warning"), 400);
					}}
					className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/15 transition-colors"
				>
					Show 3 Toasts
				</button>
			</ExampleSection>
		</div>
	);
}

function ToastPage() {
	return (
		<div className="max-w-3xl">
			<h2 className="text-2xl font-bold text-white mb-1">Toast</h2>
			<p className="text-white/60 mb-6">
				<span className="font-mono text-xs text-cyan-400/80">
					@xsolla/xui-toast
				</span>{" "}
				— notification system with variants, custom duration, and programmatic
				dismiss.
			</p>
			<ToastProvider>
				<ToastControls />
			</ToastProvider>
		</div>
	);
}

export { ToastPage };
