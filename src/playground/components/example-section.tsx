import type { ReactNode } from "react";

function ExampleSection({
	title,
	description,
	children,
}: {
	title: string;
	description?: string;
	children: ReactNode;
}) {
	return (
		<section className="flex flex-col gap-3">
			<div>
				<h3 className="text-lg font-semibold text-white">{title}</h3>
				{description && (
					<p className="text-sm text-white/60 mt-1">{description}</p>
				)}
			</div>
			<div className="p-6 rounded-lg border border-white/10 bg-white/[0.02]">
				{children}
			</div>
		</section>
	);
}

export { ExampleSection };
