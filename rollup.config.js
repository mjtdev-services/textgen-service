import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts", // Replace with your TypeScript entry file
  output: {
    file: "dist/index.js",
    format: "esm",
  },
  plugins: [
    resolve({ browser: true, preferBuiltins: false }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json", // Specify the path to your tsconfig.json
    }),
    json(),
  ],
};
