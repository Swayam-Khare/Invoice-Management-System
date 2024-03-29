<template class="bg-blue">
  <div class="d-none d-md-flex align-center justify-space-between px-16 text-h6">
    <span class="mb-2"
      ><v-img
        class="elevation-7 rounded-circle mt-3"
        :width="64"
        :height="66"
        cover
        src="/src/assets/logo.svg"
      ></v-img
    ></span>
    <div
      style="width: 511px; height: 44px"
      class="bg-white rounded-lg elevation-7 d-flex align-center justify-space-between"
    >
      <span class="h-100 d-flex align-center">
        <v-btn variant="text" class="text-capitalize"> Home </v-btn>
        <v-btn variant="text" class="text-capitalize"> Contact </v-btn>
        <v-btn variant="text" class="text-capitalize"> About </v-btn></span
      >
      <span class="h-100 d-flex align-center">
        <Login styling="text-capitalize" />
        <signUp styling="h-100 rounded-lg text-capitalize" />
      </span>
    </div>
  </div>

  <v-app class="d-md-none h-screen position-fixed w-100 bg-transparent">
    <v-toolbar color="#ffffff" elevation="7" class="d-md-none">
      <img class="ml-8 mr-2" width="55px" height="55px" src="/src/assets/logo.svg" />
      <v-toolbar-title>IMS</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click.stop="drawer = !drawer" icon
        ><img width="30px" height="30px" src="/src/assets/menu.svg"
      /></v-btn>
    </v-toolbar>

    <v-navigation-drawer location="end" color="#112D4E" temporary v-model="drawer" :width="255">
      <v-list-item title="Invoice Management System" subtitle="IMS"></v-list-item>
      <v-divider></v-divider>
      <v-list-item link title="Home" class="text-center"></v-list-item>
      <v-list-item link title="Contact" class="text-center"></v-list-item>
      <v-list-item link title="About" class="text-center"></v-list-item>
      <v-divider></v-divider>
      <v-list-item link>
        <Login styling="text-capitalize w-100" />
      </v-list-item>
      <v-list-item link>
        <signUp styling="text-capitalize w-100" />
      </v-list-item>
    </v-navigation-drawer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import signUp from './signUp.vue'
import Login from './LoginComponent.vue'

const drawer = ref(false)
</script>

<style scoped></style>
