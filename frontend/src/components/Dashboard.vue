<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="4">
            <v-card elevation="5" height="100px" color="grey-darken-4" dark rounded-xl>
              <v-card-title>Total Invoices</v-card-title>
              <v-card-text class="text-h4 font-weight-bold">{{ totalInvoices }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card elevation="5" color="green accent-2" height="100px" dark rounded>
              <v-card-title>Paid Invoices</v-card-title>
              <v-card-text class="text-h4 font-weight-bold">{{ paidInvoices }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card elevation="5" color="blue" height="100px" dark rounded-lg>
              <v-card-title>Due Invoices</v-card-title>
              <v-card-text class="text-h4 font-weight-bold">{{ dueInvoices }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="4">
            <v-card
              elevation="5"
              color="red accent-2"
              text-color="white"
              height="100px"
              dark
              rounded
            >
              <v-card-title>Overdue Invoices</v-card-title>
              <v-card-text class="text-h4 font-weight-bold">{{ overdueInvoices }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card elevation="5" color="indigo" text-color="white" height="100px" rounded>
              <v-card-title>Total Clients</v-card-title>
              <v-card-text class="text-h4 font-weight-bold">{{ totalClients }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card elevation="5" color="teal darken-9" height="100px" rounded>
              <v-card-title>Total Revenue</v-card-title>
              <v-card-text class="text-h4 font-weight-bold">{{ totalRevenue }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-card elevation="5" color="amber-lighten-5" dark rounded>
              <v-card-title>Paid vs Unpaid Invoices</v-card-title>
              <v-card-text>
                <div style="height: 300px">
                  <Pie :data="chartData" :options="chartOptions"></Pie>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card elevation="5" color="amber-lighten-5" dark rounded>
              <v-card-title>Monthly Income</v-card-title>
              <v-card-text>
                <div style="height: 300px">
                  <Line :data="lineChartData" :options="lineChartOptions"></Line>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <v-card elevation="5" color="#112d4e">
              <v-card-title>Recent Invoices</v-card-title>
              <v-data-table-virtual
                :headers="invoiceHeaders"
                :items="recentInvoices"
                :loading="loading"
                class="elevation-0 custom-data-table"
              >
                <template v-slot:item.status="{ item }">
                  <v-chip :color="getStatusColor(item.status)">{{ item.status }}</v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                  <div class="d-flex">
                    <v-btn icon @click="openInvoice(item)" class="elevation-0">
                      <v-icon style="color: green">download</v-icon>
                    </v-btn>
                  </div>
                </template>
              </v-data-table-virtual>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
  <div v-show="false">
    <PdfTemplate
      :orderData="orderData"
      :specificInvoiceData="specificInvoiceData"
      :vendorInformation="vendorData"
    />
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import { Pie, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js'
import html2pdf from 'html2pdf.js'
import PdfTemplate from './PdfTemplate.vue'

import { usedashboardStore } from '@/stores/dashboardStore'
import { useProductStore } from '@/stores/productStore'
const dashboardStore = usedashboardStore()
const productStore = useProductStore()

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
)

const totalInvoices = ref(0)
const paidInvoices = ref(0)
const dueInvoices = ref(0)
const overdueInvoices = ref(0)
const totalClients = ref(0)
const totalRevenue = ref(0)
const recentInvoices = ref([])
const loading = ref(true)
const specificInvoiceData = ref({})
const orderData = ref({})
const invoiceHeaders = [
  { title: 'Invoice #', value: 'invoice_no' },
  { title: 'Client', value: 'Customer.firstName' },
  { title: 'Amount', value: 'total' },
  { title: 'Due Date', value: 'due_date' },
  { title: 'Status', value: 'status' },
  { title: 'Actions', value: 'actions', sortable: true }
]

const props = defineProps({ profile: Object })
const vendorData = ref(props.profile)

const chartData = computed(() => ({
  labels: ['Paid', 'Due', 'Overdue'],
  datasets: [
    {
      data: [paidInvoices.value, dueInvoices.value, overdueInvoices.value],
      backgroundColor: ['green', 'orange', 'red']
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}

const lineChartData = computed(() => {
  const monthlyIncomeData = getMonthlyIncome(dashboardStore.recentInvoices)
  const labels = monthlyIncomeData.map((item) => item.month)
  const data = monthlyIncomeData.map((item) => item.income)

  return {
    labels,
    datasets: [
      {
        label: 'Income',
        data,
        backgroundColor: 'grey',
        borderColor: 'grey',
        fill: false,
        tension: 0.1
      }
    ]
  }
})

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true
    }
  }
}

const fetchInvoiceData = async () => {
  try {
    // Fetch invoice data from the server
    await dashboardStore.TotalIncome()
    await dashboardStore.TotalInvoice()
    await dashboardStore.getAllCustomers()
    await dashboardStore.recentInvoice()
    totalInvoices.value = dashboardStore.totalInvoices
    paidInvoices.value = dashboardStore.paidInvoices
    dueInvoices.value = dashboardStore.dueInvoices
    overdueInvoices.value = dashboardStore.overdueInvoices
    totalClients.value = dashboardStore.totalClient

    totalRevenue.value = dashboardStore.grandTotal

    recentInvoices.value = dashboardStore.recentInvoices
    console.log('recentinvoicers', recentInvoices)

    for (let d of recentInvoices.value) {
      d.Customer.firstName = d.Customer.firstName + ' ' + d.Customer.lastName
    }

    for (let d of recentInvoices.value) {
      d.purchase_date = formatDate(d.purchase_date)
      d.due_date = formatDate(d.due_date)
    }
  } catch (error) {
    console.error('Error fetching invoice data:', error)
  } finally {
    loading.value = false
  }
}

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(date).toLocaleDateString('en-US', options)
}

const getMonthlyIncome = () => {
  const monthlyIncome = {}
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  // Loop through each invoice and calculate the monthly income
  recentInvoices.value.forEach((invoice) => {
    const purchaseDate = new Date(invoice.purchase_date)
    const month = months[purchaseDate.getMonth()]
    const year = purchaseDate.getFullYear()
    const monthYear = `${month} ${year}` // Format: month year

    if (invoice.status === 'paid') {
      if (monthlyIncome[monthYear]) {
        monthlyIncome[monthYear] += parseFloat(invoice.total)
      } else {
        monthlyIncome[monthYear] = parseFloat(invoice.total)
      }
    }
  })

  // Convert the object to an array of month-income pairs
  const monthlyIncomeArray = Object.entries(monthlyIncome)
    .map(([monthYear, income]) => ({
      month: monthYear,
      income
    }))
    .sort((a, b) => {
      const [monthA, yearA] = a.month.split(' ')
      const [monthB, yearB] = b.month.split(' ')
      const monthOrder = months.indexOf(monthA) - months.indexOf(monthB)
      if (monthOrder !== 0) {
        return monthOrder
      }
      return yearA - yearB
    })

  return monthlyIncomeArray
}

const monthlyIncomeArray = getMonthlyIncome()
console.log(monthlyIncomeArray)

const getStatusColor = (status) => {
  switch (status) {
    case 'paid':
      return 'green accent-2'
    case 'unpaid':
      return 'red accent-2'
    default:
      return 'grey'
  }
}

async function openInvoice(item) {
  console.log(item)
  specificInvoiceData.value = item
  await productStore.getSelectedProducts(item.Order_Details.productId)
  orderData.value = productStore.selectedProducts
  html2pdf(document.getElementById('pdf'), {
    filename: `${item.Customer.firstName} - ${item.invoice_no}`
  })
}

const editInvoice = (invoice) => {
  // Navigate to the invoice edit page
}

const deleteInvoice = (invoice) => {
  // Delete the invoice from the server
}

onBeforeMount(fetchInvoiceData)
</script>

<style>
.v-data-table__wrapper .v-btn--icon {
  height: 32px;
  width: 32px;
  min-width: 32px;
}

.custom-data-table >>> .v-data-table-virtual__th {
  background-color: #5b6168;
  color: white;
}

.custom-data-table >>> .v-data-table-virtual__th--sortable:hover {
  color: white !important;
}
</style>
