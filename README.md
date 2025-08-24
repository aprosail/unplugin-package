# Unplugin Package

Bundler plugins for copying manifest files into output.
This plugin can help you to copy only necessary files into
the output directory, and override some fields of `package.json` in the output.
Those functions are useful when publishing a package to registries like NPM,
or bundling extension packs such as VSCode extensions.

## Usages

Only support ESModule (esm) package, CommonJS is not supported.

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

This package is released under the MIT License.
