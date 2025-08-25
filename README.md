# Unplugin Package

[English](./README.md) |
[中文简体](./README.zh.md)

Bundler plugins for copying manifest files into output.
This plugin can help you to copy only necessary files into
the output directory, and override some fields of `package.json` in the output.
Those functions are useful when publishing a package to registries like NPM,
or bundling extension packs such as VSCode extensions.

## Usages

```ts
import unpluginPackage from "unplugin-package"

unpluginPackage.vite() // as vite plugin.
unpluginPackage.rollup() // as rollup plugin.
unpluginPackage.rolldown() // as rolldown plugin.
unpluginPackage.webpack() // as webpack plugin.
unpluginPackage.rspack() // as rspack plugin.
unpluginPackage.esbuild() // as esbuild plugin.
unpluginPackage.farm() // as farm plugin.
```

## Example

```ts
import { join } from "node:path"

const root = import.meta.dirname
const outdir = join(root, "out")

// Use the current bundler flavor of the plugin.
unpluginPackage.xxx({
  root,
  outdir,
  emptyOutdir: true,
  copyFiles: [...defaultFilesToCopy, "addition-file", "not-exist-file"],
  manifestOverride(raw) {
    const manifest = defaultManifestOverride(raw)
    manifest["homepage"] = "https://yourproject.example.com/xxx"
    return manifest
  },
})
```

## License

This package is released under [the MIT License](./LICENSE)
or [Mulan PSL v2](./LICENSE-mulan).
