import { defineStore } from 'pinia'

const CLAVE = 'tecnostore_productos'

// Productos de ejemplo para la tienda de computación
const iniciales = [
  { id: 1, nombre: 'Laptop Lenovo IdeaPad 15" Ryzen 5', categoria: 'Laptops', precio: 11499, descripcion: '16 GB RAM, SSD 512 GB, pantalla Full HD.' },
  { id: 2, nombre: 'PC Gamer Ryzen 5 + RTX 4060', categoria: 'Computadoras', precio: 18999, descripcion: 'Torre armada, 16 GB RAM, SSD 1 TB, lista para jugar.' },
  { id: 3, nombre: 'Teclado Mecánico Redragon Kumara', categoria: 'Periféricos', precio: 850, descripcion: 'Switches rojos, retroiluminación RGB, formato TKL.' },
  { id: 4, nombre: 'Mouse Gamer RGB 12,000 DPI', categoria: 'Periféricos', precio: 450, descripcion: '7 botones programables, sensor óptico de alta precisión.' },
  { id: 5, nombre: 'Monitor 24" 144Hz', categoria: 'Monitores', precio: 3500, descripcion: 'Panel IPS Full HD, 1 ms, FreeSync.' },
  { id: 6, nombre: 'SSD NVMe 1 TB', categoria: 'Componentes', precio: 1350, descripcion: 'Lectura hasta 3,500 MB/s, ideal para sistema y juegos.' },
  { id: 7, nombre: 'Memoria RAM DDR4 16 GB (2x8)', categoria: 'Componentes', precio: 980, descripcion: 'Kit dual channel 3200 MHz.' },
  { id: 8, nombre: 'Audífonos Gamer con micrófono', categoria: 'Periféricos', precio: 620, descripcion: 'Sonido envolvente 7.1 virtual, almohadillas acolchadas.' }
]

// Lee de localStorage para que los datos no se pierdan al recargar
function cargar() {
  try {
    const guardado = localStorage.getItem(CLAVE)
    if (guardado) return JSON.parse(guardado)
  } catch (e) { /* si falla, usamos los iniciales */ }
  return iniciales
}

export const useProductosStore = defineStore('productos', {
  state: () => ({
    productos: cargar(),
    cargando: false
  }),

  getters: {
    totalProductos: (state) => state.productos.length,
    // Devuelve una función para buscar un producto por id (viene de la URL como texto)
    obtenerPorId: (state) => (id) => state.productos.find((p) => p.id === Number(id)),
    categorias: (state) => [...new Set(state.productos.map((p) => p.categoria))]
  },

  actions: {
    guardar() {
      localStorage.setItem(CLAVE, JSON.stringify(this.productos))
    },

    // CREATE
    crear(datos) {
      const nuevoId = this.productos.length
        ? Math.max(...this.productos.map((p) => p.id)) + 1
        : 1
      this.productos.push({ id: nuevoId, ...datos, precio: Number(datos.precio) })
      this.guardar()
    },

    // UPDATE
    actualizar(id, datos) {
      const indice = this.productos.findIndex((p) => p.id === Number(id))
      if (indice !== -1) {
        this.productos[indice] = { id: Number(id), ...datos, precio: Number(datos.precio) }
        this.guardar()
      }
    },

    // DELETE
    eliminar(id) {
      this.productos = this.productos.filter((p) => p.id !== Number(id))
      this.guardar()
    },

    restaurarEjemplos() {
      this.productos = JSON.parse(JSON.stringify(iniciales))
      this.guardar()
    }
  }
})
