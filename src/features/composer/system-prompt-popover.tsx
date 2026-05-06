import { Check, ChevronDown, ScrollText } from "lucide-react";
import { memo, useCallback, useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ComposerButton } from "./button";
import {
	DEFAULT_SYSTEM_PROMPT_SELECTION,
	PRESET_LABELS,
	type SystemPromptPreset,
	type SystemPromptSelection,
} from "./system-prompt-presets";

type SystemPromptPopoverProps = {
	value: SystemPromptSelection;
	onChange: (value: SystemPromptSelection) => void;
	disabled?: boolean;
	className?: string;
};

export const SystemPromptPopover = memo(function SystemPromptPopover({
	value,
	onChange,
	disabled = false,
	className,
}: SystemPromptPopoverProps) {
	const [open, setOpen] = useState(false);
	const isActive = value.preset !== "default";

	const handlePresetSelect = useCallback(
		(preset: SystemPromptPreset) => {
			if (preset === "default") {
				onChange(DEFAULT_SYSTEM_PROMPT_SELECTION);
				setOpen(false);
			} else {
				onChange({ ...value, preset });
			}
		},
		[onChange, value],
	);

	const handleCustomTextChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			onChange({ ...value, preset: "custom", customText: e.target.value });
		},
		[onChange, value],
	);

	const handleModeToggle = useCallback(() => {
		onChange({
			...value,
			mode: value.mode === "append" ? "replace" : "append",
		});
	}, [onChange, value]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<ComposerButton
					aria-label="System prompt"
					disabled={disabled}
					className={cn(
						"gap-1 px-1.5 text-[11px]",
						className,
						isActive
							? "text-violet-500 hover:text-violet-500"
							: "text-muted-foreground/70 hover:text-muted-foreground/70",
					)}
				>
					<ScrollText className="size-[13px]" strokeWidth={1.8} />
					<span>Prompt</span>
					<ChevronDown className="size-3 opacity-40" strokeWidth={2} />
				</ComposerButton>
			</PopoverTrigger>
			<PopoverContent
				side="top"
				align="start"
				sideOffset={4}
				className="w-[22rem] p-0"
			>
				<div className="flex flex-col">
					<div className="border-b px-3 py-2">
						<span className="text-xs font-medium text-muted-foreground">
							System Prompt
						</span>
					</div>
					<div className="flex flex-col py-1">
						{(["default", "karpathy", "custom"] as const).map((preset) => (
							<button
								key={preset}
								type="button"
								className="flex cursor-pointer items-center justify-between gap-2 px-3 py-1.5 text-sm hover:bg-accent"
								onClick={() => handlePresetSelect(preset)}
							>
								<span>{PRESET_LABELS[preset]}</span>
								{value.preset === preset && (
									<Check className="size-3.5 text-foreground" strokeWidth={2} />
								)}
							</button>
						))}
					</div>
					{value.preset !== "default" && (
						<div className="flex flex-col gap-2 border-t px-3 py-2.5">
							{value.preset === "custom" && (
								<textarea
									value={value.customText}
									onChange={handleCustomTextChange}
									placeholder="Enter custom system prompt..."
									className="min-h-[6rem] w-full resize-y rounded-md border bg-transparent px-2.5 py-2 text-xs leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
									// biome-ignore lint/a11y/noAutofocus: user just selected "Custom"
									autoFocus
								/>
							)}
							<button
								type="button"
								className="cursor-pointer self-start text-[11px] text-muted-foreground hover:text-foreground"
								onClick={handleModeToggle}
							>
								Mode:{" "}
								<span className="font-medium">
									{value.mode === "append"
										? "Append to default"
										: "Replace default"}
								</span>
							</button>
						</div>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
});
