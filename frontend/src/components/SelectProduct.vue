<template>
  <v-dialog max-width="700" centered>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center" style="background-color: #112d4ef1">
        <p style="color: #f5f5f5" class="text-h5 pl-5">Select Product</p>
        <v-btn icon="close" variant="text" color="#f5f5f5" @click="closeDialog"></v-btn>
      </v-card-title>
      <v-row>
        <div class="d-flex w-100 mt-7 mx-9 mb-6 justify-space-between align-center">
          <div>
            Show
            <input
              type="number"
              class="pl-2 border-md rounded w-25 ml-2 mr-2"
              min="1"
              placeholder="Entries"
            />
            entries
          </div>

          <div>
            <input type="text" class="pl-2 border-md rounded ml-2" placeholder="Search Product" />
          </div>
        </div>
      </v-row>

      <v-divider class="mx-6 mb-4"></v-divider>

      <!-- Customer Table -->
      <v-data-table-virtual
        :headers="headers"
        :items="products"
        :items-per-page="5"
        class="elevation-3 mx-6 w-auto mb-4"
        hide-default-footer
      >
        <template v-slot:item.action="{ item }">
          <v-btn
            color="#112d4e"
            class="text-body-2 text-capitalize"
            density="compact"
            @click="handleAction(item)"
            >Select</v-btn
          >
        </template></v-data-table-virtual
      >
      <v-pagination
        v-model="page"
        :length="10"
        next-icon="arrow_forward_ios"
        prev-icon="arrow_back_ios"
        class="pagination mx-auto mb-2"
        :total-visible="4"
        size="x-small"
      ></v-pagination>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close'])

const headers = [
  { title: 'Name', value: 'name' },
  { title: 'Price', value: 'price' },
  { title: 'Discount', value: 'discount' },
  { title: 'Stock', value: 'stock' },
  { title: 'Actions', value: 'action' }
]

const page = ref(1)

const products = ref([
  {
    discount: "$50",
    name: 'Washing Machine',
    price: "$546",
    stock: 10
  },
  {
    discount: "$50",
    name: 'Washing Machine',
    price: "$546",
    stock: 10
  },
  {
    discount: "$50",
    name: 'Washing Machine',
    price: "$546",
    stock: 10
  }
])

function closeDialog() {
  emit('close')
}
</script>

<style scoped>
@media only screen and (max-width: 690) {
  .pagination {
    width: 70% !important;
  }
}
</style>
