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
        <v-btn
          id="home"
          color="#112D4E"
          :ripple="false"
          variant="text"
          class="text-capitalize h-100"
        >
          Home
        </v-btn>
        <v-btn
          id="contact"
          :ripple="false"
          color="#112D4E"
          variant="text"
          class="text-capitalize h-100"
        >
          Contact
        </v-btn>

        <!-- menu for about page -->
        <v-menu :open-on-hover="true" offset="4">
          <template v-slot:activator="{ props }">
            <v-btn
              id="about"
              :ripple="false"
              color="#112D4E"
              prepend-icon="expand_more"
              v-bind="props"
              variant="text"
              class="text-capitalize h-100"
            >
              About
            </v-btn>
          </template>

          <!-- list item to show in menu -->
          <v-list>
            <v-list-item
              id="teamItem"
              :active="itemVariant == 'team'"
              color="#112D4E"
              :variant="itemVariant == 'team' ? 'flat' : 'text'"
              :onmouseenter="activeHover"
              :onmouseleave="cancelHover"
              title="Team"
              router
              to="/#team"
            >
            </v-list-item>
            <v-list-item
              id="productItem"
              :active="itemVariant == 'product'"
              color="#112D4E"
              :variant="itemVariant == 'product' ? 'flat' : 'text'"
              :onmouseenter="activeHover"
              :onmouseleave="cancelHover"
              title="Product"
              router
              to="/#product"
            ></v-list-item>
          </v-list>
        </v-menu>
      </span>
      <span class="h-100 d-flex align-center">
        <v-btn class="text-capitalize" variant="text" @click="showLoginDialog = true">
          Login
        </v-btn>
        <Login v-model="showLoginDialog" @close="showLoginDialog = false" @signup="dialog = true" />

        <v-btn class="h-100 rounded-lg text-capitalize" color="#112D4E" @click="dialog = true">
          Sign Up
        </v-btn>
        <Signup v-model="dialog" @close="dialog = false" @login="showLoginDialog = true" />
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
      <v-list-item link prepend-icon="mdi-home-outline" title="Home"></v-list-item>
      <v-list-item link prepend-icon="mdi-account-box-outline" title="Contact"></v-list-item>
      <v-list-item link prepend-icon="mdi-information-outline" title="About"></v-list-item>
      <v-divider></v-divider>
      <v-list-item link>
        <Login styling="text-capitalize w-100" />
      </v-list-item>
      <v-list-item link>
        <Signup styling="text-capitalize w-100" />
      </v-list-item>
    </v-navigation-drawer>
  </v-app>
  <div v-if="showSignup">
    <signUp />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Signup from './signUp.vue'
import Login from './LoginComponent.vue'
// const selected = ref('home')
const drawer = ref(false)
const showLoginDialog = ref(false)
const dialog = ref(false)
const itemVariant = ref('none')

// const changeSelection = (event) => {
//  selected.value = event.currentTarget.id
// }

const activeHover = (event) => {
  if (event.currentTarget.id == 'teamItem') {
    itemVariant.value = 'team'
  } else if (event.currentTarget.id == 'productItem') {
    itemVariant.value = 'product'
  }
}

const cancelHover = (event) => {
  itemVariant.value = 'none'
}
</script>

<style scoped></style>
