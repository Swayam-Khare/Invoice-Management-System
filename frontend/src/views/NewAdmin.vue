<template>
  <div
    class="navbar d-flex justify-space-between px-2 px-sm-7 py-0 py-md-3 elevation-7"
    style="background-color: #112d4edd"
  >
    <img src="../assets/logo.svg" alt="Logo" />
    <div class="d-flex align-center">
      <div class="search pr-10">
        <!-- <v-text-field label="Search" class="w-auto" variant="solo-filled"></v-text-field> -->
        <input
          type="text"
          placeholder="Search..."
          class="elevation-6 pa-3 search bg-grey-lighten-2 d-none d-sm-flex"
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
    />
  </div>
  <div>
    <v-data-table-server
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
            <!-- Custom expansion content here -->
            <Profile :data="item" />
            <!-- <p>Hello {{ item }}</p> -->
          </div>
        </td>
      </template>

      <template v-slot:item.status="{ item }">
        <td :class="{ pending: item.status === 'pending', approved: item.status === 'approved' }">
          {{ item.status }}
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
import { onBeforeMount } from 'vue'
import Profile from '../components/VendorProfile.vue'
let data = ref([])
const vendorStore = useVendorStore()
onBeforeMount(async () => {
  if (data.value.length === 0) {
    await vendorStore.getAllVendors()
    data.value = vendorStore.vendors
    for (let d of data.value) {
      d.fullName = d.firstName + ' ' + d.lastName
    }
  }
})

onMounted(() => {
  const color = randomColor()
  document.getElementById('random-color').style.backgroundColor = color
})
const expanded = ref([])

function singleSelect(item) {
  // expanded.value.push(item)
  console.log(item)
}

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
  { title: 'Name', value: 'fullName' },
  { title: 'E-mail', value: 'email' },
  { title: 'Contact no', value: 'Address_Details.contact' },
  { title: 'Status', value: 'status', class: 'pending' }
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
</style>
