import { build } from "esbuild";
// import { dependencies, peerDependencies } from './package.json';

const sharedConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: false,
  // external: ['fs', 'path', 'os', 'crypto', 'stream']
  // external: ['crypto']
  // external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
};

build({
  ...sharedConfig,
  // platform: 'browser',
  platform: 'node',
  format: 'esm',
  target: 'esnext',
  outfile: "dist/index.js",
  logLevel: 'info',
});
