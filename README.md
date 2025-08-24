# Unplugin Package

Bundler plugins for copying manifest files into output.

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
