import { defineStore } from 'pinia'

const CLAVE = 'tecnostore_carrito'

function cargar() {
  try {
    const guardado = localStorage.getItem(CLAVE)
    if (guardado) return JSON.parse(guardado)
  } catch (e) { /* carrito vacío si falla */ }
  return []
}

export const useCarritoStore = defineStore('carrito', {
  state: () => ({
    // Cada item: { id, nombre, precio, cantidad }
    items: cargar()
  }),

  getters: {
    totalArticulos: (state) => state.items.reduce((suma, i) => suma + i.cantidad, 0),
    total: (state) => state.items.reduce((suma, i) => suma + i.precio * i.cantidad, 0),
    estaVacio: (state) => state.items.length === 0
  },

  actions: {
    guardar() {
      localStorage.setItem(CLAVE, JSON.stringify(this.items))
    },

    agregar(producto) {
      const existente = this.items.find((i) => i.id === producto.id)
      if (existente) {
        existente.cantidad++
      } else {
        this.items.push({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1
        })
      }
      this.guardar()
    },

    cambiarCantidad(id, delta) {
      const item = this.items.find((i) => i.id === id)
      if (!item) return
      item.cantidad += delta
      if (item.cantidad <= 0) this.quitar(id)
      else this.guardar()
    },

    quitar(id) {
      this.items = this.items.filter((i) => i.id !== id)
      this.guardar()
    },

    vaciar() {
      this.items = []
      this.guardar()
    }
  }
})
