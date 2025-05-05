import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['monaco-vim']
  },
  define: {
    'process.platform': JSON.stringify('browser'),
    'process.env.NODE_ENV': JSON.stringify('development'),
    'global': 'window',
  },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  worker: {
    format: 'es',
    rollupOptions: {
      output: {
        format: 'es',
      },
    },
  },
});
