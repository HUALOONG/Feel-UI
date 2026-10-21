import { cva } from '@feel-ui/cva'

/**
 * Button 变体定义（与 @feel-ui/react 保持完全一致，由契约测试保证）。
 * 样式仅使用 Tailwind 原子类 + tokens 语义色。
 */
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  /** 变体（默认 primary） */
  variant?: ButtonVariant
  /** 尺寸（默认 md） */
  size?: ButtonSize
  /** 附加类名（Vue 侧对应 `class` 属性） */
  class?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

/** 契约测试用的纯函数：由 props 直接解析类名（不依赖组件实例），Vue 侧 `class` 映射为 cva 的 `className` */
export function getButtonClassNames(props: ButtonProps): string {
  return buttonVariants({ variant: props.variant, size: props.size, className: props.class })
}
