# Guía para el PDF de evidencias

Regla del PDF: **una captura por página** (interfaz y código en páginas separadas), título, y explicación de máximo 2 párrafos.
Usa el sitio publicado o `npm run dev` para las capturas de interfaz.

| # | Título de la evidencia | Captura de interfaz | Captura de código |
|---|------------------------|---------------------|-------------------|
| 1 | Uso de Vue Router para navegación (rutas `/`, `/productos`, `/productos/crear`, `/productos/:id`, `/carrito`) | Menú lateral y una vista cualquiera con la URL visible (`#/productos`) | `src/router/index.js` (arreglo `routes`) |
| 2 | Menú de navegación con `<router-link>` | Menú con las 4 opciones | `src/App.vue` (bloque `<nav>`) |
| 3 | Uso de Pinia para gestionar productos | Página `/productos` con la lista | `src/stores/productos.js` (state + actions `crear`, `actualizar`, `eliminar`) |
| 4 | Uso de Pinia para gestionar el carrito | Página `/carrito` con productos agregados | `src/stores/carrito.js` (state, getters `total`, actions `agregar`, `quitar`, `vaciar`) |
| 5 | Uso de `v-for` para mostrar productos | Lista de tarjetas de productos | `src/views/ProductosView.vue` (`v-for="p in filtrados"`) |
| 6 | Uso de `v-if` para estados de la aplicación | Carrito vacío (o lista sin resultados) | `src/views/CarritoView.vue` (`v-if="carrito.estaVacio"`) |
| 7 | Uso de `v-model` en formularios | Formulario de crear producto lleno | `src/views/ProductoFormView.vue` (inputs con `v-model`) |
| 8 | CRUD – Crear producto | Formulario `/productos/crear` y el producto nuevo en la lista | `crear()` en `stores/productos.js` + `guardar()` en `ProductoFormView.vue` |
| 9 | CRUD – Leer/listar productos | Lista de productos | `ProductosView.vue` (lectura desde el store) |
| 10 | CRUD – Editar producto | Formulario `/productos/:id` con datos cargados | `actualizar()` en `stores/productos.js` |
| 11 | CRUD – Eliminar producto | Producto eliminado de la lista | `eliminar()` en `stores/productos.js` |
| 12 | Carrito: agregar productos y botón "Agregar al carrito" | Lista con el aviso "se agregó al carrito" | `agregar()` en `stores/carrito.js` |
| 13 | Carrito: lista, precios y total acumulado | `/carrito` con 2 o 3 productos | getter `total` en `stores/carrito.js` |
| 14 | Carrito: eliminar producto y vaciar carrito | `/carrito` con botones visibles | `quitar()` y `vaciar()` en `stores/carrito.js` |
| 15 | Publicación en GitHub Pages | Sitio abierto con la URL de github.io | `.github/workflows/deploy.yml` |
| 16 | Repositorio en GitHub | Página del repositorio | — |

Explicación sugerida (ejemplo, evidencia 3):
"Se creó el store `productos` con `defineStore`. El state guarda el arreglo de productos y las actions `crear`, `actualizar` y `eliminar` concentran toda la lógica del CRUD."
"Los componentes solo llaman a esas actions, por lo que no manipulan los datos directamente."
