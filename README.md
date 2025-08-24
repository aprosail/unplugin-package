# Unplugin Package

Bundler plugins for copying manifest files into output.
This plugin can help you to copy only necessary files into
the output directory, and override some fields of `package.json` in the output.
Those functions are useful when publishing a package to registries like NPM,
or bundling extension packs such as VSCode extensions.

## Usages

Only support ESModule (esm) package, CommonJS is not supported.

<!-- vite -->
<details>
  <summary>Vite</summary>

In `vite.config.ts`:

```ts
import { defineConfig } from "vite"
import unpluginPackage from "unplugin-package"

export default defineConfig({
  plugins: [unpluginPackage.vite()],
})
```

</details>

<!-- rollup -->
<details>
  <summary>Rollup</summary>

In `rollup.config.js`:

```js
import { defineConfig } from "rollup"
import unpluginPackage from "unplugin-package"

export default defineConfig({
  plugins: [unpluginPackage.rollup()],
})
```

</details>

<!-- rolldown -->
<details>
  <summary>Rolldown</summary>

In `rolldown.config.ts`:

```ts
import { defineConfig } from "rolldown"
import unpluginPackage from "unplugin-package"

export default defineConfig({
  plugins: [unpluginPackage.rolldown()],
})
```

</details>

## License

This package is released under the MIT License.
