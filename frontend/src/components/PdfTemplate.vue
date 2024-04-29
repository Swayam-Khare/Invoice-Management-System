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

      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">Name:-</div>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">Address_lane1:-</div>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">Address_lane2:-</div>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">
        landmark, pincode,state
      </div>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">Contact</div>
    </div>

    <div>
      <p class="text-h6">Shipping Details</p>
      <v-divider></v-divider>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">Name:-</div>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">Address_lane1:-</div>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">Address_lane2:-</div>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">
        landmark, pincode,state
      </div>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">Contact</div>
    </div>
    <div>
      <p class="text-h6">Invoice Details</p>
      <v-divider></v-divider>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">Invoice No</div>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">Purchase Date</div>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">Due Date</div>
      <div class="text-subtitle-1 text-grey-darken-2" style="line-height: 1.2">Status</div>
    </div>
  </div>

  <div class="mt-4 mx-2">
    <p class="text-h6">Order Details</p>
    <v-divider></v-divider>
    <v-table density="comfortable">
      <thead>
        <tr>
          <th class="pl-9">Product</th>
          <th class="pl-8">Quantity</th>
          <th class="text-left">Price(₹)</th>
          <th class="text-left">Discount(%)</th>
          <th class="text-left">Subtotal(₹)</th>
        </tr>
      </thead>
    </v-table>
  </div>

  <div class="d-flex justify-space-between mx-2 mt-4">
    <div>
      <p>Additional notes</p>
    </div>
    <div>
      <p>Subtotal:-</p>
      <p>Discount:-</p>
      <p>Tax:-</p>
      <p>Grand total:-</p>
    </div>
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router';
const route = useRoute();

const data = JSON.stringify(route.query)
console.log(route.query.ids)

// console.log(props)
</script>

<style scoped></style>
