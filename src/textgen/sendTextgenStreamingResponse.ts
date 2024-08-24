import {
  type ConnectionListener,
  isDefined,
  Parsers,
  safe,
} from "@mjtdev/engine";
import type { TextgenConnectionMap } from "@mjtdev/textgen-service-common";
import {
  type OobaboogaTextgenResponse,
  isOobaboogaChoice,
} from "@mjtdev/textgen-service-common/src/3rd-party/oobabooga/OobaboogaTextgenResponse";
import {
  type OpenRouterTextgenResponse,
  isOpenrouterStreamingChoice,
} from "@mjtdev/textgen-service-common/src/3rd-party/open-router/OpenRouterTextgenResponse";
import { DEFAULT_STOP } from "@mjtdev/textgen-service-common/src/textgen/DEFAULT_STOP";
import { logDebug } from "./logDebug";
import { toTextgenFetchParams } from "./toTextgenFetchParams";

import { TextDecoderStream } from "../polyfill/TextStreamPolyfill";

import type { Env } from "../Env";
export const sendTextgenStreamingResponse: ConnectionListener<
  TextgenConnectionMap,
  "textgen.generate",
  Env
> = async ({ signal, detail, headers, send, sendError, env }) => {
  const stream = new TextDecoderStream();
  const buffer: string[] = [];
  const finishedConsumingAbortController = new AbortController();
  const finishedConsumingSignal = finishedConsumingAbortController.signal;
  const onAbort = () => {
    finishedConsumingAbortController.abort();
  };
  signal.addEventListener("abort", onAbort);
  const { authToken, body, url } = toTextgenFetchParams({
    request: detail,
    headers,
    env,
  });

  logDebug("message.detail", {
    url,
    body,
    authToken,
  });
  const response = await fetch(url, {
    method: "POST",
    // signal,
    signal: finishedConsumingSignal,
    headers: {
      Authorization: `Bearer ${authToken} `,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).catch((error) => {
    console.log(error);
    sendError(error);
    return undefined;
  }).finally(() => {
    if(signal) {
      signal.removeEventListener("abort", onAbort);
    }
  });
  if (!response || !response.ok || !response.body) {
    throw new Error(`Bad response: ${response?.status}`, { cause: response });
  }

  const pipe = response.body.pipeThrough(stream);
  const reader = pipe.getReader();

  await Parsers.createSseParser({
    signal,
    consumer: createConsumer({
      buffer,
      finishedConsumingAbortController,
      send,
    }),
    reader,
    onError: async (error) => {
      sendError(error);
    },
    onDone: () => {
      console.log("ON DONE");
    },
    dataParser,
  });
  // send sentinel message to indicate that the stream is done
  send();
};

const dataParser = (data: string) => {
  logDebug("data", data);
  // if (signal?.aborted) {
  //   return undefined;
  // }
  if (!data || data === "[DONE]") {
    return undefined;
  }
  return safe(() => JSON.parse(data), { quiet: true });
};

const createConsumer =
  ({
    buffer,
    finishedConsumingAbortController,
    send,
  }: {
    send: Parameters<
      ConnectionListener<TextgenConnectionMap, "textgen.generate", Env>
    >[0]["send"];
    buffer: string[];
    finishedConsumingAbortController: AbortController;
  }) =>
  async (
    value: OpenRouterTextgenResponse | OobaboogaTextgenResponse | undefined,
    done: boolean
  ) => {
    // logDebug("consuming", { value, done });
    try {
      if (isOpenrouterStreamingChoice(value)) {
        if (isDefined(value.finish_reason)) {
          logDebug(`finish_reason: '${value.finish_reason}'`);
        }
      }
      const choice = value?.choices?.[0];
      const delta = isOpenrouterStreamingChoice(choice)
        ? choice.delta.content
        : isOobaboogaChoice(choice)
        ? choice.text
        : undefined;
      buffer.push(delta ?? "");

      const bufferText = buffer.join("");
      const [fullStoppedTextFragment, fullStopped] = Parsers.detectStop(
        bufferText,
        DEFAULT_STOP
      );
      if (fullStopped) {
        finishedConsumingAbortController.abort();
        send({
          delta: delta ?? undefined,
          text: fullStoppedTextFragment,
          done: true,
        });
        return true;
      }

      if (isDefined(fullStoppedTextFragment)) {
        send({
          delta: delta ?? undefined,
          text: fullStoppedTextFragment,
          done,
        });
      }

      if (done) {
        return true;
      }
    } catch (err) {
      console.log(err);
      return true;
    }
  };
