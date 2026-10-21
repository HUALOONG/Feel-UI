import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { defineVitestConfig } from '@feel-ui/vitest'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'

const rootDir = dirname(fileURLToPath(import.meta.url))

/**
 * 工作区统一 Vitest 配置：
 * - 内部包别名指向 src（测试无需先构建）；
 * - Vue / React 插件分别处理 .vue 与 .tsx。
 */
export default defineVitestConfig({
  plugins: [vue(), react()],
  resolve: {
    alias: {
      '@feel-ui/tokens': resolve(rootDir, 'packages/design/tokens/src/index.ts'),
      '@feel-ui/cva': resolve(rootDir, 'packages/shared/cva/src/index.ts'),
      '@feel-ui/hooks': resolve(rootDir, 'packages/shared/hooks/src/index.ts'),
      '@feel-ui/utils': resolve(rootDir, 'packages/shared/utils/src/index.ts'),
      '@feel-ui/vue': resolve(rootDir, 'packages/frameworks/vue/src/index.ts'),
      '@feel-ui/react': resolve(rootDir, 'packages/frameworks/react/src/index.ts'),
    },
  },
})
