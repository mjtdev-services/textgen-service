export const TEXTGEN_MODELS = [
  // "neversleep/llama-3-lumimaid-70b",
  "mistralai/mistral-7b-instruct",
  "meta-llama/llama-3-70b-instruct",
  "mistralai/mixtral-8x22b-instruct",
  "mistralai/mixtral-8x7b-instruct",
  "microsoft/wizardlm-2-8x22b",
  "gryphe/mythomax-l2-13b",
  "openchat/openchat-7b",
  "anthropic/claude-3-haiku",
  "google/gemini-flash-1.5",
  "nousresearch/hermes-2-pro-llama-3-8b",
] as const;

export type TextgenModelType = (typeof TEXTGEN_MODELS)[number];
