/**
 * Tailwind 插件独立入口：供宿主在 Node 环境（tailwind.config.js）引用。
 * 与 `import '@feel-ui/styles'` 不同，本入口不包含任何 CSS 注入副作用。
 * 同时提供具名导出与 default 导出，兼容 ESM 与 jiti/CommonJS 加载器。
 */
export { feelUiTailwindPlugin } from './tailwind-plugin'
export { feelUiTailwindPlugin as default } from './tailwind-plugin'
