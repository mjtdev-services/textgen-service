import type { OpenRouterTextgenRequest } from "./3rd-party/open-router/OpenRouterTextgenRequest";
import type { TextgenChatTemplateType } from "./textgen/TEXTGEN_CHAT_TEMPLATES";
import type { TextgenPromptStyleType } from "./textgen/TEXTGEN_PROMPT_STYLES";
import type { TextgenProviderType } from "./textgen/TEXTGEN_PROVIDERS";

export type TextgenConnectionMap = {
  "textgen.generate": {
    request: {
      options?: Partial<{
        templateType: TextgenChatTemplateType;
        provider: TextgenProviderType;
        promptStyle: TextgenPromptStyleType;
        stopAfter: string | string[];
        stop: string | string[];
      }>;
      body: OpenRouterTextgenRequest;
    };
    response: {
      delta?: string;
      text?: string;
      done?: boolean;
    };
    headers: {
      url?: string;
      authToken?: string;
    };
  };

  // "data.upsert": {
  //   request: { object: DataObject };
  //   response: string;
  //   headers: { namespace: string };
  // };
  // "data.delete": {
  //   request: string;
  //   response: boolean;
  //   headers: { namespace: string };
  // };
  // "data.get": {
  //   request: string | string[];
  //   response: { objects: DataObject[] };
  //   headers: { namespace: string };
  // };
  // "data.search": {
  //   request: string;
  //   response: { objectIds: string[] };
  //   headers: { namespace: string };
  // };
};
