import { ref } from 'vue'
import { createUseControllableState, type ControllableStateOptions } from '@feel-ui/hooks'

/** Vue 适配：以 ref 实现 useState 语义 */
function vueUseState<T>(initial: T): [T, (next: T) => void] {
  const state = ref<T>(initial)
  return [state.value, (next: T) => { state.value = next }]
}

const useControllableStateCore = createUseControllableState<unknown>(vueUseState)

/** Vue 版 useControllableState：受控/非受控语义与 React 侧一致。 */
export function useControllableState<T>(options: ControllableStateOptions<T>): [T, (next: T) => void] {
  return useControllableStateCore(options as ControllableStateOptions<unknown>) as [T, (next: T) => void]
}
