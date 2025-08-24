import { cpSync, existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { cwd } from "node:process"
import { createUnplugin } from "unplugin"

const name = "unplugin-package"
const dim = (raw: string) => `\x1b[2m${raw}\x1b[22m`
const magenta = (raw: string) => `\x1b[35m${raw}\x1b[39m`

function log(message: string) {
  // oxlint-disable-next-line no-console
  console.log(`${dim(`[${name}]`)} ${message}`)
}

export interface UnpluginPackageOptions {
  /**
   * Root directory where `package.json` locates,
   * current working directory (cwd) by default.
   */
  root?: string

  /**
   * Output directory where preprocessed `package.json`
   * and static files will output into,
   * `out` directory inside the {@link root} directory by default.
   */
  outdir?: string

  /**
   * Those files will be copied from the {@link root} directory
   * to the {@link outdir} directory.
   *
   * 1. Source files configured here are paths relative to the root directory.
   * 2. When a file not exist, it will be skipped.
   * 3. All paths here are case-sensitive.
   * 4. Directories and symbolic links are also supported.
   * 5. The default value is `["README.md", "LICENSE", "CHANGELOG.md"]`
   *
   */
  copyFiles?: string[]

  /**
   * Whether to compile the manifest file (`package.json`)
   * from {@link root} to {@link outdir}, default to `true`.
   */
  compileManifest?: boolean

  /**
   * Whether to avoid unnecessary whitespaces during the compilation
   * process of the manifest file (`package.json`), default to `true`.
   */
  compressManifest?: boolean

  /**
   * Override the manifest file (`package.json`)
   * with the given options.
   * By default, it will remove the `scripts` and `devDependencies` field.
   */
  manifestOverride?: (raw: Record<string, unknown>) => Record<string, unknown>

  /**
   * Encoding of the manifest file, for Json parsing,
   * default to `utf8`.
   */
  manifestEncoding?: BufferEncoding
}

export const unplugin = createUnplugin((options?: UnpluginPackageOptions) => ({
  name: "unplugin-package",
  buildEnd() {
    const root = options?.root ?? cwd()
    const outdir = options?.outdir ?? join(root, "out")

    // Copy files.
    ;(function copyFiles() {
      const copyFiles = options?.copyFiles ?? [
        "README.md",
        "LICENSE",
        "CHANGELOG.md",
      ]
      for (const filename of copyFiles) {
        const src = join(root, filename)
        const out = join(outdir, filename)
        if (existsSync(src)) {
          cpSync(src, out)
          log(`${dim("copied:")} ${magenta(filename)}`)
        }
      }
    })()

    // Compile manifest.
    ;(function compileManifest() {
      if (!(options?.compileManifest ?? true)) return

      const compressManifest = options?.compressManifest ?? true
      const manifestEncoding = options?.manifestEncoding ?? "utf8"
      const manifestOverride =
        options?.manifestOverride ??
        ((manifest) => {
          manifest["scripts"] = undefined
          manifest["devDependencies"] = undefined
          return manifest
        })

      const manifestFilename = "package.json"
      const compiledManifest = manifestOverride(
        JSON.parse(
          readFileSync(join(root, manifestFilename), manifestEncoding),
        ),
      )

      const result = compressManifest
        ? JSON.stringify(compiledManifest)
        : JSON.stringify(compiledManifest, null, 2)
      writeFileSync(join(outdir, manifestFilename), result)
    })()
  },
}))

export default unplugin
export const vite = unplugin.vite
export const rollup = unplugin.rollup
export const rolldown = unplugin.rolldown
export const webpack = unplugin.webpack
export const rspack = unplugin.rspack
export const esbuild = unplugin.esbuild
export const farm = unplugin.farm
