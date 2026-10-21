import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

/**
 * @feel-ui/styles 双入口构建：
 * - index：全局样式入口（`import '@feel-ui/styles'`，注入 tokens CSS 变量与默认样式）
 * - plugin：Tailwind 插件入口（`import '@feel-ui/styles/plugin'`，供宿主 tailwind.config 在 Node 环境引用，无 CSS 副作用）
 */
export default defineConfig({
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        plugin: 'src/plugin.ts',
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    outDir: 'dist',
    sourcemap: true,
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: (id) => id === '@feel-ui/tokens' || id === 'tailwindcss' || id.startsWith('@feel-ui/tokens/') || id.startsWith('tailwindcss/'),
    },
  },
  plugins: [
    dts({ tsconfigPath: './tsconfig.json', insertTypesEntry: true, include: ['src'] }),
    cssInjectedByJsPlugin(),
  ],
})
