import plugin from 'tailwindcss/plugin'
import { tokens } from '@feel-ui/tokens'

/**
 * Feel UI Tailwind 插件。
 *
 * - 将 tokens 语义色映射为 Tailwind 颜色工具类（`bg-primary`、`text-muted-foreground` 等）；
 * - 圆角、间距、字体映射为 CSS 变量引用；
 * - 内置 `darkMode: ['class']`（Shadcn 标准，配合 `.dark` 类切换）。
 *
 * 宿主在 tailwind.config 中启用：`plugins: [feelUiTailwindPlugin]`。
 */
export const feelUiTailwindPlugin = plugin(
  ({ addBase }) => {
    addBase({
      '*': { borderColor: `hsl(var(--border))` },
      body: {
        backgroundColor: `hsl(var(--background))`,
        color: `hsl(var(--foreground))`,
        fontFamily: `var(--font-sans)`,
      },
    })
  },
  {
    darkMode: ['class'],
    theme: {
      extend: {
        colors: Object.fromEntries(
          Object.keys(tokens.colors.light).map((name) => [name, `hsl(var(--${name}))`]),
        ),
        borderRadius: {
          sm: 'var(--radius-sm)',
          md: 'var(--radius-md)',
          lg: 'var(--radius-lg)',
          xl: 'var(--radius-xl)',
        },
        spacing: Object.fromEntries(
          Object.entries(tokens.spacing).map(([key]) => [key, `var(--spacing-${key})`]),
        ),
        fontFamily: {
          sans: 'var(--font-sans)',
          mono: 'var(--font-mono)',
        },
      },
    },
  },
)
