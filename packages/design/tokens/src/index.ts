import { lightColors, darkColors } from './colors'
import { radius } from './radius'
import { spacing } from './spacing'
import { typography } from './typography'

export * from './colors'
export * from './radius'
export * from './spacing'
export * from './typography'

/** 全部设计令牌的聚合对象 */
export const tokens = {
  colors: { light: lightColors, dark: darkColors },
  radius,
  spacing,
  typography,
} as const

export type Tokens = typeof tokens

type TokenRecord = Record<string, string>

/** 从一组命名令牌生成 `--name: value;` 声明块 */
function toCssDeclarations(record: TokenRecord, prefix = ''): string {
  return Object.entries(record)
    .map(([key, value]) => `  --${prefix}${key}: ${value};`)
    .join('\n')
}

/**
 * 生成全局 CSS 变量字符串（样式唯一数据源）。
 * 输出 `:root { …亮色… }` 与 `.dark { …暗色… }` 两个作用域，
 * 供 `@feel-ui/styles` 挂载为全局样式。
 */
export function generateCssVariables(): string {
  const radiusVars = toCssDeclarations(
    {
      radius: radius.base,
      'radius-sm': radius.sm,
      'radius-md': radius.md,
      'radius-lg': radius.lg,
      'radius-xl': radius.xl,
    },
    '',
  )
  const spacingVars = toCssDeclarations(spacing, 'spacing-')
  const fontVars = toCssDeclarations(
    { sans: typography.sans, mono: typography.mono },
    'font-',
  )

  return [
    ':root {',
    toCssDeclarations(lightColors as unknown as TokenRecord),
    radiusVars,
    spacingVars,
    fontVars,
    '}',
    '',
    '.dark {',
    toCssDeclarations(darkColors as unknown as TokenRecord),
    '}',
    '',
  ].join('\n')
}

/** 预生成的 CSS 变量字符串（构建时快照，避免重复计算） */
export const cssVariables: string = generateCssVariables()
