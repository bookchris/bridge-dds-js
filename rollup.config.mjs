import typescript from "@rollup/plugin-typescript";
import { wasm } from "@rollup/plugin-wasm";
import fs from "fs";
import path from "path";

export default {
  input: ["src/dll.ts", "out.js", "out.wasm"],
  output: {
    dir: "dist",
    format: "cjs",
  },
  /*
    {
      file: "dist/index.es.js",
      format: "es",
    },
    */

  plugins: [
    {
      name: "Erase Dist",
      buildStart() {
        fs.rmSync(path.resolve("dist"), { recursive: true, force: true });
      },
    },
    typescript(),
    wasm(),
  ],
};
