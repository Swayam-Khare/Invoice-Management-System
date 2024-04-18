<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="4">
            <v-card elevation="5" color="blue-grey darken-1" dark rounded-xl>
              <v-card-title>Total Invoices</v-card-title>
              <v-card-text class="text-h4 font-weight-bold">{{ totalInvoices }}</v-card-text>
              <v-img src="@/assets/Invoice.svg" contain max-height="50" class="mt-4"></v-img>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card elevation="5" color="green accent-2" dark rounded>
              <v-card-title>Paid Invoices</v-card-title>
              <v-card-text class="text-h4 font-weight-bold">{{ paidInvoices }}</v-card-text>
              <v-img src="@/assets/logo.svg" contain max-height="50" class="mt-4"></v-img>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card elevation="5" color="red accent-2" dark rounded>
              <v-card-title>Unpaid Invoices</v-card-title>
              <v-card-text class="text-h4 font-weight-bold">{{ unpaidInvoices }}</v-card-text>
              <v-img src="@/assets/logo.svg" contain max-height="50" class="mt-4"></v-img>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="4">
            <v-card elevation="5" color="blue" text-color="white" dark rounded>
              <v-card-title>Total Products</v-card-title>
              <v-card-text class="text-h4 font-weight-bold">{{ totalProducts }}</v-card-text>
              <v-img src="@/assets/logo.svg" contain max-height="50" class="mt-4"></v-img>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card elevation="5" color="indigo" text-color="white" rounded>
              <v-card-title>Total Clients</v-card-title>
              <v-card-text class="text-h4 font-weight-bold">{{ totalClients }}</v-card-text>
              <v-img src="@/assets/logo.svg" contain max-height="50" class="mt-4"></v-img>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card elevation="5" color="teal darken-9" rounded>
              <v-card-title>Total Revenue</v-card-title>
              <v-card-text class="text-h4 font-weight-bold">{{ totalRevenue }}</v-card-text>
              <v-img src="@/assets/logo.svg" contain max-height="50" class="mt-4"></v-img>
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
                class="elevation-5 custom-data-table"
              >
                <template v-slot:item.status="{ item }">
                  <v-chip :color="getStatusColor(item.status)">{{ item.status }}</v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                  <div class="d-flex justify-center align-center">
                    <v-btn icon @click="viewInvoice(item)" class="elevation-0">
                      <v-icon style="color:green">download</v-icon>
                    </v-btn>
                    <v-btn icon @click="editInvoice(item)" class="elevation-0">
                      <v-icon style="color:black">edit</v-icon>
                    </v-btn>
                    <v-btn icon @click="deleteInvoice(item)" class="elevation-0">
                      <v-icon style="color:red">delete</v-icon>
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

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const totalInvoices = ref(0)
    const paidInvoices = ref(0)
    const unpaidInvoices = ref(0)
    const totalProducts = ref(0)
    const totalClients = ref(0)
    const outOfStockItems = ref(0)
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

    const fetchInvoiceData = async () => {
      try {
        // Fetch invoice data from the server
        totalInvoices.value = 100
        paidInvoices.value = 75
        unpaidInvoices.value = 25
        totalProducts.value = 500
        totalClients.value = 50
        outOfStockItems.value = 20
        totalRevenue.value = 150000.0
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

    onMounted(fetchInvoiceData)

    return {
      totalInvoices,
      paidInvoices,
      unpaidInvoices,
      totalProducts,
      totalClients,
      outOfStockItems,
      totalRevenue,
      recentInvoices,
      loading,
      invoiceHeaders,
      getStatusColor,
      viewInvoice,
      editInvoice,
      deleteInvoice
    }
  }
}
</script>

<style>
.v-data-table__wrapper .v-btn--icon {
  height: 32px;
  width: 32px;
  min-width: 32px;
}

.custom-data-table >>> .v-data-table-virtual__th {
  background-color: #112d4e;
  color: white;
}

.custom-data-table >>> .v-data-table-virtual__th--sortable:hover {
  color: white !important;
}
</style>