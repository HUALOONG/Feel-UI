import { useState } from 'react'
import { createUseControllableState, type ControllableStateOptions } from '@feel-ui/hooks'

const useControllableStateCore = createUseControllableState<unknown>(useState as never)

/** React 版 useControllableState：受控/非受控语义与 Vue 侧一致。 */
export function useControllableState<T>(options: ControllableStateOptions<T>): [T, (next: T) => void] {
  return useControllableStateCore(options as ControllableStateOptions<unknown>) as [T, (next: T) => void]
}
