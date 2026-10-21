import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

/**
 * Feel UI 统一库打包配置模板。
 *
 * 使用方式（各类库包 vite.config.ts）：
 * ```ts
 * import { defineLibraryConfig } from '@feel-ui/vite'
 * export default defineLibraryConfig({
 *   entry: 'src/index.ts',
 *   name: 'FeelUiTokens',
 *   external: [],
 * })
 * ```
 *
 * @param {object} options
 * @param {string} options.entry 库入口（相对该包根目录）
 * @param {string} options.name  UMD/全局变量名（仅用于声明，ESM 下不影响）
 * @param {string[]} [options.external] 需要外部化的依赖前缀（框架、workspace 包等）
 * @param {import('vite').PluginOption[]} [options.plugins] 追加插件
 * @param {string[]} [options.formats] 输出格式，默认仅 ['es']
 * @param {string} [options.outDir] 输出目录，默认 dist
 */
export function defineLibraryConfig({
  entry,
  name,
  external = [],
  plugins = [],
  formats = ['es'],
  outDir = 'dist',
}) {
  return defineConfig({
    build: {
      lib: {
        entry,
        name,
        formats,
        fileName: (format) => (format === 'es' ? 'index.js' : `index.${format}.js`),
      },
      outDir,
      sourcemap: true,
      minify: false,
      cssCodeSplit: false,
      rollupOptions: {
        external: (id) => external.some((prefix) => id === prefix || id.startsWith(`${prefix}/`)),
        output: {
          exports: 'named',
          preserveModules: false,
        },
      },
    },
    plugins: [
      dts({
        tsconfigPath: './tsconfig.json',
        rollupTypes: false,
        insertTypesEntry: true,
        include: ['src'],
      }),
      ...plugins,
    ],
  })
}
