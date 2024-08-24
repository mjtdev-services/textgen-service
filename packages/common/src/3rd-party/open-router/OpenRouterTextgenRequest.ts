// modified for completion and better naming, see  https://openrouter.ai/docs#requests

// Definitions of subtypes are below
export type OpenRouterTextgenRequest = {
  // Either "messages" or "prompt" is required
  messages?: Readonly<OpenRouterMessage[]>;
  prompt?: string;

  // If "model" is unspecified, uses the user's default
  model?: string; // See "Supported Models" section

  // Allows to force the model to produce specific output format.
  // Only supported by OpenAI models, Nitro models, and some others - check the
  // providers on the model page on openrouter.ai/models to see if it's supported,
  // and set `require_parameters` to true in your Provider Preferences. See
  // openrouter.ai/docs#provider-routing
  response_format?: { type: "json_object" };

  stop?: string | string[];
  stream?: boolean; // Enable streaming

  // See LLM Parameters (openrouter.ai/docs#parameters)
  max_tokens?: number; // Range: [1, context_length)
  temperature?: number; // Range: [0, 2]
  top_p?: number; // Range: (0, 1]
  top_k?: number; // Range: [1, Infinity) Not available for OpenAI models
  frequency_penalty?: number; // Range: [-2, 2]
  presence_penalty?: number; // Range: [-2, 2]
  repetition_penalty?: number; // Range: (0, 2]
  seed?: number; // OpenAI only

  // Function-calling
  // Only natively suported by OpenAI models. For others, we submit
  // a YAML-formatted string with these tools at the end of the prompt.
  tools?: Tool[];
  tool_choice?: ToolChoice;

  // Additional optional parameters
  logit_bias?: { [key: number]: number };

  // OpenRouter-only parameters
  // See "Prompt Transforms" section: openrouter.ai/docs#transforms
  transforms?: string[];
  // See "Model Routing" section: openrouter.ai/docs#model-routing
  models?: string[];
  route?: "fallback";
  // See "Provider Routing" section: openrouter.ai/docs#provider-routing
  provider?: ProviderPreferences;
};

export const PROVIDERS = [
  "OpenAI",
  "Anthropic",
  "HuggingFace",
  "Google",
  "Mancer",
  "Mancer 2",
  "Together",
  "DeepInfra",
  "Azure",
  "Modal",
  "AnyScale",
  "Replicate",
  "Perplexity",
  "Recursal",
  "Fireworks",
  "Mistral",
  "Groq",
  "Cohere",
  "Lepton",
  "OctoAI",
  "Novita",
  "Lynn",
  "Lynn 2",
] as const;

export type ProviderPreferences = {
  allow_fallbacks: boolean;
  require_parameters: boolean;
  data_collection: "deny" | "allow";
  order: (typeof PROVIDERS)[number][];
};

// Subtypes:

type TextContent = {
  type: "text";
  text: string;
};

type ImageContentPart = {
  type: "image_url";
  image_url: {
    url: string; // URL or base64 encoded image data
    detail?: string; // Optional, defaults to 'auto'
  };
};

type ContentPart = TextContent | ImageContentPart;

export type OpenRouterMessage = {
  // role: "user" | "assistant" | "system" | "tool" | string;
  role: "user" | "assistant" | "system" | "tool";
  // ContentParts are only for the 'user' role:
  content: string | ContentPart[];
  // If "name" is included, it will be prepended like this
  // for non-OpenAI models: `{name}: {content}`
  name?: string;
};

type FunctionDescription = {
  description?: string;
  name: string;
  parameters: object; // JSON Schema object
};

type Tool = {
  type: "function";
  function: FunctionDescription;
};

type ToolChoice =
  | "none"
  | "auto"
  | {
      type: "function";
      function: {
        name: string;
      };
    };
