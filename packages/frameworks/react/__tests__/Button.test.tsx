import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import { Button } from '../src/Button'

function renderButton(props: Record<string, unknown> = {}, text = '点击我'): string {
  return renderToStaticMarkup(createElement(Button, props as never, text))
}

describe('@feel-ui/react Button', () => {
  it('默认渲染 primary / md 变体', () => {
    const html = renderButton()
    expect(html).toContain('bg-primary text-primary-foreground')
    expect(html).toContain('h-10 px-4')
    expect(html).toContain('>点击我</button>')
  })

  it('支持 outline 变体与附加类名', () => {
    const html = renderButton({ variant: 'outline', className: 'w-full' })
    expect(html).toContain('border border-input bg-background')
    expect(html).toContain('w-full')
  })

  it('支持禁用态', () => {
    expect(renderButton({ disabled: true })).toContain('disabled')
  })

  it('支持 type 透传', () => {
    expect(renderButton({ type: 'submit' })).toContain('type="submit"')
  })
})
