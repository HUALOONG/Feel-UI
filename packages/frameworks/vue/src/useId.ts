import { ref } from 'vue'
import { createIdGenerator } from '@feel-ui/hooks'

const generateId = createIdGenerator('feel')

/** Vue 版 useId：返回组件实例内稳定的递增 ID（SSR 安全）。 */
export function useId(): string {
  return generateId()
}

export function createUseId(): () => string {
  const id = ref(generateId())
  return () => id.value
}
