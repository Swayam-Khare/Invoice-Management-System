<template>
  <div class="bg-grey-lighten-3 h-screen pa-5 d-flex ga-8 flex-column">
    <div>
      <input type="text" v-model="search" placeholder="Search..." class="elevation-6 pa-3 mx-auto search bg-white" />
    </div>
    <div class="table-border elevation-6">
      <v-data-table-server
        :headers="headers"
        :items="customerData"
        :items-per-page="10"
      :loading="customerStore.loading"

        loading-text="Please wait..."
        :items-length="customerStore.rowsCount"
        :search="search"
        item-value="name"
        @update:options="options=$event, loadItems(options)"
        :items-per-page-options="itemsPerPageOption"

      >
        <template v-slot:item.actions="{ item }">
          <v-icon class="ml-8" @click="alertMe(item.id)">info_outlined</v-icon>
        </template>
      </v-data-table-server>
    </div>
  </div>
  <customerDetails v-model="customerDialog" :details="specificCustomerDetails" @edit="editDialog=true" @close="customerDialog=false" @delete="loadItems(options)"/>
  <EditCustomer v-model="editDialog" :editDetails="specificCustomerDetails" @close="editDialog=false,loadItems(options)"/>
</template>

<script setup>
import { useCustomerStore } from '@/stores/customerStore'
const customerStore = useCustomerStore()
import { ref } from 'vue'
import customerDetails from './customerDetails.vue';
import EditCustomer from './EditCustomer.vue';

const headers = ref([
  { title: 'Name', value: 'firstName', sortable: true },
  { title: 'Email', value: 'email' },
  { title: 'Contact no', value: 'Address_Details.contact' },
  { title: 'More Info', value: 'actions' },
])

let customerData = ref([]);
let search = ref(undefined);
let customerDialog = ref(false);
let editDialog = ref(false);
let specificCustomerDetails = ref({});
let options = ref({});

function alertMe(id) {
  specificCustomerDetails.value = customerData.value.find(t => t.id === id);
  console.log(specificCustomerDetails.value);
  customerDialog.value = true;
}

async function loadItems(event) {
  console.log(event)
  const { sortBy, page, itemsPerPage, search } = event;
  console.log('line 39',sortBy,page,itemsPerPage,search);
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

  const queryObj = {};
  
  queryObj.page = page;
  queryObj.limit = itemsPerPage;
  queryObj.search = search;
  queryObj.sort = sortingStr;

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

.table-border {
  border: 1px solid rgba(58, 56, 56, 0.134);
  border-radius: 8px;
}
</style>
