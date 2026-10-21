import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Feel UI',
  description: '基于 Shadcn UI 规范的跨框架组件库（Vue 3 / React 19）',
  lang: 'zh-CN',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: '组件', link: '/components/button' },
      { text: 'GitHub', link: 'https://github.com/HUALOONG/template' },
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '介绍', link: '/guide/introduction' },
          { text: '快速开始', link: '/guide/quickstart' },
          { text: '主题定制', link: '/guide/theming' },
          { text: '开发指南', link: '/guide/development' },
        ],
      },
      {
        text: '组件',
        items: [{ text: 'Button 按钮', link: '/components/button' }],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/HUALOONG/template' }],
  },
})
