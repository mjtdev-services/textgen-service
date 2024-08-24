import type { TextgenConnectionMap } from "@mjtdev/textgen-service-common";
import type { OobaboogaTextgenRequest } from "@mjtdev/textgen-service-common/src/3rd-party/oobabooga/OobaboogaTextgenRequest";
import type { OpenRouterTextgenRequest } from "@mjtdev/textgen-service-common/src/3rd-party/open-router/OpenRouterTextgenRequest";
import { TEXTGEN_CHAT_TEMPLATES } from "@mjtdev/textgen-service-common/src/textgen/TEXTGEN_CHAT_TEMPLATES";
import { chatMessagesToPromptText } from "@mjtdev/textgen-service-common/src/textgen/chatMessagesToPromptText";

export const toTextgenExtendedBody = (
  request: TextgenConnectionMap["textgen.generate"]["request"]
) => {
  console.log("toTextgenExtendedBody: request", request);
  const { body, options = {} } = request;
  const { promptStyle = "message", templateType = "chatML", stop } = options;

  const extendedBody: OobaboogaTextgenRequest & OpenRouterTextgenRequest = {
    max_tokens: 256,
    prompt:
      promptStyle === "raw"
        ? chatMessagesToPromptText({
            messages: body.messages ?? [],
            messageTemplate: TEXTGEN_CHAT_TEMPLATES[templateType],
          })
        : undefined,
    ...body,
    messages: promptStyle === "raw" ? undefined : body.messages,
    stop,
  };
  return extendedBody;
};
