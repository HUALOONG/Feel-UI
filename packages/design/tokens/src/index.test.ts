import { describe, expect, it } from 'vitest'
import { cssVariables, generateCssVariables, lightColors, darkColors, radius, spacing, tokens } from './index'

describe('@feel-ui/tokens', () => {
  it('导出亮暗两套色板', () => {
    expect(lightColors.primary).toBe('240 5.9% 10%')
    expect(darkColors.background).toBe('240 10% 3.9%')
    expect(Object.keys(lightColors)).toEqual(Object.keys(darkColors))
  })

  it('CSS 变量包含亮色与暗色作用域', () => {
    const css = generateCssVariables()
    expect(css).toContain(':root {')
    expect(css).toContain('.dark {')
    expect(css).toContain('--primary: 240 5.9% 10%;')
    expect(css).toContain('--radius: 0.625rem;')
    expect(css).toContain('--spacing-4: 1rem;')
    expect(css).toContain('--font-sans:')
  })

  it('cssVariables 与 generateCssVariables 一致', () => {
    expect(cssVariables).toBe(generateCssVariables())
  })

  it('聚合 tokens 结构完整', () => {
    expect(tokens.colors.light.background).toBe(lightColors.background)
    expect(tokens.radius.lg).toBe(radius.lg)
    expect(tokens.spacing['4']).toBe(spacing['4'])
    expect(tokens.typography.mono.length).toBeGreaterThan(0)
  })
})
