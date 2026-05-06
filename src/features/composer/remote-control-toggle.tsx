import { Globe } from "lucide-react";
import { memo } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ComposerButton } from "./button";

type RemoteControlToggleProps = {
	enabled: boolean;
	onToggle: (enabled: boolean) => void;
	disabled?: boolean;
	className?: string;
};

export const RemoteControlToggle = memo(function RemoteControlToggle({
	enabled,
	onToggle,
	disabled = false,
	className,
}: RemoteControlToggleProps) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<ComposerButton
					aria-label="Remote control"
					disabled={disabled}
					className={cn(
						"gap-1 px-1.5 text-[11px]",
						className,
						enabled
							? "text-emerald-500 hover:text-emerald-500"
							: "text-muted-foreground/70 hover:text-muted-foreground/70",
					)}
					onClick={() => onToggle(!enabled)}
				>
					<Globe className="size-[13px]" strokeWidth={1.8} />
					<span>RC</span>
				</ComposerButton>
			</TooltipTrigger>
			<TooltipContent side="top" sideOffset={4}>
				<span>
					Remote Control{enabled ? " (on)" : ""}
					{" \u2014 "}
					{enabled
						? "Session accessible from claude.ai/code"
						: "Enable to access from claude.ai or mobile"}
				</span>
			</TooltipContent>
		</Tooltip>
	);
});
