# Unplugin Package

[English](./README.md) |
[中文简体](./README.zh.md)

Bundler plugins for copying manifest files into output.
This plugin can help you to copy only necessary files into
the output directory, and override some fields of `package.json` in the output.
Those functions are useful when publishing a package to registries like NPM,
or bundling extension packs such as VSCode extensions.

## Usages

1. Only support ESModule (esm) package, CommonJS is not supported.
2. Read corresponding comment documentation for more details.
   This package is very simple, it's recommended to read the source code.
3. You may refer to the [`example`](./example) directory for more details.

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

## License

This package is released under [the MIT License](./LICENSE)
or [Mulan PSL v2](./LICENSE-mulan).
