import { type ConnectionListener, isDefined, Parsers } from "@mjtdev/engine";
import {
  type TextgenConnectionMap,
  DEFAULT_STOP,
} from "@mjtdev/textgen-service-common";
import {
  type OobaboogaTextgenResponse,
  isOobaboogaChoice,
} from "@mjtdev/textgen-service-common";
import {
  type OpenRouterTextgenResponse,
  isOpenrouterStreamingChoice,
} from "@mjtdev/textgen-service-common";
import type { Env } from "../Env";
import { logDebug } from "./logDebug";

export const createConsumer =
  ({
    buffer,
    finishedConsumingAbortController,
    send,
    stop = DEFAULT_STOP,
    stopAfter = [],
  }: {
    send: Parameters<
      ConnectionListener<TextgenConnectionMap, "textgen.generate", Env>
    >[0]["send"];
    buffer: string[];
    finishedConsumingAbortController: AbortController;
    stopAfter?: string | string[];
    stop?: string | string[];
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
        stop
      );

      const [stopAfterTextFragment, stopAfterStopped] = Parsers.detectStopAfter(
        fullStoppedTextFragment,
        stopAfter
      );

      if (fullStopped || stopAfterStopped) {
        finishedConsumingAbortController.abort();
        send({
          delta: delta ?? undefined,
          text: stopAfterTextFragment,
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
      console.error(err);
      return true;
    }
  };
