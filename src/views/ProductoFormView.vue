<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductosStore } from '../stores/productos'

// "id" llega desde la ruta /productos/:id (props: true). En /productos/crear es undefined.
const props = defineProps({ id: String })

const router = useRouter()
const store = useProductosStore()

const modoEditar = computed(() => props.id !== undefined)
const producto = modoEditar.value ? store.obtenerPorId(props.id) : null

// Copia del producto para editarlo sin modificar el original hasta guardar
const form = reactive({
  nombre: producto?.nombre ?? '',
  categoria: producto?.categoria ?? 'Periféricos',
  precio: producto?.precio ?? '',
  descripcion: producto?.descripcion ?? ''
})

const categoriasBase = ['Laptops', 'Computadoras', 'Monitores', 'Periféricos', 'Componentes', 'Redes', 'Accesorios']
const error = ref('')

function guardar() {
  if (!form.nombre.trim() || !form.precio || Number(form.precio) <= 0) {
    error.value = 'El nombre y un precio mayor a 0 son obligatorios.'
    return
  }
  if (modoEditar.value) store.actualizar(props.id, { ...form })
  else store.crear({ ...form })
  router.push('/productos')
}
</script>

<template>
  <section>
    <h2>{{ modoEditar ? 'Editar producto' : 'Crear producto' }}</h2>

    <!-- v-if: si se intenta editar un id que no existe -->
    <div v-if="modoEditar && !producto" class="vacio">
      <p>El producto no existe.</p>
      <router-link to="/productos" class="btn btn-gris">Volver a la lista</router-link>
    </div>

    <form v-else class="formulario" @submit.prevent="guardar">
      <label>
        Nombre
        <input v-model="form.nombre" type="text" placeholder="Ej. Laptop HP 15" />
      </label>

      <label>
        Categoría
        <select v-model="form.categoria">
          <option v-for="c in categoriasBase" :key="c">{{ c }}</option>
        </select>
      </label>

      <label>
        Precio (MXN)
        <input v-model="form.precio" type="number" min="1" step="0.01" placeholder="0.00" />
      </label>

      <label>
        Descripción
        <textarea v-model="form.descripcion" rows="3" placeholder="Características principales"></textarea>
      </label>

      <p v-if="error" class="error">{{ error }}</p>

      <div class="acciones">
        <button type="submit" class="btn btn-verde">
          {{ modoEditar ? 'Guardar cambios' : 'Crear producto' }}
        </button>
        <router-link to="/productos" class="btn btn-gris">Cancelar</router-link>
      </div>
    </form>
  </section>
</template>
