import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@feel-ui/utils'
import { buttonVariants, type ButtonVariantProps } from './button'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {}

/**
 * Feel UI Button（React 19）。
 * 与 Vue 侧 Button 的 props / 样式变体 / 交互行为保持一致。
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
})
