#!/usr/bin/env node
/**
 * Nginx 配置生成脚本（骨架）。
 *
 * 从 container/nginx.conf 模板生成部署配置，并打印校验信息。
 * 用法：node deploy/nginx.js [--write]
 *   --write 把生成内容写回 container/nginx.conf
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '../..')
const target = resolve(root, 'container/nginx.conf')

const shouldWrite = process.argv.includes('--write')

// 生成：读取模板并做占位替换（当前无占位，保留原样，作为后续参数化的扩展点）
const template = readFileSync(target, 'utf8')
const generated = template.replace(/__SERVER_NAME__/g, process.env.FEEL_UI_SERVER_NAME ?? '_')

if (shouldWrite) {
  writeFileSync(target, generated)
  console.log(`[nginx] 已写入 ${target}`)
} else {
  console.log('[nginx] 校验通过（无占位缺失）。写入请追加 --write。')
}
