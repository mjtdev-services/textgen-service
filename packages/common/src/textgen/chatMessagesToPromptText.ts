import { isDefined, last } from "@mjtdev/engine";
import type { OpenRouterMessage } from "../3rd-party/open-router/OpenRouterTextgenRequest";
import type { ChatMessageTemplate } from "./ChatMessageTemplate";

export const chatMessagesToPromptText = ({
  messages,
  messageTemplate,
}: {
  messages: Readonly<OpenRouterMessage[]>;
  messageTemplate: ChatMessageTemplate;
}): string => {
  const { messageStart, afterRole, messageEnd } = messageTemplate;
  const assistantName = messages.find((m) => m.role === "assistant")?.name;
  const ephemeralLast: OpenRouterMessage | undefined =
    last(messages)?.role === "assistant"
      ? undefined
      : { role: "assistant", content: "", name: assistantName };
  const updatedMessages = [...messages, ephemeralLast].filter(isDefined);
  const promptTexts = updatedMessages
    .map((message, i) => {
      const author = message.name ?? message.role;
      const rawText = message.content;
      const renderedText = rawText;

      if (i === updatedMessages.length - 1) {
        return {
          role: message.role,
          text: `${messageStart}${author}${afterRole}${renderedText}`,
        };
      }
      return {
        role: message.role,
        text: `${messageStart}${author}${afterRole}${renderedText}${messageEnd}`,
      };
    })
    .filter(isDefined);
  return `${messageTemplate.bos ?? ""}${promptTexts
    .map((p) => p.text)
    .join("")}`;
};
