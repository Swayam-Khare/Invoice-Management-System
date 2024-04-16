<template>
    <v-app>
      <v-main>
        <v-container>
          <v-row>
            <v-col cols="12" sm="4">
              <v-card elevation="5" color="blue-grey darken-1" dark rounded-xl>
                <v-card-title>Total Invoices</v-card-title>
                <v-card-text>{{ totalInvoices }}</v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card elevation="5" color="green accent-2" dark rounded>
                <v-card-title>Paid Invoices</v-card-title>
                <v-card-text>{{ paidInvoices }}</v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card elevation="5" color="red accent-2" dark rounded>
                <v-card-title>Unpaid Invoices</v-card-title>
                <v-card-text>{{ unpaidInvoices }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
  
          <v-row>
            <v-col cols="12" sm="3">
              <v-card elevation="5" color="orange darken-1" dark rounded>
                <v-card-title>Total Products</v-card-title>
                <v-card-text>{{ totalProducts }}</v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card elevation="5" color="purple lighten-10" dark rounded>
                <v-card-title>Total Clients</v-card-title>
                <v-card-text>{{ totalClients }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-card elevation="5" color="indigo darken-1" dark>
                <v-card-title>Recent Invoices</v-card-title>
                <v-data-table
                  :headers="invoiceHeaders"
                  :items="recentInvoices"
                  :loading="loading"
                  class="elevation-5"
                >
                  <template v-slot:item.status="{ item }">
                    <v-chip :color="getStatusColor(item.status)">{{ item.status }}</v-chip>
                  </template>
                  <template v-slot:item.actions="{ item }">
                  <v-btn icon @click="viewInvoice(item)" class="mr-2">
                    <v-icon>eye</v-icon>
                  </v-btn>
                  <v-btn icon @click="editInvoice(item)" class="mr-2">
                    <v-icon>pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteInvoice(item)" class="mr-2">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </template>
                </v-data-table>
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
      const recentInvoices = ref([])
      const loading = ref(true)
  
      const invoiceHeaders = [
        { text: 'Invoice #', value: 'id' },
        { text: 'Client', value: 'client.name' },
        { text: 'Amount', value: 'amount' },
        { text: 'Due Date', value: 'dueDate' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
  
      const fetchInvoiceData = async () => {
        try {
          // Fetch invoice data from the server
          totalInvoices.value = 100
          paidInvoices.value = 75
          unpaidInvoices.value = 25
          totalProducts.value = 500
          totalClients.value = 50
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
            // Add more recent invoices here
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