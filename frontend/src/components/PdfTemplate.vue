<template>
  <div id="pdf" class="pa-4">
    <div class="w-100 d-flex justify-center my-4" style="background-color: #112d4e">
      <span class="text-uppercase px-1 text-h3 bg-white" style="letter-spacing: 2px !important"
        >Invoice</span
      >
    </div>
    <div class="d-flex justify-space-between mx-2">
      <div>
        <p class="text-h6">Vendor Details</p>
        <v-divider></v-divider>

        <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">
          {{ vendorInfo.shopName }}
        </div>
        <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">
          {{ vendorInfo.Address_Details.address_lane1 }}
        </div>
        <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">
          {{ vendorInfo.Address_Details.address_lane2 }}
        </div>
        <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">
          {{ vendorInfo.Address_Details.landmark }} {{ vendorInfo.Address_Details.pincode }},
          <br />
          {{ vendorInfo.Address_Details.state }}
        </div>
        <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">
          {{ vendorInfo.Address_Details.contact }}
        </div>
      </div>

      <div>
        <p class="text-h6">Shipping Details</p>
        <v-divider></v-divider>
        <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">
          {{ invoiceInfo.Customer.firstName }}
        </div>
        <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">
          {{ invoiceInfo.Customer.Address_Details.address_lane1 }}
        </div>
        <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">
          {{ invoiceInfo.Customer.Address_Details.address_lane2 }}
        </div>
        <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">
          {{ invoiceInfo.Customer.Address_Details.landmark }}
          {{ invoiceInfo.Customer.Address_Details.pincode }}, <br />
          {{ invoiceInfo.Customer.Address_Details.state }}
        </div>
        <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">
          {{ invoiceInfo.Customer.Address_Details.contact }}
        </div>
      </div>
      <div>
        <p class="text-h6">Invoice Details</p>
        <v-divider></v-divider>
        <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">
          Invoice No: {{ invoiceInfo.invoice_no }}
        </div>
        <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">
          Purchase Date: {{ invoiceInfo.purchase_date }}
        </div>
        <div
          class="text-subtitle-1 text-grey-darken-2"
          :class="{ 'd-none': invoiceInfo.status === 'paid' }"
          style="line-height: 1.2"
        >
          Due Date: {{ invoiceInfo.due_date }}
        </div>
        <div class="text-subtitle-1 text-grey-darken-2 text-capitalize" style="line-height: 1.2">
          Status: {{ invoiceInfo.status }}
        </div>
        <div
          class="text-subtitle-1 text-grey-darken-2 text-capitalize"
          :class="{ 'd-none': invoiceInfo.status != 'paid' }"
          style="line-height: 1.2"
        >
          TransactionId:<br />
          {{ invoiceInfo.transaction_no }}
        </div>
      </div>
    </div>

    <div class="mt-6 mx-2">
      <p class="text-h6">Order Details</p>
      <v-divider></v-divider>
      <v-table density="comfortable">
        <thead>
          <tr>
            <th class="text-left">Product</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Price(₹)</th>
            <th class="text-left">Discount(%)</th>
            <th class="text-left">Subtotal(₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="order.id">
            <td>{{ order.name }}</td>
            <td>{{ invoiceInfo.Order_Details.quantity[index] }}</td>
            <td>{{ order.price }}</td>
            <td>{{ order.discount }}</td>
            <td>
              {{
                invoiceInfo.Order_Details.quantity[index] * order.price -
                (invoiceInfo.Order_Details.quantity[index] * order.price * order.discount) / 100
              }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>

    <div class="d-flex justify-space-between mx-2 mt-4">
      <div>
        <p>Note:- {{ invoiceInfo.notes }}</p>
      </div>
      <div>
        <p>Subtotal: ₹{{ invoiceInfo.subtotal }}</p>
        <p>Discount: {{ invoiceInfo.discount }}%</p>
        <p>Tax: {{ invoiceInfo.tax }}%</p>
        <p>Grand total: ₹{{ invoiceInfo.total }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

let invoiceInfo = ref({ Order_Details: {}, Customer: { Address_Details: {} } })
let orders = ref([])

const props = defineProps({
  orderData: Object,
  vendorInformation: Object,
  specificInvoiceData: Object
})

watch(
  () => props.orderData,
  (newData) => {
    orders.value = newData
  }
)

watch(
  () => props.specificInvoiceData,
  (newData) => {
    invoiceInfo.value = newData
  }
)
const vendorInfo = ref({ Address_Details: {} })
watch(
  () => props.vendorInformation,
  (newData) => {
    vendorInfo.value = newData
  }
)
</script>
