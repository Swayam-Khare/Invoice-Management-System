<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="4">
            <v-btn text elevation="5" height="100px" color="grey-darken-3" dark rounded block>
              <v-card elevation="0" height="100%" color="grey-darken-3" dark rounded block>
                <v-card-title>Total Invoices</v-card-title>
                <v-card-text class="text-h4 font-weight-bold">{{ totalInvoices }}</v-card-text>
              </v-card>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="4">
            <v-btn text elevation="5" color="green accent-2" height="100px" dark rounded block>
              <v-card elevation="0" height="100%" color="green accent-2" dark rounded>
                <v-card-title>Paid Invoices</v-card-title>
                <v-card-text class="text-h4 font-weight-bold">{{ paidInvoices }}</v-card-text>
              </v-card>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="4">
            <v-btn text elevation="5" color="blue" height="100px" dark rounded block>
              <v-card elevation="0" height="100%" color="blue" dark rounded>
                <v-card-title>Due Invoices</v-card-title>
                <v-card-text class="text-h4 font-weight-bold">{{ dueInvoices }}</v-card-text>
              </v-card>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4">
            <v-btn text elevation="5" color="red accent-2" text-color="white" height="100px" dark rounded block>
              <v-card elevation="0" height="100%" color="red accent-2" dark rounded>
                <v-card-title>Overdue Invoices</v-card-title>
                <v-card-text class="text-h4 font-weight-bold">{{ overdueInvoices }}</v-card-text>
              </v-card>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="4">
            <v-btn text elevation="5" color="indigo" text-color="white" height="100px" rounded block>
              <v-card elevation="0" height="100%" color="indigo" text-color="white" rounded>
                <v-card-title>Total Clients</v-card-title>
                <v-card-text class="text-h4 font-weight-bold">{{ totalClients }}</v-card-text>
              </v-card>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="4">
            <v-btn text elevation="5" color="teal darken-9" height="100px" rounded block>
              <v-card elevation="0" height="100%" color="teal darken-9" dark rounded>
                <v-card-title>Total Revenue</v-card-title>
                <v-card-text class="text-h4 font-weight-bold">{{ totalRevenue }}</v-card-text>
              </v-card>
            </v-btn>
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
                    <v-btn icon @click="viewInvoice(item)" class="elevation-0">
                      <v-icon style="color: green">download</v-icon>
                    </v-btn>
                    <v-btn icon @click="editInvoice(item)" class="elevation-0">
                      <v-icon style="color: black">edit</v-icon>
                    </v-btn>
                    <v-btn icon @click="deleteInvoice(item)" class="elevation-0">
                      <v-icon style="color: red">delete</v-icon>
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
import { usedashboardStore } from '@/stores/dashboardStore'
const dashboardStore = usedashboardStore()

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

const invoiceHeaders = [
  { title: 'Invoice #', value: 'id' },
  { title: 'Client', value: 'client.name' },
  { title: 'Amount', value: 'amount' },
  { title: 'Due Date', value: 'dueDate' },
  { title: 'Status', value: 'status' },
  { title: 'Actions', value: 'actions', sortable: false }
]

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

const lineChartData = computed(() => ({
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Income',
      data: [10000, 12000, 15000, 18000, 20000, 22000],
      backgroundColor: 'grey',
      borderColor: 'grey',
      fill: false,
      tension: 0.1
    }
  ]
}))

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
    totalInvoices.value = dashboardStore.totalInvoices
    paidInvoices.value = dashboardStore.paidInvoices
    dueInvoices.value = dashboardStore.dueInvoices
    overdueInvoices.value = dashboardStore.overdueInvoices
    totalClients.value = dashboardStore.totalClient

    totalRevenue.value = dashboardStore.grandTotal

    recentInvoices.value = [
      {
        id: 1234,
        client: {
          name: 'Acme Inc.'
        },
        amount: 1500.0,
        dueDate: '2024-05-01',
        status: 'paid'
      },
      {
        id: 1234,
        client: {
          name: 'Vue Co.'
        },
        amount: 10900.0,
        dueDate: '2024-05-01',
        status: 'paid'
      },
      {
        id: 1234,
        client: {
          name: 'Arizona Inc.'
        },
        amount: 15000.0,
        dueDate: '2024-05-01',
        status: 'unpaid'
      },
      {
        id: 1234,
        client: {
          name: 'RelInfra Inc.'
        },
        amount: 10000.0,
        dueDate: '2024-05-01',
        status: 'unpaid'
      },
      {
        id: 1234,
        client: {
          name: 'Arizona Inc.'
        },
        amount: 15000.0,
        dueDate: '2024-05-01',
        status: 'unpaid'
      }
    ]
  } catch (error) {
    console.error('Error fetching invoice data:', error)
  } finally {
    loading.value = false
  }
}

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

const viewInvoice = (invoice) => {
  // Navigate to the invoice details page
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
