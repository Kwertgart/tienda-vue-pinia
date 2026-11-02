# TecnoStore – SPA con CRUD y Pinia en Vue 3

Tienda de productos de computación (laptops, computadoras, monitores, periféricos y componentes).
Proyecto de la Unidad 3: Vue 3 + Vue Router + Pinia.

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Inicio |
| `/productos` | Lista de productos (editar, eliminar, agregar al carrito) |
| `/productos/crear` | Formulario para crear producto |
| `/productos/:id` | Formulario para editar producto |
| `/carrito` | Resumen del carrito |

> Se usa `createWebHashHistory`, por eso en GitHub Pages las URLs se ven como `.../#/productos`.

## Estructura

```
src/
├── main.js              # crea la app, instala Pinia y Router
├── App.vue              # menú (router-link) + router-view
├── router/index.js      # rutas
├── stores/productos.js  # Store de productos (CRUD)
├── stores/carrito.js    # Store del carrito
└── views/               # Inicio, Productos, Formulario, Carrito
```

## Ejecutar en local

```bash
npm install
npm run dev
```

## Publicar en GitHub Pages

1. Crear el repositorio en GitHub (ej. `tienda-vue-pinia`) y subir el proyecto:
   ```bash
   git init
   git add .
   git commit -m "Proyecto tienda Vue + Pinia"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/tienda-vue-pinia.git
   git push -u origin main
   ```
2. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Al hacer push, el workflow `.github/workflows/deploy.yml` compila y publica el sitio en
   `https://TU_USUARIO.github.io/tienda-vue-pinia/`.
