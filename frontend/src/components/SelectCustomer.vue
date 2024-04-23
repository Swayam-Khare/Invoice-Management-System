<template>
  <v-dialog max-width="700" centered>
    <v-card>
      <v-card-title
        class="d-flex justify-space-between align-center"
        style="background-color: #112d4ef1"
      >
        <p style="color: #f5f5f5" class="text-h5 pl-5">Select Customers</p>
        <v-btn icon="close" variant="text" color="#f5f5f5" @click="closeDialog"></v-btn>
      </v-card-title>
      <v-row>
        <div class="d-flex flex-wrap w-100 mt-7 mx-9 mb-6 justify-space-between align-center">
          <div>
            <input
              v-model="search"
              type="text"
              class="pl-2 mt-4 mt-sm-0 border-md rounded"
              placeholder="Search Customer"
            />
          </div>
        </div>
      </v-row>

      <v-divider class="mx-6 mb-4"></v-divider>

      <!-- Customer Table -->
      <div class="table-border elevation-6 mx-4 mb-5">
        <v-data-table-server
          class="custom-data-table"
          :headers="headers"
          :items="customerData"
          :items-per-page="10"
          :loading="customerStore.loading"
          loading-text="Please wait..."
          :items-length="customerStore.rowsCount"
          :search="search"
          item-value="name"
          @update:options="(options = $event), loadItems(options)"
          :items-per-page-options="itemsPerPageOption"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn
              color="#112d4e"
              class="text-body-2 text-capitalize text-white"
              density="compact"
              @click="handleAction(item)"
              >Select</v-btn
            >
          </template></v-data-table-server
        >
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { defineEmits } from 'vue'
import { useCustomerStore } from '@/stores/customerStore'

const customerStore = useCustomerStore()

const emit = defineEmits(['close'])

const headers = ref([
  { title: 'Name', value: 'firstName', sortable: true },
  { title: 'Email', value: 'email' },
  { title: 'Contact no', value: 'Address_Details.contact' },
  { title: 'Actions', value: 'actions' }
])

let customerData = ref([])
let search = ref(undefined)
let options = ref({})

async function loadItems(event) {
  console.log(event)
  const { sortBy, page, itemsPerPage, search } = event
  console.log('line 39', sortBy, page, itemsPerPage, search)
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

  await customerStore.getAllCustomers(queryObj)
  customerData.value = customerStore.customers
  for (let d of customerData.value) {
    d.firstName = d.firstName + ' ' + d.lastName
  }
}

const itemsPerPageOption = ref([
  { title: '10', value: 10 },
  { title: '15', value: 15 },
  { title: '20', value: 20 },
  { title: '50', value: 50 },
  { title: '100', value: 100 }
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

.custom-data-table >>> .v-data-table__th {
  background-color: #112d4e;
  color: white;
}

.custom-data-table >>> th.v-data-table__th--sortable:hover {
  color: white !important;
}

.table-border {
  border: 1px solid rgba(58, 56, 56, 0.134);
  border-radius: 8px;
}
</style>
