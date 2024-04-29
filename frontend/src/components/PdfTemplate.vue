<template>
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
        <br>
        {{ vendorInfo.Address_Details.state }}
      </div>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">{{ vendorInfo.Address_Details.contact }}</div>
    </div>

    <div>
      <p class="text-h6">Shipping Details</p>
      <v-divider></v-divider>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">  {{ invoiceInfo.Customer.firstName }} </div>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">{{ invoiceInfo.Customer.Address_Details.address_lane1}}</div>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">{{ invoiceInfo.Customer.Address_Details.address_lane2}}</div>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">
        {{ invoiceInfo.Customer.Address_Details.landmark}}  {{ invoiceInfo.Customer.Address_Details.pincode}}, 
        <br> {{ invoiceInfo.Customer.Address_Details.state}} 
      </div>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2"> {{ invoiceInfo.Customer.Address_Details.contact}} </div>
    </div>
    <div>
      <p class="text-h6">Invoice Details</p>
      <v-divider></v-divider>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">Invoice No: {{ invoiceInfo.invoice_no }}</div>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">Purchase Date: {{ invoiceInfo.purchase_date }}</div>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">Due Date: {{ invoiceInfo.due_date }}</div>
      <div class="text-subtitle-1 text-grey-darken-2 text-capitalize" style="line-height: 1.2">Status: {{ invoiceInfo.status }}</div>
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
        <tr v-for="(order,index) in orders " :key="order.id"> 
        
        <td>{{ order.name }}</td>
        <td>{{ invoiceInfo.Order_Details.quantity[index] }}</td>
        <td>{{ order.price }}</td>
        <td>{{ order.discount }}</td>
        <td>{{ invoiceInfo.Order_Details.quantity[index]*order.price - (invoiceInfo.Order_Details.quantity[index]*order.price*order.discount)/100 }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>

  <div class="d-flex justify-space-between mx-2 mt-4">
    <div>
      <p> Note:- {{ invoiceInfo.notes }}</p>
    </div>
    <div>
      <p>Subtotal: ₹{{ invoiceInfo.subtotal }}</p>
      <p>Discount: {{ invoiceInfo.discount }}%</p>
      <p>Tax: {{ invoiceInfo.tax }}%</p>
      <p>Grand total: ₹{{ invoiceInfo.total }}</p>
    </div>
  </div>

  <div class="d-flex justify-center">
  <v-btn color="#112d4e" class="text-capitalize" id="printButton" @click="printpage">  print</v-btn>
  </div>

</template>

<script setup>
import { useRoute } from 'vue-router'
import { useInvoiceStore } from '@/stores/invoiceStore'
import { useVendorStore } from '@/stores/vendorStore'
import { useProductStore } from '@/stores/productStore'
import { onBeforeMount, ref } from 'vue'
const productStore = useProductStore()
const vendorStore = useVendorStore()
const invoiceStore = useInvoiceStore()
const route = useRoute()
const id = +route.params.id
let invoiceInfo = ref({})
let vendorInfo = ref({})
let orders = ref([])

onBeforeMount(async () => {
  invoiceInfo.value = invoiceStore.specificInvoice(id)
  console.log(invoiceInfo.value)
  vendorInfo.value = vendorStore.loggedVendor
  console.log(vendorInfo.value)
  await productStore.getSelectedProducts(invoiceInfo.value.Order_Details.productId)
  orders.value = productStore.selectedProducts
  console.log(orders.value)
})

function printpage() {
  window.print();
}

// console.log(props)
</script>

<style scoped>

@media print {
  #printButton {
    display: none;
  }
}
</style>
