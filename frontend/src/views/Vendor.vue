<template>
  <v-card>
    <v-layout>
      <v-app-bar title="Invoice Management System" color="#112d4e">
        <template v-slot:prepend>
          <img src="../assets/logo.svg" alt="Logo" style="height: 50px; width: 50px" />
        </template>
        <template v-slot:append>
          <button class="mr-4 bg-white py-2 px-5 rounded d-flex justify-space-between align-center">
            <v-icon icon="logout"></v-icon>
            Logout
          </button>
        </template>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        >
          <template v-slot:append>
            <v-btn icon="chevron_left" variant="text" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="dashboard"
            color="#112d4ef1"
            title="Dashboard"
            value="dashboard"
          ></v-list-item>

          <v-list-group value="Products">
            <template v-slot:activator="{ props }">
              <v-list-item
                prepend-icon="inventory_2"
                color="#112d4ef1"
                v-bind="props"
                title="Products"
              ></v-list-item>
            </template>

            <v-list-item
              v-for="([title, icon, tab, isShow], i) in product"
              :key="i"
              :prepend-icon="icon"
              :title="title"
              color="#112d4ef1"
              :value="title"
              @click="(isActiveTab = tab), (showProductDialog = isShow)"
            ></v-list-item>
          </v-list-group>

          <v-list-item
            prepend-icon="account_group_outline"
            color="#112d4ef1"
            title="Customers"
            value="customers"
            @click="isActiveTab = Customer"
          ></v-list-item>

          <v-list-group value="Invoices">
            <template v-slot:activator="{ props }">
              <v-list-item
                prepend-icon="request_quote"
                color="#112d4ef1"
                v-bind="props"
                title="Invoices"
              ></v-list-item>
            </template>

            <v-list-item
              v-for="([title, icon, tab], i) in invoice"
              :key="i"
              :prepend-icon="icon"
              :title="title"
              color="#112d4ef1"
              :value="title"
              @click="isActiveTab = tab"
            ></v-list-item>
          </v-list-group>

          <v-list-item
            prepend-icon="manage_accounts"
            color="#112d4ef1"
            title="Update Profile"
            value="profile"
            @click="$router.push('/profile')"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <component
          :is="isActiveTab"
          v-model="showProductDialog"
          @close="showProductDialog = false"
        />
      </v-main>
    </v-layout>
  </v-card>
</template>
<script setup>
import { ref } from 'vue'

import Customer from '../components/Customer.vue'
import Product from '../components/Product.vue'
import CreateProduct from '../components/CreateProduct.vue'
import CreateInvoice from '../components/CreateInvoice.vue'
import AllInvoice from '../components/AllInvoice.vue'

const drawer = ref(true)
const rail = ref(true)
const isActiveTab = ref('')
const showProductDialog = ref(false)
const product = ref([
  ['All Products', 'local_mall', Product, false],
  ['Create Product', 'add_circle', CreateProduct, true]
])
const invoice = ref([
  ['All Invoices', 'local_mall', AllInvoice],
  ['Create Invoice', 'add_circle', CreateInvoice]
])
</script>
