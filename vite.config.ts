import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['monaco-vim']
  },
  define: {
    'process.platform': JSON.stringify('browser'),
    'process.env.NODE_ENV': JSON.stringify('development'),
    'global': 'window',
  },
  build: {
    cssCodeSplit: false, // CSS 不分离
    rollupOptions: {
      output: {
        inlineDynamicImports: true, // 把所有动态导入的模块合并到一个文件
        // manualChunks: {
        //   'monaco-chunks': [
        //     'monaco-editor/esm/vs/language/json/json.worker',
        //     'monaco-editor/esm/vs/language/css/css.worker',
        //     'monaco-editor/esm/vs/language/html/html.worker',
        //     'monaco-editor/esm/vs/language/typescript/ts.worker',
        //     'monaco-editor/esm/vs/editor/editor.worker'
        //   ],
        // },
      },
    },
  },
  worker: {
    format: 'es',
    plugins: [react()],
    rollupOptions: {
      output: {
        format: 'es',
      },
    },
  },
});
