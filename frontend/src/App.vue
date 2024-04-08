<template>
  <!-- <Home /> -->

  <RouterView />

  <!-- <Admin /> -->
  <!-- <Vendor /> -->
  <!-- <Product /> -->
  <!-- <CreateInvoice /> -->
  <!-- <SelectCustomer /> -->
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'
import Vendor from './views/Vendor.vue'
import { onMounted } from 'vue'
import router from './router'
// import Customer from './components/Customer.vue'
// import Product from './components/Product.vue'
import CreateInvoice from './components/CreateInvoice.vue'
import SelectCustomer from './components/SelectCustomer.vue'
</script>

<style></style>
