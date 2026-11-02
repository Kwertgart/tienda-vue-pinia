import { createRouter, createWebHashHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'
import ProductosView from '../views/ProductosView.vue'
import ProductoFormView from '../views/ProductoFormView.vue'
import CarritoView from '../views/CarritoView.vue'

const routes = [
  { path: '/', name: 'inicio', component: InicioView },
  { path: '/productos', name: 'productos', component: ProductosView },
  // /productos/crear debe ir ANTES de /productos/:id para que no se confunda con un id
  { path: '/productos/crear', name: 'crear', component: ProductoFormView },
  { path: '/productos/:id', name: 'editar', component: ProductoFormView, props: true },
  { path: '/carrito', name: 'carrito', component: CarritoView },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

// Modo hash (#/ruta): evita errores 404 al recargar la página en GitHub Pages
export default createRouter({
  history: createWebHashHistory(),
  routes
})
