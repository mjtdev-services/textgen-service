import type { Env } from "./Env";
import { initConnection } from "./initConnection";

// Main function to start the service
export const main = async (env: Env) => {
  await initConnection(env);
};
