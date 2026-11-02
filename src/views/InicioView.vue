<script setup>
import { useProductosStore } from '../stores/productos'
import { useCarritoStore } from '../stores/carrito'

const productos = useProductosStore()
const carrito = useCarritoStore()
</script>

<template>
  <section>
    <div class="hero">
      <h2>Bienvenido a TecnoStore</h2>
      <p>
        Tu tienda de computación: laptops, computadoras de escritorio, monitores,
        periféricos y componentes al mejor precio.
      </p>
      <router-link to="/productos" class="btn btn-verde">Ver productos</router-link>
    </div>

    <div class="resumen">
      <div class="tarjeta-dato">
        <strong>{{ productos.totalProductos }}</strong>
        <span>Productos en catálogo</span>
      </div>
      <div class="tarjeta-dato">
        <strong>{{ productos.categorias.length }}</strong>
        <span>Categorías</span>
      </div>
      <div class="tarjeta-dato">
        <strong>{{ carrito.totalArticulos }}</strong>
        <span>Artículos en tu carrito</span>
      </div>
    </div>

    <p class="nota">
      Proyecto Unidad 3: SPA con Vue 3, Vue Router y Pinia (CRUD de productos + carrito de compras).
    </p>
  </section>
</template>
