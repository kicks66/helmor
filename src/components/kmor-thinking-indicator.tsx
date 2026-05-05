import { KmorLogoAnimated } from "@/components/kmor-logo-animated";
import { cn } from "@/lib/utils";

type KmorThinkingIndicatorProps = {
	size?: number | string;
	className?: string;
};

export function KmorThinkingIndicator({
	size = 14,
	className,
}: KmorThinkingIndicatorProps) {
	return (
		<span
			aria-hidden="true"
			data-slot="kmor-thinking-indicator"
			className={cn(
				"inline-flex shrink-0 items-center justify-center",
				className,
			)}
			style={{ width: size, height: size }}
		>
			<KmorLogoAnimated size={size} className="shrink-0 opacity-80" />
		</span>
	);
}
