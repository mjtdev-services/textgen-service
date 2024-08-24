// @see https://openrouter.ai/docs#responses

// Definitions of subtypes are below

export type OpenRouterTextgenResponse = {
  id: string;
  // Depending on whether you set "stream" to "true" and
  // whether you passed in "messages" or a "prompt", you
  // will get a different output shape
  choices: (
    | OpenRouterNonStreamingChoice
    | OpenRouterStreamingChoice
    | OpenRouterNonChatChoice
    | Error
  )[];
  created: number; // Unix timestamp
  model: string;
  object: "chat.completion" | "chat.completion.chunk";
  // For non-streaming responses only. For streaming responses,
  // see "Querying Cost and Stats" below.
  usage?: {
    completion_tokens: number; // Equivalent to "native_tokens_completion" in the /generation API
    prompt_tokens: number; // Equivalent to "native_tokens_prompt"
    total_tokens: number; // Sum of the above two fields
    total_cost: number; // Number of credits used by this generation
  };
};

// Subtypes:

export type OpenRouterNonChatChoice = {
  finish_reason: string | null;
  text: string;
};

export const isOpenRouterNonStreamingChoice = (
  maybe: unknown
): maybe is OpenRouterNonStreamingChoice => {
  const straw = maybe as OpenRouterNonStreamingChoice;
  return (
    typeof straw === "object" && typeof straw.message?.content === "string"
  );
};

export type OpenRouterNonStreamingChoice = {
  finish_reason: string | null; // Depends on the model. Ex: 'stop' | 'length' | 'content_filter' | 'tool_calls' | 'function_call'
  message: {
    content: string | null;
    role: string;
    tool_calls?: ToolCall[];
    // Deprecated, replaced by tool_calls
    function_call?: FunctionCall;
  };
};

export const isOpenrouterStreamingChoice = (
  maybe: unknown
): maybe is OpenRouterStreamingChoice => {
  const straw = maybe as OpenRouterStreamingChoice;
  return typeof straw === "object" && typeof straw.delta?.content === "string";
};

export type OpenRouterStreamingChoice = {
  finish_reason: string | null;
  delta: {
    content: string | null;
    role?: string;
    tool_calls?: ToolCall[];
    // Deprecated, replaced by tool_calls
    function_call?: FunctionCall;
  };
};

type Error = {
  code: number; // See "Error Handling" section
  message: string;
};

type FunctionCall = {
  name: string;
  arguments: string; // JSON format arguments
};

type ToolCall = {
  id: string;
  type: "function";
  function: FunctionCall;
};
