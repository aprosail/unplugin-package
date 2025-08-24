import { join } from "node:path"
import { defineConfig } from "rolldown"
import unpluginPackage, {
  defaultFilesToCopy,
  defaultManifestOverride,
} from "unplugin-package"

const root = import.meta.dirname
const outdir = join(root, "out")

export default defineConfig({
  plugins: [
    unpluginPackage.rolldown({
      root,
      outdir,
      copyFiles: [...defaultFilesToCopy, "README.de.md"],
      manifestOverride: (raw) => {
        const manifest = defaultManifestOverride(raw)
        manifest["type"] = undefined
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
