# 快速开始

## 环境要求

- Node.js >= 18
- pnpm >= 8（`workspace` 协议与锁定文件格式依赖此版本）

## 安装与运行

1. **获取源码**

   ```bash
   git clone <repository-url>
   cd feel-ui
   ```

2. **安装依赖**

   ```bash
   pnpm install
   ```

3. **构建所有类库包**（必须先于演示运行）

   ```bash
   pnpm build:all
   ```

   > 本项目遵循「先构建库，再运行演示」的顺序：框架组件包依赖 `tokens`、`styles`、`cva` 等底层包的构建产物。

4. **启动文档站点或演示应用**

   ```bash
   pnpm dev:docs    # 文档站点
   pnpm dev:demo    # 演示应用
   ```

## 30 秒上手

**Vue 3**——在应用入口挂载全局样式，再按需引入组件：

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import '@feel-ui/styles'   // 必须：注入设计令牌 CSS 变量与全局默认样式
import { Button } from '@feel-ui/vue'

// 注册为 FeelButton（Feel 前缀即 Feel UI，避免与第三方组件冲突）
createApp(App).component('FeelButton', Button).mount('#app')
```

```vue
<!-- App.vue -->
<template>
  <FeelButton variant="primary">点击我</FeelButton>
</template>
```

**React 19**——等价写法：

```tsx
// app.tsx
import '@feel-ui/styles'   // 必须：注入设计令牌 CSS 变量与全局默认样式
import { Button } from '@feel-ui/react'

export default function App() {
  return <Button variant="primary">点击我</Button>
}
```

> 包名为 **`@feel-ui/*`**（含连字符）。`pnpm add feelui` 会装到一个无关的语音合成组件库，请务必使用完整包名。
