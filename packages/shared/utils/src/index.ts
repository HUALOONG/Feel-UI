import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合并 Tailwind 类名：clsx 负责条件拼接，tailwind-merge 负责消除冲突类。
 * 组件统一使用本函数合并类名，禁止手写字符串拼接。
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
