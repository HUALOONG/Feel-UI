import { defineLibraryConfig } from '@feel-ui/vite'
import react from '@vitejs/plugin-react'

export default defineLibraryConfig({
  entry: 'src/index.ts',
  name: 'FeelUiReact',
  external: ['react', 'react-dom', 'react/jsx-runtime', '@feel-ui/cva', '@feel-ui/hooks', '@feel-ui/utils'],
  plugins: [react()],
})
