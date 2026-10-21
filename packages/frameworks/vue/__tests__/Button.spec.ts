import { describe, expect, it } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import Button from '../src/Button.vue'

function renderButton(props: Record<string, unknown> = {}, slot = '点击我'): Promise<string> {
  return renderToString(createSSRApp({ render: () => h(Button, props, () => slot) }))
}

describe('@feel-ui/vue Button', () => {
  it('默认渲染 primary / md 变体', async () => {
    const html = await renderButton()
    expect(html).toContain('bg-primary text-primary-foreground')
    expect(html).toContain('h-10 px-4')
    expect(html).toContain('点击我')
    expect(html).toContain('</button>')
  })

  it('支持 outline 变体与附加类名', async () => {
    const html = await renderButton({ variant: 'outline', class: 'w-full' })
    expect(html).toContain('border border-input bg-background')
    expect(html).toContain('w-full')
  })

  it('支持禁用态', async () => {
    const html = await renderButton({ disabled: true })
    expect(html).toContain('disabled')
  })

  it('支持 type 透传', async () => {
    const html = await renderButton({ type: 'submit' })
    expect(html).toContain('type="submit"')
  })
})
