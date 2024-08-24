import { DEFAULT_CHAT_MESSAGE_TEMPLATE } from "./TEXTGEN_CHAT_TEMPLATES";

// export const DEFAULT_STOP = ["<|im_start>", "<|im_end|>"];
export const DEFAULT_STOP = [
  "<|eot_id|>",
  "<|end_of_text|>",
  "<|im_start>",
  "<|im_end|>",
  "<|end_of_turn|>",
  "<s>",
  "</s>",
  "[INST]",
  "[/INST]",
  "<|/s|>",
  "<|s|>",
  "<|",
  DEFAULT_CHAT_MESSAGE_TEMPLATE.messageStart,
  DEFAULT_CHAT_MESSAGE_TEMPLATE.messageEnd,
];
// export const DEFAULT_STOP_AFTER = ["?"];
export const DEFAULT_STOP_AFTER = [];
