import { join } from "node:path"
import { defineConfig } from "rolldown"
import unpluginDts from "unplugin-dts"
import unpluginPackage, { defaultFilesToCopy } from "./src/index"

const root = import.meta.dirname
const outdir = join(root, "out")

export default defineConfig({
  plugins: [
    // Don't bundle dts because the unplugin export type might hang.
    unpluginDts.rolldown(),
    unpluginPackage.rolldown({
      root,
      outdir,
      emptyOutdir: true,
      copyFiles: [...defaultFilesToCopy, "README.zh.md", "LICENSE-mulan"],
    }),
  ],
  external(id, _parentId, isResolved) {
    if (isResolved) return false
    if (id.startsWith("node:")) return true
    return ["unplugin"].includes(id)
  },
  input: join(root, "src", "index.ts"),
  output: [
    { file: join(outdir, "index.js"), format: "esm", exports: "named" },
    { file: join(outdir, "index.cjs"), format: "commonjs", exports: "named" },
  ],
})
