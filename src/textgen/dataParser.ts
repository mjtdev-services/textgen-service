import { safe } from "@mjtdev/engine";
import { logDebug } from "./logDebug";


export const dataParser = (data: string) => {
  logDebug("data", data);
  // if (signal?.aborted) {
  //   return undefined;
  // }
  if (!data || data === "[DONE]") {
    return undefined;
  }
  return safe(() => JSON.parse(data), { quiet: true });
};
