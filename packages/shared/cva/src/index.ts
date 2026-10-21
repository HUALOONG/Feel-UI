/**
 * Feel UI 轻量组件变体管理（cva）。
 * 基于 props 值在预设变体表中查找并拼接类名，支持默认变体与复合变体。
 * 本包不依赖任何框架与样式库；类名冲突消除由上层 `cn`（tailwind-merge）负责。
 */

export interface ClassProp {
  className?: string
}

/** 变体表：{ variantName: { optionValue: className } } */
export type VariantMap = Record<string, Record<string, string>>

/** 变体 schema 配置 */
export interface VariantSchema<V extends VariantMap = VariantMap> {
  /** 所有变体共享的基础类名 */
  base?: string
  /** 变体表 */
  variants: V
  /** 未传 props 时的默认选项 */
  defaultVariants?: Partial<{ [K in keyof V]: keyof V[K] & string }>
  /** 复合变体：当多个变体同时命中时追加的类名 */
  compoundVariants?: Array<Record<string, unknown> & { className: string }>
}

/**
 * 从 cva 的解析函数或变体表推导 props 类型。
 * 同时支持两种用法：
 * - `VariantProps<typeof buttonVariants>`（解析函数，推荐）
 * - `VariantProps<变体表>`（variants 对象）
 */
export type VariantProps<C> = C extends (...args: never[]) => unknown
  ? NonNullable<Parameters<C>[0]>
  : C extends VariantMap
    ? { [K in keyof C]?: keyof C[K] & string }
    : never

type VariantPropsRecord = Record<string, string | undefined>

/**
 * 创建变体解析函数。
 *
 * @example
 * ```ts
 * const buttonVariants = cva('inline-flex items-center', {
 *   variants: {
 *     variant: { primary: 'bg-primary', outline: 'border' },
 *     size: { sm: 'h-8', lg: 'h-12' },
 *   },
 *   defaultVariants: { variant: 'primary', size: 'sm' },
 * })
 * buttonVariants({ variant: 'outline' }) // => 'inline-flex items-center border h-8'
 * ```
 */
export function cva<V extends VariantMap>(
  base: string | undefined,
  schema: VariantSchema<V>,
): (props?: VariantProps<V> & ClassProp) => string {
  return function resolve(props?: VariantProps<V> & ClassProp): string {
    const { className, ...variantProps } = (props ?? {}) as VariantProps<V> & ClassProp
    const userProps = variantProps as VariantPropsRecord
    const defaults = (schema.defaultVariants ?? {}) as VariantPropsRecord

    const classes: string[] = []
    if (base) classes.push(base)

    for (const variantName of Object.keys(schema.variants ?? {})) {
      const map = schema.variants[variantName] as Record<string, string> | undefined
      if (!map) continue
      const selected = userProps[variantName] ?? defaults[variantName]
      if (selected != null && selected in map) {
        const cls = map[selected]
        if (cls) classes.push(cls)
      }
    }

    if (schema.compoundVariants) {
      for (const cv of schema.compoundVariants) {
        const matches = Object.entries(cv).every(([key, value]) => {
          if (key === 'className') return true
          return (userProps[key] ?? defaults[key]) === value
        })
        if (matches) classes.push(cv.className)
      }
    }

    if (className) classes.push(className)

    return classes.filter(Boolean).join(' ')
  }
}
