import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // tanstackRouter({
    //   target: 'react',
    //   autoCodeSplitting: true,
    // }),
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@apps': path.resolve(__dirname, 'src/apps'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@utils': path.resolve(__dirname, 'src/shared/utils'),
      '@types': path.resolve(__dirname, 'src/shared/types'),
      '@components': path.resolve(__dirname, 'src/shared/components'),
      '@hooks': path.resolve(__dirname, 'src/shared/hooks'),
      '@services': path.resolve(__dirname, 'src/shared/services'),
      '@shared': path.resolve(__dirname, 'src/shared'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // đơn vị KB, ví dụ 1000 KB = 1MB default 500kb
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor_react';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
