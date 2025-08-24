import { join } from "node:path"
import { defineConfig } from "rolldown"
import unpluginPackage from "unplugin-package"

const root = import.meta.dirname
const outdir = join(root, "out")

export default defineConfig({
  plugins: [
    unpluginPackage.rolldown({
      root,
      outdir,
      manifestOverride: (manifest) => {
        manifest["type"] = undefined
        manifest["scripts"] = undefined
        manifest["devDependencies"] = undefined
        manifest["main"] = "example.js"
        return manifest
      },
    }),
  ],
  input: join(root, "src", "example.ts"),
  output: {
    file: join(outdir, "example.js"),
    format: "commonjs",
  },
})
