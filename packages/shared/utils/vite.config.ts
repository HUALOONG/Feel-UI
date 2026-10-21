import { defineLibraryConfig } from '@feel-ui/vite'

export default defineLibraryConfig({
  entry: 'src/index.ts',
  name: 'FeelUiUtils',
  external: ['clsx', 'tailwind-merge'],
})
