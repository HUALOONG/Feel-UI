import { describe, expect, it } from 'vitest'
import { getButtonClassNames as reactGetClassNames } from '../../src/button'
import { getButtonClassNames as vueGetClassNames } from '../../../vue/src/button'

/**
 * React / Vue 契约测试：对比两侧组件在相同 props 输入下的类名输出。
 * 新增或修改变体时，两侧必须同步修改并保持本测试通过。
 */
type VariantOption = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
type SizeOption = 'sm' | 'md' | 'lg'

const matrix: Array<{ variant?: VariantOption; size?: SizeOption }> = [
  {},
  { variant: 'primary' },
  { variant: 'secondary' },
  { variant: 'outline' },
  { variant: 'ghost' },
  { variant: 'destructive' },
  { size: 'sm' },
  { size: 'lg' },
  { variant: 'outline', size: 'sm' },
  { variant: 'destructive', size: 'lg' },
  { variant: 'primary', size: 'lg' },
]

describe('Button 契约测试（React ⇄ Vue 类名一致）', () => {
  it('所有变体组合的类名输出完全一致', () => {
    for (const props of matrix) {
      const react = reactGetClassNames(props)
      const vue = vueGetClassNames(props)
      expect(react, `props=${JSON.stringify(props)}`).toBe(vue)
    }
  })

  it('附加类名行为一致', () => {
    expect(reactGetClassNames({ variant: 'outline', className: 'x y' })).toBe(
      vueGetClassNames({ variant: 'outline', class: 'x y' }),
    )
  })
})
