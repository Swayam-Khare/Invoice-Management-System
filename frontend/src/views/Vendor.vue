<template>
  <v-card>
    <v-layout>
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
              v-for="([title, icon], i) in product"
              :key="i"
              :prepend-icon="icon"
              :title="title"
              color="#112d4ef1"
              :value="title"
            ></v-list-item>
          </v-list-group>

          <v-list-item
            prepend-icon="account_group_outline"
            color="#112d4ef1"
            title="Customers"
            value="customers"
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
              v-for="([title, icon], i) in invoice"
              :key="i"
              :prepend-icon="icon"
              :title="title"
              color="#112d4ef1"
              :value="title"
            ></v-list-item>
          </v-list-group>

          <v-list-item
            prepend-icon="manage_accounts"
            color="#112d4ef1"
            title="Update Profile"
            value="profile"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main
        class="d-flex justify-space-between align-center pr-3 pl-15"
        style="height: 56px; background-color: #112d4e"
      >
        <img src="../assets/logo.svg" alt="Logo" style="height: 50px; width: 50px" />
        
        <v-btn class="text-capitalize elevation-7" prepend-icon="logout" color="#ffffff"
          >Logout</v-btn
        >
      </v-main>
    </v-layout>
  </v-card>
</template>
<script setup>
import { ref } from 'vue'
const drawer = ref(true)
const rail = ref(true)
const product = ref([
  ['All Products', 'local_mall'],
  ['Create Product', 'add_circle']
])
const invoice = ref([
  ['All Invoices', 'local_mall'],
  ['Create Invoice', 'add_circle']
])
</script>
