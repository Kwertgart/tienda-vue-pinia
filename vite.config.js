import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base './' hace que los archivos se carguen con rutas relativas,
// así el sitio funciona en GitHub Pages sin importar el nombre del repositorio.
export default defineConfig({
  plugins: [vue()],
  base: './'
})
