/** 圆角令牌：与 Shadcn UI 一致的相对比例 */
export const radius = {
  sm: 'calc(var(--radius) - 4px)',
  md: 'calc(var(--radius) - 2px)',
  lg: 'var(--radius)',
  xl: 'calc(var(--radius) + 4px)',
  /** 基准半径，作为其余圆角的比例根 */
  base: '0.625rem',
} as const

export type RadiusToken = keyof typeof radius
