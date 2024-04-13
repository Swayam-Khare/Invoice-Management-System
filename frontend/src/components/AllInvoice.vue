<template>
  <div style="background-color: #112d4e14">
    <div class="d-flex flex-md-row flex-column justify-space-between align-end">
      <div class="mobile-search mt-1 pt-4 px-2 px-sm-10 px-md-14 px-lg-16 ml-lg-3 ml-xxl-16">
        <input
          type="text"
          placeholder="Search invoice no."
          class="elevation-6 pa-3 search bg-white"
        />
      </div>
    </div>
    <div class="list px-2 px-sm-0 overflow-auto">
      <!-- New Table Start -->
      <v-data-table-virtual
        :headers="headers"
        :items="filteredItems"
        style="width: 90%"
        class="mx-auto my-5 my-sm-5 rounded-lg elevation-5 custom-data-table"
      >

        <template v-slot:header.status="{ header }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">Status</span>
              <v-icon small class="ml-2" v-on="on" @click.stop="toggleFilterMenu($event)">
                filter_list
              </v-icon>
            </template>
            <span>Filter by Status</span>
          </v-tooltip>

          <!-- Dropdown Menu for Filtering -->
          <v-menu
            v-model="filterMenu"
            :style="{ position: 'absolute', top: menuTop, left: menuLeft }"
          >
            <v-list>
              <v-list-item
                v-for="status in statusMenu"
                :key="status"
                @click="setStatusFilter(status)"
              >
                <v-list-item-title>{{ status.title }}</v-list-item-title>
              </v-list-item>
              <v-list-item @click="clearStatusFilter">
                <v-list-item-title>Clear Filter</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>

        <template v-slot:item.action="{ item }">
          <img
            width="25"
            height="25"
            class="hover-scale mr-2"
            src="https://img.icons8.com/color/48/edit-file.png"
            alt="edit-file"
          />

          <img
            width="25"
            height="25"
            class="hover-scale mr-2"
            src="https://img.icons8.com/color/48/gmail--v1.png"
            alt="gmail--v1"
          />

          <v-icon icon="download" color="#1565c0" class="hover-scale pb-4" size="25"></v-icon>

          <img src="../assets/delete.svg" class="hover-scale" style="width: 25px; height: 25px" />
        </template>

        <template v-slot:item.status="{ item }">
          <span
            :class="{
              paid: item.status === 'paid',
              overdue: item.status === 'overdue',
              due: item.status === 'due'
            }"
            >{{ item.status }}</span
          >
        </template>
      </v-data-table-virtual>
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const page = ref(1)
let statusFilter = ref(null)
let filterMenu = ref(false)
const menuTop = ref('0px')
const menuLeft = ref('0px')

const filteredItems = computed(() => {
  if (!statusFilter.value) return vendors.value
  return vendors.value.filter((item) => item.status === statusFilter.value)
})

function toggleFilterMenu(event) {
  filterMenu.value = !filterMenu.value
  const iconPos = event.target.getBoundingClientRect()
  menuTop.value = iconPos.bottom + window.scrollY + 'px'
  menuLeft.value = iconPos.left + 'px'
}

function setStatusFilter(status) {
  statusFilter.value = status.title
  filterMenu.value = false // Close the menu after selection
}

function clearStatusFilter() {
  statusFilter.value = null
  filterMenu.value = false // Close the menu after clearing filter
}

const headers = [
  { title: 'Invoice no.', value: 'invoice', sortable: true, class: 'custom-table' },
  { title: 'Customer Name', value: 'customerName', sortable: true },
  { title: 'Purchase Date', value: 'purchaseDate' },
  { title: 'Due Date', value: 'dueDate' },
  { title: 'Status', value: 'status' },
  { title: 'Actions', value: 'action' }
]

const statusMenu = ref([{ title: 'paid' }, { title: 'overdue' }, { title: 'due' }])
const vendors = ref([
  {
    invoice: 'INV-001',
    customerName: 'John Doe',
    purchaseDate: '2021-09-01',
    dueDate: '2021-09-30',
    status: 'paid'
  },
  {
    invoice: 'INV-002',
    customerName: 'Jane Doe',
    purchaseDate: '2021-09-01',
    dueDate: '2021-09-30',
    status: 'overdue'
  },
  {
    invoice: 'INV-003',
    customerName: 'John Doe',
    purchaseDate: '2021-09-01',
    dueDate: '2021-09-30',
    status: 'due'
  },
  {
    invoice: 'INV-004',
    customerName: 'Jane Doe',
    purchaseDate: '2021-09-01',
    dueDate: '2021-09-30',
    status: 'paid'
  },
  {
    invoice: 'INV-005',
    customerName: 'John Doe',
    purchaseDate: '2021-09-01',
    dueDate: '2021-09-30',
    status: 'overdue'
  },
  {
    invoice: 'INV-006',
    customerName: 'Jane Doe',
    purchaseDate: '2021-09-01',
    dueDate: '2021-09-30',
    status: 'due'
  },
  {
    invoice: 'INV-007',
    customerName: 'John Doe',
    purchaseDate: '2021-09-01',
    dueDate: '2021-09-30',
    status: 'paid'
  },
  {
    invoice: 'INV-008',
    customerName: 'Jane Doe',
    purchaseDate: '2021-09-01',
    dueDate: '2021-09-30',
    status: 'overdue'
  },
  {
    invoice: 'INV-009',
    customerName: 'John Doe',
    purchaseDate: '2021-09-01',
    dueDate: '2021-09-30',
    status: 'due'
  },
  {
    invoice: 'INV-010',
    customerName: 'Jane Doe',
    purchaseDate: '2021-09-01',
    dueDate: '2021-09-30',
    status: 'paid'
  }
])
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

.search {
  outline: none;
  border-radius: 5px;
}

.search:focus {
  box-shadow:
    0 0 0 1px black,
    5px 5px 10px rgba(0, 0, 0, 0.456) !important;
}

.paid {
  background-color: rgba(0, 128, 0, 0.066);
  color: green;
  border-radius: 20px;
  padding: 5px 10px;
}

.overdue {
  background-color: rgba(255, 0, 0, 0.066);
  color: red;
  border-radius: 20px;
  padding: 5px 10px;
}

.due {
  background-color: rgba(178, 206, 17, 0.119);
  color: rgb(178, 206, 17);
  border-radius: 20px;
  padding: 5px 10px;
}

.hover-scale {
  transition: 0.2s;
}

.hover-scale:hover {
  scale: 1.3;
  cursor: pointer;
}
</style>
