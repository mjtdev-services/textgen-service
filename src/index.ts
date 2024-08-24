// import { loadEnvStatic } from "./loadEnvStatic";
import { loadEnv } from "./loadEnvDeno";
import { main } from "./main";


(async () => {
  try {
    // await import("dotenv/config");
    const env = await loadEnv();
    main(env);
  } catch (error) {
    console.error(error);
  }
})();
