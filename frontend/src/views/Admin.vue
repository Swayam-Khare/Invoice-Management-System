<template>
  <div
    class="navbar d-flex justify-space-between px-2 px-sm-7 py-0 py-md-3 elevation-7"
    style="background-color: #112d4edd"
  >
    <div class="d-flex align-center ga-3">
      <img src="../assets/logo.svg" alt="Logo" />
      <span class="text-h4 d-none d-md-flex text-white">Invoice Management System</span>
      <span class="text-h4 d-flex d-md-none text-white">IMS</span>
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

      <v-menu offset="4">
        <template v-slot:activator="{ props }">
          <button v-bind="props" class="elevation-6 logo-btn" id="random-color">
            <span class="logo-char">A</span>
          </button>
        </template>

        <!-- list item to show in menu -->
        <v-list class="pa-0">
          <v-list-item variant="flat" class="text-left font-weight-bold"> Hi, Admin </v-list-item>
          <v-list-item
            id="update-password"
            :active="itemVariant == 'update-password'"
            color="#112D4E"
            variant="flat"
            :onmouseenter="activeHover"
            :onmouseleave="cancelHover"
            title="Update Password"
            value="updatePassword"
            class="text-left"
          ></v-list-item>
          <v-list-item
            id="logout"
            :active="itemVariant == 'logout'"
            color="#112D4E"
            variant="flat"
            :onmouseenter="activeHover"
            :onmouseleave="cancelHover"
            title="Logout"
            value="logout"
            @click="logout"
            class="text-left"
          ></v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>

  <div class="bg-grey-lighten-3 pa-6 h-screen">
    <div class="mobile-search pt-4">
      <input
        type="text"
        placeholder="Search..."
        class="elevation-6 pa-3 mx-auto search bg-grey-lighten-2 d-flex d-sm-none"
        v-model="search"
      />
    </div>
    <div class="table-border elevation-6">
      <v-data-table-server
        v-model:expanded="expanded"
        :headers="headers"
        :items="data"
        :items-per-page="8"
        :search="search"
        item-key="id"
        :loading="vendorStore.loading"
        loading-text="Please wait..."
        @update:options="(options = $event), (options.status = approvalStatus), loadItems(options)"
        :items-per-page-options="itemsPerPageOption"
        :items-length="vendorStore.rowCount.count"
      >
        <template v-slot:item.status="{ item }">
          <td :class="{ pending: item.status === 'pending', approved: item.status === 'approved' }">
            {{ item.status }} {{ eVariable }}
          </td>
        </template>

        <template v-slot:header.status="{}">
          <v-menu offset="4">
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
                id="approved"
                :active="itemVariant == 'approved'"
                color="#112D4E"
                variant="flat"
                :onmouseenter="activeHover"
                :onmouseleave="cancelHover"
                @click="
                  (approvalStatus = 'approved'),
                    (options.status = approvalStatus),
                    loadItems(options)
                "
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
                @click="
                  (approvalStatus = 'pending'),
                    (options.status = approvalStatus),
                    loadItems(options)
                "
                title="Pending"
                value="pending"
                class="text-left"
              ></v-list-item>
            </v-list>
          </v-menu>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon @click="alertMe(item.id)">info_outlined</v-icon>
        </template>
      </v-data-table-server>
    </div>
  </div>
  <Profile v-model="vendorDialog" :data="specificVendorDetails" @close="vendorDialog = false " @reload="loadItems(options)" />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

import randomColor from 'randomcolor'
import { onMounted } from 'vue'
import { useVendorStore } from '../stores/vendorStore.js'
import { useAdminStore } from '@/stores/admin'
import Profile from '../components/VendorProfile.vue'

const router = useRouter()

let data = ref([])
const itemsPerPageOption = ref([
  { title: '10', value: 10 },
  { title: '15', value: 15 },
  { title: '20', value: 20 },
  { title: '50', value: 50 },
  { title: '100', value: 100 }
])

let approvalStatus = ref(undefined)
let options = ref({})
let search = ref(undefined)
let itemVariant = ref(null)
const vendorStore = useVendorStore()
const adminStore = useAdminStore()
let specificVendorDetails = ref({})
let vendorDialog = ref(false)
const activeHover = (event) => {
  if (event.currentTarget.id == 'pending') {
    itemVariant.value = 'pending'
  } else if (event.currentTarget.id == 'approved') {
    itemVariant.value = 'approved'
  } else if (event.currentTarget.id == 'update-password') {
    itemVariant.value = 'update-password'
  } else if (event.currentTarget.id == 'logout') {
    itemVariant.value = 'logout'
  }
}

const cancelHover = () => {
  itemVariant.value = 'none'
}

function closeFilter() {
  if (options.value.status) {
    options.value.status = undefined
    loadItems(options.value)
  }
}

function clearFilter() {
  if (options.value.status) {
    return 'close'
  } else {
    return 'filter_list'
  }
}

onMounted(() => {
  const color = randomColor()
  document.getElementById('random-color').style.backgroundColor = color
})
const expanded = ref([])

// function handleMenuItemClick(title) {
//   if (title === 'Logout') {
//     logout()
//   }
// }

async function logout() {
  try {
    const success = await adminStore.logoutAdmin()
    if (success) {
      // Redirect to the home page
      router.replace('/')
    } else {
      console.error('Logout failed')
      toast.error('admin logout failed!', {
        autoClose: 2000,
        type: 'error',
        position: 'top-right',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
    }
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

const headers = ref([
  { title: 'Name', value: 'firstName', sortable: true },
  { title: 'E-mail', value: 'email' },
  { title: 'Contact no', value: 'Address_Details.contact' },
  { title: 'Status', value: 'status' },
  { title: '', value: 'actions' }
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
  expanded.value = []
}

function alertMe(id) {
  specificVendorDetails.value = data.value.find((t) => t.id === id)
  console.log(specificVendorDetails.value)
  vendorDialog.value = true
}
</script>

<style scoped>
@media only screen and (max-width: 690px) {
  .transition-slot {
    animation: transSmall 0.2s linear !important;
    height: 550px !important;
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

.table-border {
  border: 1px solid rgba(58, 56, 56, 0.134);
  border-radius: 8px;
}
</style>
