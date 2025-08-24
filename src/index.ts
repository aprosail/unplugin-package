/*
Copyright (c) 2025~present James Aprosail
Unplugin Package is licensed under Mulan PSL v2 or the MIT License.
You can use this software according to the terms and conditions of 
the Mulan PSL v2 or the MIT License.

You may obtain a copy of Mulan PSL v2 at: https://license.coscl.org.cn/MulanPSL2
You may obtain a copy of the MIT License at: https://mit-license.org/

THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
See the Mulan PSL v2 or the MIT License for more details.
*/

import {
  cpSync,
  existsSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { join, relative } from "node:path"
import { cwd } from "node:process"
import { createUnplugin } from "unplugin"

const name = "unplugin-package"
const dim = (raw: string) => `\x1b[2m${raw}\x1b[22m`
const green = (raw: string) => `\x1b[32m${raw}\x1b[39m`
const magenta = (raw: string) => `\x1b[35m${raw}\x1b[39m`

function log(message: string) {
  // oxlint-disable-next-line no-console
  console.log(`${dim(`[${name}]`)} ${message}`)
}

export interface UnpluginPackageOptions {
  /**
   * Root directory where `package.json` locates,
   * current working directory (cwd) by default.
   *
   * 根目录，即`package.json`所在目录。默认为当前工作路径(cwd)。
   */
  root?: string

  /**
   * Output directory where preprocessed `package.json`
   * and static files will output into,
   * `out` directory inside the {@link root} directory by default.
   *
   * 输出目录，即处理后的`package.json`和静态文件将输出到的目录。
   * 默认值为{@link root}下的`out`目录。
   */
  outdir?: string

  /**
   * Whether to empty {@link outdir} before bundling,
   * default to `true`.
   *
   * 是否在打包前清空{@link outdir}目录，默认值为`true`。
   */
  emptyOutdir?: boolean

  /**
   * The files that will be copied from the {@link root} directory
   * to the {@link outdir} directory.
   *
   * 1. Source files configured here are paths relative to the root directory.
   * 2. When a file not exist, it will be skipped.
   * 3. All paths here are case-sensitive.
   * 4. Directories and symbolic links are also supported.
   * 5. The default value is `["README.md", "LICENSE", "CHANGELOG.md"]`.
   *
   * 需要复制的文件列表，这些文件将从{@link root}被复制到{@link outdir}。
   *
   * 1. 这里配置的是相对于根目录的路径。
   * 2. 当文件不存在时，直接跳过，不会报错，也不会输出。
   * 3. 所有路径都大小写敏感。
   * 4. 支持复制目录和符号链接。
   * 5. 默认值为`["README.md", "LICENSE", "CHANGELOG.md"]`。
   */
  copyFiles?: string[]

  /**
   * Whether to compile the manifest file (`package.json`)
   * from {@link root} to {@link outdir}, default to `true`.
   * You may configure {@link manifestOverride} to customize how to process.
   *
   * 是否编译`package.json`文件，默认值为`true`。
   * 如果启用会将位于{@link root}的`package.json`文件编译到{@link outdir}。
   * 可通过配置{@link manifestOverride}来自定义处理逻辑。
   */
  compileManifest?: boolean

  /**
   * Whether to avoid unnecessary whitespaces during the compilation
   * process of the manifest file (`package.json`), default to `true`.
   *
   * 是否压缩`package.json`文件，默认值为`true`。
   * 如果启用，会将`package.json`文件压缩为一行，否则会以2个空格作为缩进。
   */
  compressManifest?: boolean

  /**
   * Override the manifest file (`package.json`)
   * with the given options.
   * By default, it will remove the `scripts` and `devDependencies` field.
   *
   * 可通过配置{@link manifestOverride}来自定义处理逻辑。
   * 默认会移除`scripts`和`devDependencies`字段。
   */
  manifestOverride?: (raw: Record<string, unknown>) => Record<string, unknown>

  /**
   * Encoding of the manifest file (`package.json`), for Json parsing,
   * default to `utf8`.
   *
   * 解析`package.json`时所用的编码，默认为`utf8`。
   */
  manifestEncoding?: BufferEncoding
}

/**
 * Unplugin entrypoint, where you can call plugin for current bundler.
 *
 * 在此变量后面点(.)加当前使用的打包工具，即输出对应的插件函数。
 *
 * ```ts
 * import unpluginPackage from "unplugin-package"
 *
 * unpluginPackage.vite() // as vite plugin.
 * unpluginPackage.rollup() // as rollup plugin.
 * unpluginPackage.rolldown() // as rolldown plugin.
 * unpluginPackage.webpack() // as webpack plugin.
 * unpluginPackage.rspack() // as rspack plugin.
 * unpluginPackage.esbuild() // as esbuild plugin.
 * unpluginPackage.farm() // as farm plugin.
 * ```
 */
const unplugin = createUnplugin((options?: UnpluginPackageOptions) => {
  const root = options?.root ?? cwd()
  const outdir = options?.outdir ?? join(root, "out")

  function emptyOutdir() {
    if (!(options?.emptyOutdir ?? true)) return
    if (!existsSync(outdir) || !statSync(outdir).isDirectory()) return
    for (const name of readdirSync(outdir)) {
      rmSync(join(outdir, name), { recursive: true })
    }
    log(`${dim("outdir emptied:")} ${magenta(relative(root, outdir))}`)
  }

  function copyFiles() {
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
  }

  function compileManifest() {
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
      JSON.parse(readFileSync(join(root, manifestFilename), manifestEncoding)),
    )

    const result = compressManifest
      ? JSON.stringify(compiledManifest)
      : JSON.stringify(compiledManifest, null, 2)
    writeFileSync(join(outdir, manifestFilename), result)
    log(`${dim("manifest compiled:")} ${green(manifestFilename)}`)
  }

  return {
    name: "unplugin-package",
    buildStart() {
      emptyOutdir()
    },
    buildEnd() {
      copyFiles()
      compileManifest()
    },
  }
})

export default unplugin
export const vite = unplugin.vite
export const rollup = unplugin.rollup
export const rolldown = unplugin.rolldown
export const webpack = unplugin.webpack
export const rspack = unplugin.rspack
export const esbuild = unplugin.esbuild
export const farm = unplugin.farm
