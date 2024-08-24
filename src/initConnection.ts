import { Messages, assertValue } from "@mjtdev/engine";
import type { Env } from "./Env";

import type { TextgenConnectionMap } from "@mjtdev/textgen-service-common";
import { textgenGenerateListener } from "./textgen/textgenGenerateListener";

export const initConnection = async (env: Env) => {
  const url = assertValue(env.NATS_URL);
  console.log("NATS_URL", url);

  await Messages.createConnection<TextgenConnectionMap, Env>({
    subscribers: {
      "textgen.generate": textgenGenerateListener,
    },
    options: { log: console.log },
    server: [url],
    env,
  });
  console.log("initConnection: init complete");
};
