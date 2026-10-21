import { defineConfig, type UserConfig } from 'vitest/config'

/**
 * Feel UI 统一 Vitest 配置。
 * 默认在 Node 环境运行；纯逻辑包（cva/utils/hooks/tokens）与基于 SSR 渲染的
 * 框架组件测试均可直接使用。需要 DOM 环境的包可自行覆盖 environment。
 */
export function defineVitestConfig(overrides: UserConfig = {}): UserConfig {
  return defineConfig({
    test: {
      environment: 'node',
      include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      coverage: {
        provider: 'v8',
        include: ['packages/**/src/**'],
        exclude: ['**/dist/**', '**/*.d.ts'],
      },
    },
    ...overrides,
  })
}
