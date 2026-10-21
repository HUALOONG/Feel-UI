/** 插槽合并：合并基础 props 与覆盖 props，className 做拼接，事件处理器做链式调用。 */

export type SlotProps = Record<string, unknown> & { className?: string }

function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function'
}

/** 合并两组合法属性（className 拼接；同名事件处理器链式调用；其余覆盖）。 */
export function mergeSlotProps(base: SlotProps, override: SlotProps): SlotProps {
  const result: SlotProps = { ...base }

  for (const [key, value] of Object.entries(override)) {
    if (key === 'className') {
      const baseCls = typeof result.className === 'string' ? result.className : ''
      const overrideCls = typeof value === 'string' ? value : ''
      result.className = [baseCls, overrideCls].filter(Boolean).join(' ')
      continue
    }
    const baseValue = result[key]
    if (isFunction(baseValue) && isFunction(value)) {
      result[key] = (...args: unknown[]) => {
        baseValue(...args)
        value(...args)
      }
      continue
    }
    result[key] = value
  }

  return result
}
