import type { ChatMessageTemplate } from "./ChatMessageTemplate";

export const CHAT_ML_TEMPLATE: ChatMessageTemplate = {
  messageStart: "<|im_start|>",
  afterRole: "\n",
  messageEnd: "<|im_end|>",
};
export const LLAMA3_TEMPLATE: ChatMessageTemplate = {
  bos: "<|begin_of_text|>",
  messageStart: "<|start_header_id|>",
  afterRole: "<|end_header_id|>\n",
  messageEnd: "<|eot_id|>",
};

export const OPENCHAT_TEMPLATE: ChatMessageTemplate = {
  messageStart: "GPT4 Correct ",
  afterRole: ": ",
  messageEnd: "<|end_of_turn|>",
};
const CHAT_GLM3_TEMPlATE: ChatMessageTemplate = {
  messageStart: "<|",
  afterRole: "|>",
  messageEnd: "",
};

export const DEFAULT_CHAT_MESSAGE_TEMPLATE = CHAT_ML_TEMPLATE;

export const TEXTGEN_CHAT_TEMPLATES = {
  chatML: CHAT_ML_TEMPLATE,
  llama3: LLAMA3_TEMPLATE,
  glm3: CHAT_GLM3_TEMPlATE,
  openchat: OPENCHAT_TEMPLATE,
} as const;

export type TextgenChatTemplateType = keyof typeof TEXTGEN_CHAT_TEMPLATES;
