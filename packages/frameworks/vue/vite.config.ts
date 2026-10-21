import { defineLibraryConfig } from '@feel-ui/vite'
import vue from '@vitejs/plugin-vue'

export default defineLibraryConfig({
  entry: 'src/index.ts',
  name: 'FeelUiVue',
  external: ['vue', '@feel-ui/cva', '@feel-ui/hooks', '@feel-ui/utils'],
  plugins: [vue()],
})
