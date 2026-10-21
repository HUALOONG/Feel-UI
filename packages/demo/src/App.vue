<script setup lang="ts">
import { ref } from 'vue'
import { Button, useId } from '@feel-ui/vue'

const variants = ['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const
const sizes = ['sm', 'md', 'lg'] as const

const isDark = ref(document.documentElement.classList.contains('dark'))

const toggleDark = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const demoId = useId()
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="flex items-center justify-between border-b border-border px-6 py-4">
      <div class="flex items-center gap-2">
        <span class="text-lg font-bold">Feel UI</span>
        <span class="text-xs text-muted-foreground">栖羽 · Demo</span>
      </div>
      <Button variant="outline" size="sm" :class="'dark-mode-toggle'" @click="toggleDark">
        {{ isDark ? '☀ 亮色' : '🌙 暗色' }}
      </Button>
    </header>

    <main class="mx-auto max-w-3xl space-y-10 px-6 py-10">
      <section>
        <h2 class="mb-4 text-xl font-semibold">变体（Variant）</h2>
        <div class="flex flex-wrap gap-3">
          <Button v-for="v in variants" :key="v" :variant="v">{{ v }}</Button>
        </div>
      </section>

      <section>
        <h2 class="mb-4 text-xl font-semibold">尺寸（Size）</h2>
        <div class="flex flex-wrap items-center gap-3">
          <Button v-for="s in sizes" :key="s" :size="s" variant="outline">{{ s }}</Button>
        </div>
      </section>

      <section>
        <h2 class="mb-4 text-xl font-semibold">状态</h2>
        <div class="flex flex-wrap gap-3">
          <Button disabled>禁用</Button>
          <Button type="submit">提交表单</Button>
        </div>
      </section>

      <section>
        <h2 class="mb-4 text-xl font-semibold">Hooks（useId）</h2>
        <p class="text-sm text-muted-foreground">
          当前页面 useId 生成：<code class="rounded bg-muted px-1.5 py-0.5">{{ demoId }}</code>
        </p>
      </section>
    </main>
  </div>
</template>
