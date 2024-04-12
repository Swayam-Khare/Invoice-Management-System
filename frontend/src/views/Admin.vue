<template>
  <div
    class="navbar d-flex justify-space-between px-2 px-sm-7 py-0 py-md-3 elevation-7"
    style="background-color: #112d4edd"
  >
    <div class="d-flex align-center ga-3">
      <img src="../assets/logo.svg" alt="Logo" />
      <span class="text-h4 text-white">Invoice Management System</span>
    </div>
    <div class="d-flex align-center">
      <div class="search pr-10">
        <!-- <v-text-field label="Search" class="w-auto" variant="solo-filled"></v-text-field> -->
        <input
          type="text"
          placeholder="Search..."
          class="elevation-6 pa-3 search bg-grey-lighten-2 d-none d-sm-flex"
          v-model="search"
        />
        <!-- <v-icon icon="search" class="bg-grey-lighten-2 d-flex d-md-none"></v-icon> -->
      </div>
      <v-menu>
        <template v-slot:activator="{ props }">
          <button v-bind="props" class="elevation-6 logo-btn" id="random-color">
            <span class="logo-char">A</span>
          </button>
        </template>
        <v-list class="mt-4">
          <v-list-item class="font-weight-bold"> Hi, Admin </v-list-item>
          <v-list-item height="40" v-for="(item, index) in items" :key="index" :value="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
  <div class="mobile-search pt-4">
    <input
      type="text"
      placeholder="Search..."
      class="elevation-6 pa-3 mx-auto search bg-grey-lighten-2 d-flex d-sm-none"
      v-model="search"
    />
  </div>
  <div>
    <!-- <v-data-table-server
      items-per-page="10"
      :headers="headers"
      :items="data"
      :items-length="data.length"
      :loading="vendorStore.loading"
      loading-text="Loading, please wait..."
      @update:options="loadItems"
      expand-on-click
    >
      <template v-slot:expanded-row="{ item }">
        <td :colspan="headers.length">
          <div class="px-4 py-2">
            Custom expansion content here
            <Profile :data="item" />
             <p>Hello {{ item }}</p> 
          </div>
        </td>
      </template>

      <template v-slot:item.status="{ item }">
        <td :class="{ pending: item.status === 'pending', approved: item.status === 'approved' }">
          {{ item.status }}
        </td>
      </template>
    </v-data-table-server> -->

    <v-data-table-server
      v-model:expanded="expanded"
      :headers="headers"
      :items="data"
      :items-per-page="10"
      :search="search"
      item-key="id"
      :loading="vendorStore.loading"
      loading-text="Loading, please wait..."
      show-expand
      @update:options="(options = $event), loadItems($event)"
      :items-per-page-options="itemsPerPageOption"
      :items-length="vendorStore.rowCount.count"
    >
      <template v-slot:item.status="{ item }">
        <td :class="{ pending: item.status === 'pending', approved: item.status === 'approved' }">
          {{ item.status }}
        </td>
      </template>

      <template v-slot:header.status="{}">
        <v-menu :open-on-hover="true" offset="4">
          <template v-slot:activator="{ props }">
            <v-btn
              id="status"
              :ripple="false"
              v-bind="props"
              variant="text"
              class="nav-btn text-capitalize h-100"
            >
              Status <v-icon :icon="clearFilter()" @click="closeFilter()"></v-icon>
            </v-btn>
          </template>

          <!-- list item to show in menu -->
          <v-list class="pa-0">
            <v-list-item
              v-model="status"
              id="approved"
              :active="itemVariant == 'approved'"
              color="#112D4E"
              variant="flat"
              :onmouseenter="activeHover"
              :onmouseleave="cancelHover"
              @click="(options.status = 'approved'), loadItems(options)"
              title="Approved"
              value="approved"
              class="text-left"
            >
            </v-list-item>
            <v-list-item
              v-model="status"
              id="pending"
              :active="itemVariant == 'pending'"
              color="#112D4E"
              variant="flat"
              :onmouseenter="activeHover"
              :onmouseleave="cancelHover"
              @click="(options.status = 'pending'), loadItems(options)"
              title="Pending"
              value="pending"
              class="text-left"
            ></v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:item.data-table-expand="{ toggleExpand, internalItem, isExpanded }">
        <v-btn
          :icon="icon(isExpanded, internalItem)"
          variant="text"
          @click="toggleExpansion(internalItem, toggleExpand, isExpanded)"
        ></v-btn>
      </template>
      <template v-slot:expanded-row="{ item }">
        <td :colspan="headers.length">
          <div class="transition-slot overflow-hidden" id="details">
            <Profile :data="item" />
          </div>
        </td>
      </template>
    </v-data-table-server>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import randomColor from 'randomcolor'
import { onMounted } from 'vue'
import { useVendorStore } from '../stores/vendorStore.js'
import Profile from '../components/VendorProfile.vue'
let data = ref([])
const itemsPerPageOption = ref([
  { title: '10', value: 10 },
  { title: '15', value: 15 },
  { title: '20', value: 20 },
  { title: '50', value: 50 },
  { title: '100', value: 100 }
])

let status = ref(undefined)
let options = ref({})
let search = ref(undefined)
let itemVariant = ref(null)
const vendorStore = useVendorStore()

const activeHover = (event) => {
  if (event.currentTarget.id == 'pending') {
    itemVariant.value = 'pending'
  } else if (event.currentTarget.id == 'approved') {
    itemVariant.value = 'approved'
  }
}

const cancelHover = () => {
  itemVariant.value = 'none'
}

function closeFilter() {
  if (options.value.status) {
    options.value.status = undefined;
    loadItems(options.value);
  }
}

function clearFilter() {
  if (options.value.status) {
    return 'close'
  }
  else {
    return 'filter_list'
  }
}

onMounted(() => {
  const color = randomColor()
  document.getElementById('random-color').style.backgroundColor = color
})
const expanded = ref([])

const items = ref([
  {
    title: 'Update Profile'
  },
  {
    title: 'Logout'
  }
])

const headers = ref([
  { key: 'data-table-expand' },
  { title: 'Name', value: 'firstName', sortable: true },
  { title: 'E-mail', value: 'email' },
  { title: 'Contact no', value: 'Address_Details.contact' },
  { title: 'Status', value: 'status' }
])

function icon(expand, item) {
  if (expand(item)) {
    return 'expand_less'
  } else {
    return 'expand_more'
  }
}

async function loadItems(event) {
  console.log(event)
  const { page, itemsPerPage, sortBy, search, status } = event
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
  console.log(sortingStr)
  const queryStr = {}
  queryStr.page = page
  queryStr.limit = itemsPerPage
  queryStr.sort = sortingStr
  queryStr.search = search
  queryStr.status = status
  console.log(queryStr)

  // if (data.value.length === 0) {
  await vendorStore.getAllVendors(queryStr)
  data.value = vendorStore.vendors
  for (let d of data.value) {
    d.firstName = d.firstName + ' ' + d.lastName
  }
  // }
  console.log('loading', vendorStore.rowCount.count)
}

function toggleExpansion(item, expand, isExpanded) {
  console.log(expand)
  // this.expanded = []
  if (isExpanded(item)) {
    let id = null
    var pos = 350
    const ele = document.getElementById('details')
    clearInterval(id)
    const frame = () => {
      if (pos == 0) {
        clearInterval(id)
        expand(item)
      } else {
        pos = pos - 10
        ele.style.height = pos + 'px'
      }
    }
    id = setInterval(frame, 4)
  } else {
    expand(item)
  }

  if (expanded.value.length > 1) {
    const temp = expanded.value[1]
    expanded.value = []
    expanded.value.push(temp)
  }
  console.log(expanded.value)
}
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

.logo-btn {
  border-radius: 100%;
  padding: 5px 18px;
  background-color: #ec407a;
}

.logo-char {
  color: white;
  font-size: 30px;
}

table {
  border-collapse: collapse;
  width: 90%;
  overflow: hidden;
}

th {
  padding: 10px 20px;
  text-align: left;
  /* border-bottom: 2px solid rgba(0, 0, 0, 0.521); */
  background-color: #112d4ecc;
  color: white;
}

td {
  padding: 10px 20px;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.521); */
}

tr {
  transition: 0.2s;
}

tr:nth-child(odd) {
  background-color: #112d4e13;
}

tr:first-child:hover {
  scale: 1;
}

tr:hover {
  scale: 1.01;
}

.approved {
  background-color: rgba(0, 128, 0, 0.066);
  color: green;
  border-radius: 20px;
  padding: 5px 10px;
  /* border: 1px solid green; */
}

.pending {
  background-color: rgba(255, 0, 0, 0.066);
  color: red;
  border-radius: 20px;
  padding: 5px 10px;
  /* border: 1px solid red; */
}

.hover-scale {
  transition: 0.2s;
}

.hover-scale:hover {
  scale: 1.3;
  cursor: pointer;
}

.transition-slot {
  margin: 30px;
  animation: trans 0.2s linear;
  height: 350px;
}

@keyframes trans {
  from {
    height: 0;
  }

  to {
    height: 350px;
  }
}
.vSelect {
  position: absolute;
  /* width: 180px; */
  transform: translate(50px, -40px);
}
.v-field__input {
  background-color: red !important;
  padding: 0px !important ;
  height: 0px !important;
}
</style>
