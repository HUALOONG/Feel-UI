# 主题定制

主题色、圆角、间距等全部收敛在 `@feel-ui/tokens`，定制只需修改令牌源文件并重新构建：

1. 打开 `packages/design/tokens/src/` 下的令牌定义文件；
2. 按既定命名修改对应 CSS 变量值（颜色使用 HSL 格式，与 Shadcn UI 色板对齐）；
3. 重新执行 `pnpm build:tokens`，CSS 变量自动同步到所有消费者。

## CSS 变量命名约定

`--{namespace}-{scale}-{step}`，例如 `--primary-500`、`--radius-lg`、`--spacing-4`。

## 覆盖方式

业务侧如需局部覆盖，可在入口样式中重新赋值同名 CSS 变量，无需修改组件代码：

```css
/* 业务入口样式 */
:root {
  --primary-500: 220 90% 56%;
  --radius-lg: 0.75rem;
}
```

## 新增令牌

在 `tokens` 包中按既有分组追加变量并同步生成类型声明，随后在 `styles` 包中挂载即可全局使用。

## 暗黑模式

采用 `class` 模式（Shadcn UI 标准）：为 `html` 元素添加 `.dark` 类名即切换暗黑模式。

**防闪烁（FOUC）处理**：在应用入口（如 `main.ts` 或根布局）同步读取持久化偏好并立即设置类名：

```ts
// 应用入口，需同步执行
const theme = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

if (theme === 'dark' || (!theme && prefersDark)) {
  document.documentElement.classList.add('dark')
}
```

**切换逻辑**：

```ts
const toggleDark = () => {
  document.documentElement.classList.toggle('dark')
  localStorage.setItem(
    'theme',
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )
}
```

> 服务端渲染（SSR）场景需在首屏 HTML 中内联上述同步脚本，防止客户端水合前后主题不一致。
