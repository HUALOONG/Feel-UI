/**
 * 可受控状态核心（框架无关）。
 *
 * 通过传入框架的 useState 适配器，创建可复用的 useControllableState：
 * - 受控（传了 value）：值由外部持有，仅触发 onChange；
 * - 非受控（未传 value）：内部维护状态。
 *
 * Vue 适配：useState = (initial) => [ref(initial).value, setter] 或组合式封装；
 * React 适配：useState = React.useState。
 */

export interface ControllableStateOptions<T> {
  /** 受控值（传入即受控） */
  value?: T
  /** 非受控时的默认值 */
  defaultValue?: T
  /** 值变化回调 */
  onChange?: (value: T) => void
}

/** 框架 useState 适配器的最小契约 */
export interface UseStateAdapter {
  <T>(initial: T): [T, (next: T) => void]
}

export function createUseControllableState<T>(useState: UseStateAdapter) {
  return function useControllableState(options: ControllableStateOptions<T>): [T, (next: T) => void] {
    const isControlled = options.value !== undefined
    const [internal, setInternal] = useState<T>(options.defaultValue as T)

    const value = isControlled ? (options.value as T) : internal

    const setValue = (next: T): void => {
      if (!isControlled) setInternal(next)
      options.onChange?.(next)
    }

    return [value, setValue]
  }
}
