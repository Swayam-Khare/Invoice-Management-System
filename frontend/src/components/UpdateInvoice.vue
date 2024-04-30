<template>
  <v-dialog max-width="500px" centered persistent>
    <v-card class="rounded-lg remove-scrollbar">
      <v-card-title
        class="d-flex justify-space-between align-center"
        style="background-color: #112d4ef1"
      >
        <p style="color: #f5f5f5" class="text-h5 pl-5">New Product</p>
        <v-btn icon="close" variant="text" color="#f5f5f5" @click="closeDialog"></v-btn>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-select
            label="Status"
            :items="options"
            v-model="item.status"
            variant="outlined"
            color="#112d4e"
            class="mt-1"
            density="compact"
            :rules="[required]"
          ></v-select>

          <v-btn class="mt-1 mb-3 txt-button" color="#112d4e" @click="update" block
            >Update</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useInvoiceStore } from '@/stores/invoiceStore';
import { toast } from 'vue3-toastify'

const props = defineProps({
  item: Object
})

const invoiceStore = useInvoiceStore()
const emit = defineEmits(['close'])
const required = (v) => !!v || 'This field is Required'

const form = ref(null) // If you need a ref to the form for validation
const options = ref(['paid', 'due', 'overdue'])

async function update() {
  const check = await validate();
  if (check.valid) {
    await invoiceStore.updateInvoice(props.item.id, props.item.status)
    emit('close')
  }
  else {
    toast.error("Please select a status", {
        autoClose: 2000,
        pauseOnHover: false,
        type: 'error',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
  }
}

function validate() {
  return form.value.validate()
}

function closeDialog() {
  emit('close')
}
</script>

<style scoped></style>
