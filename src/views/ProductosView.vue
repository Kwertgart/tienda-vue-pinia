<script setup>
import { ref, computed } from 'vue'
import { useProductosStore } from '../stores/productos'
import { useCarritoStore } from '../stores/carrito'

const productos = useProductosStore()
const carrito = useCarritoStore()

// Filtros (v-model)
const busqueda = ref('')
const categoria = ref('Todas')
const aviso = ref('')

const filtrados = computed(() =>
  productos.productos.filter((p) => {
    const coincideTexto = p.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
    const coincideCat = categoria.value === 'Todas' || p.categoria === categoria.value
    return coincideTexto && coincideCat
  })
)

function comprar(producto) {
  carrito.agregar(producto)
  aviso.value = `"${producto.nombre}" se agregó al carrito`
  setTimeout(() => (aviso.value = ''), 2000)
}

function borrar(producto) {
  if (confirm(`¿Eliminar "${producto.nombre}"?`)) {
    productos.eliminar(producto.id)
  }
}
</script>

<template>
  <section>
    <header class="encabezado">
      <h2>Lista de Productos</h2>
      <router-link to="/productos/crear" class="btn btn-verde">+ Nuevo Producto</router-link>
    </header>

    <div class="filtros">
      <input v-model="busqueda" type="text" placeholder="Buscar producto..." />
      <select v-model="categoria">
        <option>Todas</option>
        <option v-for="c in productos.categorias" :key="c">{{ c }}</option>
      </select>
    </div>

    <p v-if="aviso" class="aviso">✅ {{ aviso }}</p>

    <!-- v-if / v-else: estado vacío vs. lista de productos -->
    <div v-if="filtrados.length === 0" class="vacio">
      <p>No hay productos que mostrar.</p>
      <button class="btn btn-gris" @click="productos.restaurarEjemplos()">
        Restaurar productos de ejemplo
      </button>
    </div>

    <div v-else class="grid">
      <!-- v-for: se recorre la lista de productos -->
      <article v-for="p in filtrados" :key="p.id" class="tarjeta">
        <span class="categoria">{{ p.categoria }}</span>
        <h3>{{ p.nombre }}</h3>
        <p class="descripcion">{{ p.descripcion }}</p>
        <p class="precio">${{ p.precio.toLocaleString('es-MX') }} MXN</p>
        <div class="acciones">
          <router-link :to="`/productos/${p.id}`" class="btn btn-naranja">Editar</router-link>
          <button class="btn btn-rojo" @click="borrar(p)">Eliminar</button>
          <button class="btn btn-azul" @click="comprar(p)">Agregar al carrito</button>
        </div>
      </article>
    </div>
  </section>
</template>
