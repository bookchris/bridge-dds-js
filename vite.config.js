import dts from "vite-plugin-dts";

const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  plugins: [dts({ include: ["lib"] })],
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/main.ts"),
      name: "bridge-dds",
      fileName: (format) => `bridge-dds.${format}.js`,
    },
  },
});
