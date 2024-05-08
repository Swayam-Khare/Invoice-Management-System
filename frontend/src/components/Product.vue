<!-- <template>
  <div class="d-flex flex-md-row flex-column justify-space-between align-end">
    <div class="mobile-search pt-4 px-2 px-sm-10 px-md-14 px-lg-16 ml-lg-3 ml-xxl-16">
      <input
        type="text"
        placeholder="Search..."
        class="elevation-6 pa-3 mx-auto search bg-grey-lighten-2"
      />
    </div>

    <div class="d-flex justify-end mx-md-16 px-2 my-1">
      <v-btn
        class="text-capitalize hover-btn mx-0 mx-sm-8 mx-md-0 elevation-6"
        @click="showProductDialog = true"
        >Add product</v-btn
      >
      <CreateProduct
        v-model="showProductDialog"
        @close="showProductDialog = false"
      />
    </div>
  </div>
  <div class="list px-2 px-sm-0 overflow-auto">
    <table class="mx-auto my-5 my-sm-5 elevation-5">
      <tr>
        <th>
          Name
          <v-icon icon="swap_vert" class="cursor-pointer"></v-icon>
          
        </th>
        <th>
          Price
          <v-icon icon="swap_vert" class="cursor-pointer"></v-icon>
        </th>
        <th>Discount</th>

        <th>
          Stock
          <v-menu>
            <template v-slot:activator="{ props }">
              <button v-bind="props">
                <v-icon icon="filter_list" size="small" class="pl-1 cursor-pointer"></v-icon>
              </button>
            </template>
            <v-list class="mt-4">
              <v-list-item height="40" v-for="(item, index) in status" :key="index" :value="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </th>
        <th>Actions</th>
      </tr>
      <tr v-for="(item, index) in vendors" :key="index" :value="index">
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.discount }}</td>
        <td class="">
          <span
            :class="{
              approved: item.stock > 0,
              pending: item.stock == 0
            }"
            >{{ item.stock > 0 ? item.stock : 'Out of Stock' }}</span
          >
        </td>
        <td class="d-flex align-center ga-5">
          <img
            src="../assets/edit_square.svg"
            class="hover-scale"
            style="width: 25px; height: 25px"
          />
          <v-icon icon="delete" color="#FF204E" class="hover-scale" size="25"></v-icon>
        </td>
      </tr>
    </table>
  </div>
  <v-pagination
    v-model="page"
    :length="10"
    next-icon="arrow_forward_ios"
    prev-icon="arrow_back_ios"
    class="pagination mx-auto mt-0"
    :total-visible="4"
    size="x-small"
  ></v-pagination>
</template> -->
<template>
  <div class="bg-grey-lighten-3 h-screen pa-5 d-flex ga-8 flex-column">
    <div>
      <input
        type="text"
        v-model="search"
        placeholder="Search..."
        class="elevation-6 pa-3 mx-auto search bg-white"
      />
    </div>
    <div class="table-border elevation-6">
      <v-data-table-server
        class="custom-data-table"
        :headers="headers"
        :items="productData"
        :items-per-page="10"
        :loading="productStore.loading"
        loading-text="Please wait..."
        :items-length="productStore.rowsCount"
        :search="search"
        item-value="name"
        @update:options="(options = $event), loadItems(options)"
        :items-per-page-options="itemsPerPageOption"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon @click="alertMe(item.id)">info_outlined</v-icon>
        </template>
        <template v-slot:item.stock="{ item }">
          <div v-if="item.stock!=0">
            <span class="pl-3">
              {{item.stock}}
            </span>
          </div>
          <div v-else>
            <span class="out-of-stock">
              Out of Stock
            </span>
          </div>
        </template>
      </v-data-table-server>
    </div>
  </div>
  <ProductDetails
    v-model="productDialog"
    :details="specificProductDetails"
    @edit="editDialog = true"
    @close="productDialog = false"
    @delete="loadItems(options)"
  />
  <EditProduct
    v-model="editDialog"
    :editDetails="specificProductDetails"
    @close="(editDialog = false), loadItems(options)"
  />
</template>

<script setup>
import { useProductStore } from '@/stores/productStore'
const productStore = useProductStore()
import { ref } from 'vue'
import ProductDetails from './ProductDetails.vue'
import EditProduct from './EditProduct.vue'

const headers = ref([
  { title: 'Product', value: 'name', sortable: true },
  { title: 'Stock', value: 'stock' },
  { title: 'Price', value: 'price' },
  { title: 'Discount', value: 'discount' },
  { title: 'Actions', value: 'actions' }
])
let productData = ref([])
let search = ref(undefined)
let productDialog = ref(false)
let editDialog = ref(false)
let specificProductDetails = ref({})
let options = ref({})

function alertMe(id) {
  specificProductDetails.value = productData.value.find((t) => t.id === id)
  console.log(specificProductDetails.value)
  productDialog.value = true
}

async function loadItems(event) {
  console.log(event)
  const { sortBy, page, itemsPerPage, search } = event
  // console.log('line 39', sortBy, page, itemsPerPage, search)
  let sortingStr = ''

  if (sortBy.length) {
    sortBy.forEach((i) => {
      if (i.order == 'asc') {
        sortingStr += i.key + ','
      } else {
        sortingStr += '-' + i.key + ','
      }
    })
  }
  sortingStr = sortingStr.slice(0, sortingStr.length - 1)

  const queryObj = {}

  queryObj.page = page
  queryObj.limit = itemsPerPage
  queryObj.search = search
  queryObj.sort = sortingStr

  await productStore.getAllProducts(queryObj)
  productData.value = productStore.products
}

const itemsPerPageOption = ref([
  { title: '10', value: 10 },
  { title: '15', value: 15 },
  { title: '20', value: 20 },
  { title: '50', value: 50 },
  { title: '100', value: 100 }
])
</script>

<style scoped>
@media only screen and (max-width: 690) {
  .pagination {
    width: 70% !important;
  }
}

.search {
  outline: none;
  border-radius: 5px;
}

.search:focus {
  box-shadow:
    0 0 0 1px black,
    5px 5px 10px rgba(0, 0, 0, 0.456) !important;
}

.custom-data-table >>> .v-data-table__th {
  background-color: #112d4ef1;
  color: white;
}

.custom-data-table >>> th.v-data-table__th--sortable:hover {
  color: white !important;
}

.table-border {
  border: 1px solid rgba(58, 56, 56, 0.134);
  border-radius: 8px;
}

.out-of-stock {
  background-color: rgba(255, 0, 0, 0.066);
  color: red;
  border-radius: 20px;
  padding: 5px 10px 5px 10px ;
}
</style>
