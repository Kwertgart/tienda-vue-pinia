<script setup>
import { useCarritoStore } from './stores/carrito'

const carrito = useCarritoStore()
</script>

<template>
  <div class="layout">
    <!-- Menú de navegación con router-link -->
    <nav class="sidebar">
      <h1 class="logo">🖥️ TecnoStore</h1>
      <router-link to="/">Inicio</router-link>
      <router-link to="/productos">Productos</router-link>
      <router-link to="/productos/crear">Crear Producto</router-link>
      <router-link to="/carrito">
        Carrito 🛒
        <!-- v-if: la burbuja solo aparece si hay artículos -->
        <span v-if="carrito.totalArticulos > 0" class="badge">{{ carrito.totalArticulos }}</span>
      </router-link>
    </nav>

    <main class="contenido">
      <router-view />
    </main>
  </div>
</template>
