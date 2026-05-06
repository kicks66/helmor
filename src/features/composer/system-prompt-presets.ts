/**
 * Built-in system prompt presets available in the composer toolbar.
 */

export type SystemPromptPreset = "default" | "karpathy" | "custom";

export type SystemPromptSelection = {
	preset: SystemPromptPreset;
	/** Custom text — only used when `preset === "custom"`. */
	customText: string;
	/** How to apply: "append" augments the default prompt, "replace" overrides it. */
	mode: "replace" | "append";
};

export const DEFAULT_SYSTEM_PROMPT_SELECTION: SystemPromptSelection = {
	preset: "default",
	customText: "",
	mode: "append",
};

export const KARPATHY_GUIDELINES = `Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" -> "Write tests for invalid inputs, then make them pass"
- "Fix the bug" -> "Write a test that reproduces it, then make it pass"
- "Refactor X" -> "Ensure tests pass before and after"

For multi-step tasks, state a brief plan with step-by-step verification checkpoints.

Strong success criteria enable independent iteration. Vague criteria ("make it work") necessitate recurring clarification.`;

export const PRESET_LABELS: Record<SystemPromptPreset, string> = {
	default: "Default",
	karpathy: "Karpathy Guidelines",
	custom: "Custom",
};

/**
 * Resolve the effective system prompt content and mode from a selection.
 * Returns `null` when no override is needed (the "default" preset).
 */
export function resolveSystemPrompt(
	selection: SystemPromptSelection,
): { content: string; mode: "replace" | "append" } | null {
	switch (selection.preset) {
		case "default":
			return null;
		case "karpathy":
			return { content: KARPATHY_GUIDELINES, mode: selection.mode };
		case "custom": {
			const trimmed = selection.customText.trim();
			return trimmed ? { content: trimmed, mode: selection.mode } : null;
		}
	}
}
