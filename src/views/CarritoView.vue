<script setup>
import { ref } from 'vue'
import { useCarritoStore } from '../stores/carrito'

const carrito = useCarritoStore()
const pedidoRealizado = ref(false)

function finalizar() {
  carrito.vaciar()
  pedidoRealizado.value = true
}
</script>

<template>
  <section>
    <h2>Resumen del carrito 🛒</h2>

    <p v-if="pedidoRealizado" class="aviso">🎉 ¡Gracias por tu compra! Tu pedido fue registrado.</p>

    <!-- v-if: carrito vacío -->
    <div v-if="carrito.estaVacio" class="vacio">
      <p>Tu carrito está vacío.</p>
      <router-link to="/productos" class="btn btn-verde">Ir a productos</router-link>
    </div>

    <div v-else>
      <table class="tabla">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in carrito.items" :key="item.id">
            <td>{{ item.nombre }}</td>
            <td>${{ item.precio.toLocaleString('es-MX') }}</td>
            <td class="cantidad">
              <button class="mini" @click="carrito.cambiarCantidad(item.id, -1)">−</button>
              {{ item.cantidad }}
              <button class="mini" @click="carrito.cambiarCantidad(item.id, 1)">+</button>
            </td>
            <td>${{ (item.precio * item.cantidad).toLocaleString('es-MX') }}</td>
            <td>
              <button class="btn btn-rojo" @click="carrito.quitar(item.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="total">
        <p>Artículos: <strong>{{ carrito.totalArticulos }}</strong></p>
        <p class="total-precio">Total: ${{ carrito.total.toLocaleString('es-MX') }} MXN</p>
      </div>

      <div class="acciones">
        <button class="btn btn-gris" @click="carrito.vaciar()">Vaciar carrito</button>
        <button class="btn btn-verde" @click="finalizar">Finalizar compra</button>
      </div>
    </div>
  </section>
</template>
