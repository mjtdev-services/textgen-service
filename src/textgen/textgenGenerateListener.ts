import { type ConnectionListener } from "@mjtdev/engine";
import type { TextgenConnectionMap } from "@mjtdev/textgen-service-common";
import { sendTextgenStreamingResponse } from "./sendTextgenStreamingResponse";

export const textgenGenerateListener: ConnectionListener<
  TextgenConnectionMap,
  "textgen.generate"
> = async (props) => {
  // Add your code logic here
  try {
    const { stream } = props.detail.body;
    if (stream) {
      return sendTextgenStreamingResponse(props);
    }
    // return sendTextgenNonStreamingResponse(props);
    return { done: true };
  } catch (error) {
    console.log("textgenGenerateListener error", error);
  }
};
