import { describe, expect, it } from 'vitest'
import { cn } from './index'

describe('@feel-ui/utils cn', () => {
  it('合并多个类名', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c')
  })

  it('支持条件值（clsx 语义）', () => {
    const pick = (flag: boolean) => (flag ? 'on' : null)
    expect(cn('base', pick(true), pick(false), null, undefined)).toBe('base on')
  })

  it('tailwind-merge 消除冲突类', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
  })

  it('支持对象与数组输入', () => {
    expect(cn({ a: true, b: false }, ['c', 'd'])).toBe('a c d')
  })
})
