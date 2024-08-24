export const TEXTGEN_PROMPT_STYLES = ["message", "raw"] as const;
export type TextgenPromptStyleType = (typeof TEXTGEN_PROMPT_STYLES)[number];
