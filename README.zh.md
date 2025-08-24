# Unplugin Package

[English](./README.md) |
[中文简体](./README.zh.md)

用于将静态资源文件从根目录复制到输出目录的通用插件([unplugin](https://unplugin.unjs.io/))，常用于打包和发布NPM库时将所有需要打包的内容输出到Git忽略的输出目录，以避免复杂的`.npmignore`等配置的使用场景，也适合用于精简VSCode等扩展的打包体积。

## 使用方法

1. 此库仅支持ESModule(esm)，不支持CommonJS(cjs)。
2. 具体配置直接读相关文档注释。本库很简单，推荐直接读源码。
3. 可参考[`example`](./example)目录下的例子。

```ts
import unpluginPackage from "unplugin-package"

unpluginPackage.vite() // 作为vite插件使用
unpluginPackage.rollup() // 作为rollup插件使用
unpluginPackage.rolldown() // 作为rolldown插件使用
unpluginPackage.webpack() // 作为webpack插件使用
unpluginPackage.rspack() // 作为rspack插件使用
unpluginPackage.esbuild() // 作为esbuild插件使用
unpluginPackage.farm() // 作为farm插件使用
```

## 开源协议

本库以[MIT许可证](./LICENSE)或[木兰宽松许可证](./LICENSE-mulan)开源。
