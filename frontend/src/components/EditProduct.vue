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
        <v-form class="px-3" ref="form" @submit.prevent="submitForm">
          <v-text-field
            label="Name"
            v-model="details.name"
            variant="outlined"
            color="#112d4e"
            class="mt-1"
            density="compact"
            :disabled="true"
            :rules="[required]"
          ></v-text-field>

          <v-text-field
            label="Description"
            v-model="details.description"
            variant="outlined"
            color="#112d4e"
            :disabled="true"
            class="mt-1"
            density="compact"
            :rules="[required]"
          ></v-text-field>
          <v-text-field
            label="Stock"
            v-model="details.stock"
            variant="outlined"
            color="#112d4e"
            density="compact"
            :rules="[required, numberOnly]"
          ></v-text-field>
          <v-text-field
            label="Price"
            v-model="details.price"
            variant="outlined"
            color="#112d4e"
            density="compact"
            :rules="[required, numberOnly]"
          ></v-text-field>
          <v-text-field
            label="Discount"
            v-model="details.discount"
            variant="outlined"
            color="#112d4e"
            density="compact"
            :rules="[required, numberOnly]"
          ></v-text-field>

          <v-btn type="submit" class="mt-1 mb-3 txt-button" color="#112d4e" @click="validate" block
            >Create</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['close', 'login'])
import { useProductStore } from '@/stores/productStore'
const productName = ref(null)
const description = ref(null)
const stock = ref(null)
const price = ref(null)
const productStore = useProductStore()
const discount = ref(null)
const required = (v) => !!v || 'This field is Required'
const numberOnly = (v) => (v && /^\d*\.?\d+$/.test(Number(v))) || 'This field contains only digits.'
const form = ref(null) // If you need a ref to the form for validation
const props = defineProps({
  editDetails: {
    type: Object
  }
})

const details = ref({})

watch(
  () => props.editDetails,
  (newDetails) => {
    details.value = { ...newDetails }
  }
)

async function submitForm() {
  const formData = {
    id: details.value.id,
    productName: details.value.name,
    description: details.value.description,
    stock: details.value.stock,
    price: details.value.price,
    discount: details.value.discount
  }

  const check = await validate()
  console.log(check.valid)

  if (check.valid) {
    await productStore.updateProduct(formData)
  } else {
    toast.error('Something went Wrong!.', {
      autoClose: 1000,
      type: 'error',
      position: 'bottom-center',
      transition: 'zoom',
      dangerouslyHTMLString: true
    })
    return
  }

  resetForm()
  emit('close')
}

function validate() {
  return form.value.validate()
}

function resetForm() {
  productName.value = null
  description.value = null
  price.value = null
  stock.value = null
  discount.value = null
}

function closeDialog() {
  emit('close')
}
</script>

<style>
.remove-scrollbar::-webkit-scrollbar {
  display: none;
}

.v-input__control {
  height: 45px !important;
}

.v-messages__message {
  white-space: nowrap !important;
}

.v-input__details {
  padding-left: 0px !important;
}
</style>
