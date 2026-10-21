import { describe, expect, it } from 'vitest'
import { cva, type VariantProps } from './index'

const buttonVariants = cva('inline-flex items-center justify-center rounded-md', {
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground',
      outline: 'border border-input bg-background',
      ghost: 'hover:bg-accent',
    },
    size: {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
  compoundVariants: [
    { variant: 'primary', size: 'lg', className: 'shadow-lg' },
    { variant: 'ghost', size: 'sm', className: 'px-2' },
  ],
})

type ButtonProps = VariantProps<typeof buttonVariants> & { className?: string }

describe('@feel-ui/cva', () => {
  it('拼接 base 与默认变体', () => {
    const cls = buttonVariants()
    expect(cls).toBe('inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-4 text-sm')
  })

  it('按 props 选择变体并覆盖默认值', () => {
    const cls = buttonVariants({ variant: 'outline' })
    expect(cls).toContain('border border-input bg-background')
    expect(cls).toContain('h-10 px-4 text-sm')
    expect(cls).not.toContain('bg-primary')
  })

  it('命中复合变体时追加类名', () => {
    expect(buttonVariants({ variant: 'primary', size: 'lg' })).toContain('shadow-lg')
    expect(buttonVariants({ variant: 'ghost', size: 'sm' })).toContain('px-2')
    expect(buttonVariants({ variant: 'ghost', size: 'lg' })).not.toContain('shadow-lg')
  })

  it('附加自定义 className', () => {
    const cls = buttonVariants({ className: 'my-extra w-full' })
    expect(cls.endsWith('my-extra w-full')).toBe(true)
  })

  it('类型推导：VariantProps 可作为组件 props 类型', () => {
    const props: ButtonProps = { variant: 'outline', size: 'sm' }
    expect(buttonVariants(props)).toContain('h-8 px-3 text-xs')
  })
})
