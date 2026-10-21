#!/usr/bin/env node
/**
 * Docker 容器构建与推送脚本（骨架）。
 *
 * 构建并（可选）推送 feel-ui 文档/演示容器镜像。
 * 用法：node deploy/docker.js [image] [--push]
 *   默认镜像名 feel-ui:latest；--push 时同时推送（需已登录镜像仓库）。
 */
import { execSync } from 'node:child_process'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '../..')

const image = process.argv[2] ?? 'feel-ui:latest'
const shouldPush = process.argv.includes('--push')

const dockerfile = resolve(root, 'container/Dockerfile')

console.log(`[docker] 构建镜像 ${image}（Dockerfile: container/Dockerfile）`)
execSync(`docker build -f ${dockerfile} -t ${image} ${root}`, { stdio: 'inherit' })

if (shouldPush) {
  console.log(`[docker] 推送镜像 ${image}`)
  execSync(`docker push ${image}`, { stdio: 'inherit' })
} else {
  console.log('[docker] 构建完成。需要推送请追加 --push。')
}
