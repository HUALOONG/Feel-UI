# Button 按钮

触发操作的常用元素，Vue 与 React 两侧 API 完全一致。

## 变体

| variant | 用途 |
| --- | --- |
| `primary` | 主要操作（默认） |
| `secondary` | 次要操作 |
| `outline` | 描边按钮 |
| `ghost` | 幽灵按钮（弱化背景） |
| `destructive` | 危险操作 |

## 尺寸

| size | 高度 |
| --- | --- |
| `sm` | h-8 |
| `md` | h-10（默认） |
| `lg` | h-12 |

## Vue

```vue
<script setup lang="ts">
import { Button } from '@feel-ui/vue'
</script>

<template>
  <Button variant="primary" size="lg">主要操作</Button>
  <Button variant="outline">次要操作</Button>
  <Button variant="ghost" disabled>禁用</Button>
</template>
```

## React

```tsx
import { Button } from '@feel-ui/react'

export function Demo() {
  return (
    <>
      <Button variant="primary" size="lg">主要操作</Button>
      <Button variant="outline">次要操作</Button>
      <Button variant="ghost" disabled>禁用</Button>
    </>
  )
}
```
