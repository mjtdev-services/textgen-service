import { existsSync, resolve, readFileSync, cwd } from "./deno/denoFs";

export const loadEnv = (filePath: string = ".env") => {
  const envPath = resolve(cwd(), filePath);
  if (!existsSync(envPath)) {
    console.warn(`Warning: ${filePath} file not found.`);
    return {};
  }

  const envFile = readFileSync(envPath, "utf-8");
  const envVariables = envFile.split("\n");

  const result: Record<string, string> = {};

  envVariables.forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) {
      // Remove any surrounding quotation marks from the value
      const cleanedValue = value
        .trim()
        .replace(/^["'](.+(?=["']$))["']$/, "$1");
      result[key.trim()] = cleanedValue;
    }
  });
  return result;
};
