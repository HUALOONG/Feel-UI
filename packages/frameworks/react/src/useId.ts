import { useRef } from 'react'
import { createIdGenerator } from '@feel-ui/hooks'

const generateId = createIdGenerator('feel')

/** React 版 useId：组件实例内稳定（useRef 缓存），SSR 安全。 */
export function useId(): string {
  const ref = useRef<string | null>(null)
  if (ref.current === null) ref.current = generateId()
  return ref.current
}
