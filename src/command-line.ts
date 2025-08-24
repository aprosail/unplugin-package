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

import { name } from "./manifest.ts"

export const dim = (raw: string) => `\x1b[2m${raw}\x1b[22m`
export const red = (raw: string) => `\x1b[31m${raw}\x1b[39m`
export const green = (raw: string) => `\x1b[32m${raw}\x1b[39m`
export const yellow = (raw: string) => `\x1b[33m${raw}\x1b[39m`
export const magenta = (raw: string) => `\x1b[35m${raw}\x1b[39m`

export function log(message: string) {
  // oxlint-disable-next-line no-console
  console.log(`${dim(`[${name}]`)} ${message}`)
}
