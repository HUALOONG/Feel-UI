#!/usr/bin/env node
/**
 * Semantic Release 发布钩子（骨架）。
 *
 * 在 CI 的 release.yml 中由发布流程调用，职责：
 * 1. 读取当前 git tag 作为发布版本；
 * 2. 校验 tag 与各包 version 的一致性；
 * 3. 输出发布摘要（真正的 npm publish 由 CI 的 pnpm publish 完成）。
 *
 * 用法：node build/release.js [--check]
 *   --check  仅做一致性校验，不输出发布命令
 */
import { execSync } from 'node:child_process'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '../../..')
const onlyCheck = process.argv.includes('--check')

/** @param {string} cmd */
function run(cmd) {
  return execSync(cmd, { cwd: root, encoding: 'utf8' }).trim()
}

function getTagVersion() {
  try {
    const tag = run('git describe --tags --abbrev=0')
    return tag.replace(/^v/, '')
  } catch {
    return null
  }
}

function getPackageVersions() {
  const output = run("pnpm -r --filter './packages/**' list --depth -1 --json")
  return JSON.parse(output)
    .map((p) => ({ name: p.name, version: p.version }))
    .filter((p) => p.name?.startsWith('@feel-ui/'))
}

const tagVersion = getTagVersion()

if (!tagVersion) {
  console.error('[release] 未找到 git tag，跳过发布校验。')
  process.exit(1)
}

const packages = getPackageVersions()
const mismatches = packages.filter((p) => p.version !== tagVersion)

if (mismatches.length > 0) {
  console.error(`[release] tag v${tagVersion} 与以下包版本不一致：`)
  for (const m of mismatches) console.error(`  - ${m.name}@${m.version}`)
  process.exit(1)
}

console.log(`[release] 校验通过：tag v${tagVersion} 与 ${packages.length} 个类库包版本一致。`)
for (const p of packages) console.log(`  - ${p.name}@${p.version}`)

if (!onlyCheck) {
  console.log(`\n[release] 发布命令（由 CI 执行）：`)
  console.log(`  pnpm -r --filter './packages/**' publish --no-git-checks --access public`)
}
