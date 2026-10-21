/**
 * 从 @feel-ui/tokens 生成 tokens.generated.css。
 * 数据源唯一：所有 CSS 变量均来自 tokens 包的 cssVariables 输出。
 *
 * 依赖 tokens 已构建（build:all 按拓扑序保证先构建 tokens）。
 */
import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { cssVariables } from '@feel-ui/tokens'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = resolve(__dirname, '../src/tokens.generated.css')

const banner = '/* 自动生成，请勿手动修改 —— 数据源：@feel-ui/tokens */\n'

writeFileSync(out, banner + cssVariables)
console.log(`[styles] 已生成 ${out}`)
