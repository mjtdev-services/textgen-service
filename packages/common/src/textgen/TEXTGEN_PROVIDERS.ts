export const TEXTGEN_PROVIDERS = ["openrouter", "local"] as const;

export type TextgenProviderType = (typeof TEXTGEN_PROVIDERS)[number];
