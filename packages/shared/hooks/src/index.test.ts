import { describe, expect, it } from 'vitest'
import { createIdGenerator, createUseControllableState, mergeSlotProps } from './index'

describe('@feel-ui/hooks createIdGenerator', () => {
  it('生成带前缀的递增 ID', () => {
    const gen = createIdGenerator('btn')
    expect(gen()).toBe('btn-1')
    expect(gen()).toBe('btn-2')
  })

  it('不同生成器互不影响', () => {
    const a = createIdGenerator('a')
    const b = createIdGenerator('b')
    expect(a()).toBe('a-1')
    expect(b()).toBe('b-1')
    expect(a()).toBe('a-2')
  })
})

describe('@feel-ui/hooks createUseControllableState', () => {
  // 极简适配器：以普通数组模拟 useState
  function createAdapter() {
    let state: unknown
    const useState = <T>(initial: T): [T, (next: T) => void] => {
      if (state === undefined) state = initial
      return [state as T, (next: T) => { state = next }]
    }
    return { useState }
  }

  it('非受控：内部状态更新并触发 onChange', () => {
    const { useState } = createAdapter()
    const useControllableState = createUseControllableState<number>(useState)
    const [value, setValue] = useControllableState({ defaultValue: 1 })
    expect(value).toBe(1)
    setValue(2)
    expect(useControllableState({ defaultValue: 1 })[0]).toBe(2)
  })

  it('受控：值由外部持有，onChange 被调用', () => {
    const { useState } = createAdapter()
    const useControllableState = createUseControllableState<string>(useState)
    let changed: string | undefined
    const [value, setValue] = useControllableState({ value: 'a', onChange: (v) => { changed = v } })
    expect(value).toBe('a')
    setValue('b')
    expect(changed).toBe('b')
    expect(useControllableState({ value: 'a', onChange: () => {} })[0]).toBe('a')
  })
})

describe('@feel-ui/hooks mergeSlotProps', () => {
  it('className 拼接', () => {
    const merged = mergeSlotProps({ className: 'a' }, { className: 'b c' })
    expect(merged.className).toBe('a b c')
  })

  it('事件处理器链式调用', () => {
    const calls: string[] = []
    const merged = mergeSlotProps(
      { onClick: () => calls.push('base') },
      { onClick: () => calls.push('override') },
    )
    ;(merged.onClick as () => void)()
    expect(calls).toEqual(['base', 'override'])
  })

  it('普通属性以覆盖值为准', () => {
    const merged = mergeSlotProps({ id: 'a', title: 'base' }, { id: 'b' })
    expect(merged.id).toBe('b')
    expect(merged.title).toBe('base')
  })
})
