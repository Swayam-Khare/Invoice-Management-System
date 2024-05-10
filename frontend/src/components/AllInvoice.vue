<template>
  <div style="background-color: #112d4e14" class="remove-scrollbar h-screen overflow-auto">
    <div class="d-flex flex-md-row flex-column justify-space-between align-end">
      <div class="mobile-search align-center mt-1 pt-4 px-2 px-sm-10 px-md-14 px-lg-16 ml-xxl-16">
        <div class="search-wrapper">
          <label class="label">#</label>
          <input
            type="text"
            placeholder="Search invoice no."
            class="elevation-6 py-3 px-6 search bg-white"
            v-model="search"
          />
        </div>
      </div>
    </div>
    <div class="list px-2 px-sm-0 overflow-auto">
      <!-- New Table Start -->
      <v-data-table-server
        :headers="headers"
        :items="invoiceData"
        :items-per-page="10"
        :loading="invoiceStore.loading"
        loading-text="Please wait..."
        :items-length="invoiceStore.rowsCount"
        :search="search"
        item-key="id"
        @update:options="(options = $event), (options.status = paymentStatus), loadItems(options)"
        :items-per-page-options="itemsPerPageOption"
        style="width: 90%"
        class="mx-auto my-5 my-sm-5 rounded-lg elevation-5 custom-data-table"
      >
        <template v-slot:header.status>
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
                @click="
                  (paymentStatus = status.title),
                    (options.status = paymentStatus),
                    loadItems(options)
                "
              >
                <v-list-item-title>{{ status.title }}</v-list-item-title>
              </v-list-item>
              <v-list-item @click="clearStatusFilter">
                <v-list-item-title>clear</v-list-item-title>
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
            @click="(showUpdateDialog = true), (selectedInvoice = item)"
          />

          <img
            width="25"
            height="25"
            class="hover-scale mr-2"
            src="https://img.icons8.com/color/48/gmail--v1.png"
            alt="gmail--v1"
          />
          <v-icon
            icon="download"
            @click="openInvoice(item)"
            color="#1565c0"
            class="hover-scale pb-4"
            size="25"
          ></v-icon>

          <img
            src="../assets/delete.svg"
            @click="deleteInvoice(item.id)"
            class="hover-scale"
            style="width: 25px; height: 25px"
          />
        </template>

        <template v-slot:item.status="{ item }">
          <span
            :class="{
              paid: item.status === 'Paid' || item.status === 'paid',
              overdue: item.status === 'Overdue' || item.status === 'overdue',
              due: item.status === 'Due' || item.status === 'due'
            }"
            >{{ item.status }}</span
          >
        </template>
      </v-data-table-server>
    </div>

    <UpdateInvoice
      @close="(showUpdateDialog = false), loadItems(options)"
      v-model="showUpdateDialog"
      :item="selectedInvoice"
    />
    <div v-show="false">
      <PdfTemplate
        :orderData="orderData"
        :specificInvoiceData="specificInvoiceData"
        :vendorInformation="vendorData"
      />
    </div>
  </div>
</template>

<script setup>
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { ref } from 'vue'
import PdfTemplate from './PdfTemplate.vue'
import { useInvoiceStore } from '@/stores/invoiceStore'
import UpdateInvoice from './UpdateInvoice.vue'
import html2pdf from 'html2pdf.js'
import { useProductStore } from '@/stores/productStore'
import { watch } from 'vue'

const invoiceStore = useInvoiceStore()
const productStore = useProductStore()
let filterMenu = ref(false)
const menuTop = ref('0px')
const menuLeft = ref('0px')
const showUpdateDialog = ref(false)
const selectedInvoice = ref(null)

let invoiceData = ref([])
let paymentStatus = ref(undefined)
let options = ref({})
let search = ref(undefined)

const specificInvoiceData = ref({})
const orderData = ref({})

const props = defineProps({ profile: Object })

const vendorData = ref(props.profile)

async function loadItems(event) {
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
  const queryStr = {}
  queryStr.page = page
  queryStr.limit = itemsPerPage
  queryStr.sort = sortingStr
  queryStr.search = search
  queryStr.status = status

  await invoiceStore.getAllInvoices(queryStr)
  invoiceData.value = invoiceStore.invoices

  for (let d of invoiceData.value) {
    d.Customer.firstName = d.Customer.firstName + ' ' + d.Customer.lastName
  }

  for (let d of invoiceData.value) {
    d.purchase_date = formatDate(d.purchase_date)
    d.due_date = formatDate(d.due_date)
  }
}

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(date).toLocaleDateString('en-US', options)
}

async function deleteInvoice(id) {
  await invoiceStore.deleteInvoice(id)
  loadItems(options.value)
}

const itemsPerPageOption = ref([
  { title: '10', value: 10 },
  { title: '15', value: 15 },
  { title: '20', value: 20 },
  { title: '50', value: 50 },
  { title: '100', value: 100 }
])

function toggleFilterMenu(event) {
  filterMenu.value = !filterMenu.value
  const iconPos = event.target.getBoundingClientRect()
  menuTop.value = iconPos.bottom + window.scrollY + 'px'
  menuLeft.value = iconPos.left + 'px'
}

function clearStatusFilter() {
  // statusFilter.value = null
  // filterMenu.value = false // Close the menu after clearing filter
  if (options.value.status) {
    options.value.status = undefined
    loadItems(options.value)
  }
}

const headers = [
  { title: 'Invoice no.', value: 'invoice_no', sortable: true, class: 'custom-table' },
  { title: 'Customer Name', value: 'Customer.firstName', sortable: true },
  { title: 'Purchase Date', value: 'purchase_date' },
  { title: 'Due Date', value: 'due_date' },
  { title: 'Status', value: 'status' },
  { title: 'Actions', value: 'action' }
]

const statusMenu = ref([{ title: 'paid' }, { title: 'overdue' }, { title: 'due' }])

async function openInvoice(item) {
  console.log(item)
  specificInvoiceData.value = item
  await productStore.getSelectedProducts(item.Order_Details.productId)
  orderData.value = productStore.selectedProducts

  const element = document.getElementById('pdf')
  const canvas = await html2canvas(element)
  const pdf = new jsPDF()
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0)
  pdf.save('invoice.pdf')
}
</script>

<style scoped>
@media only screen and (max-width: 690) {
  .pagination {
    width: 70% !important;
  }
}

.remove-scrollbar::-webkit-scrollbar {
  display: none;
}

.search-wrapper {
  position: relative;
}

.label {
  position: absolute;
  top: 10px;
  left: 8px;
  font-size: 18px;
  z-index: 10;
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
