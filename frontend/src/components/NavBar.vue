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
          :ripple="false"
          variant="text"
          class="text-capitalize h-100 nav-btn"
        >
          Home
        </v-btn>
        <v-btn
          id="contact"
          :ripple="false"
          @click="scroll('formContainer')"
          variant="text"
          class="text-capitalize h-100 nav-btn"
        >
          Contact
        </v-btn>

        <!-- menu for about page -->
        <v-menu offset="4">
          <template v-slot:activator="{ props }">
            <v-btn
              id="about"
              :ripple="false"
              append-icon="expand_more"
              v-bind="props"
              variant="text"
              class="nav-btn text-capitalize h-100"
            >
              About
            </v-btn>
          </template>

          <!-- list item to show in menu -->
          <v-list class="pa-0">
            <v-list-item
              id="productItem"
              :active="itemVariant == 'product'"
              color="#112D4E"
              :variant="itemVariant == 'product' ? 'flat' : 'text'"
              :onmouseenter="activeHover"
              :onmouseleave="cancelHover"
              title="Product"
              router
              @click="scroll('product')"
              class="text-left"
            >
            </v-list-item>
            <v-list-item
              id="teamItem"
              :active="itemVariant == 'team'"
              color="#112D4E"
              :variant="itemVariant == 'team' ? 'flat' : 'text'"
              :onmouseenter="activeHover"
              :onmouseleave="cancelHover"
              title="Team"
              router
              @click="scroll('team')"
              class="text-left"
            ></v-list-item>
          </v-list>
        </v-menu>
      </span>
      <span class="h-100 d-flex align-center">
        <v-menu offset="4">
          <template v-slot:activator="{ props }">
            <v-btn
              id="login"
              :ripple="false"
              append-icon="expand_more"
              v-bind="props"
              variant="text"
              class="nav-btn text-capitalize h-100"
            >
              Login
            </v-btn>
          </template>

          <v-list class="pa-0">
            <v-list-item
              id="adminItem"
              :active="itemVariant == 'admin'"
              color="#112D4E"
              :variant="itemVariant == 'admin' ? 'flat' : 'text'"
              :onmouseenter="activeHover"
              :onmouseleave="cancelHover"
              title="Admin"
              @click="(showLoginDialog = true), (titleValue = 'Admin Login'),  (adminStore.typelogin = 'admin')"
              class="text-left"
            >
            </v-list-item>
            <v-list-item
              id="vendorItem"
              :active="itemVariant == 'vendor'"
              color="#112D4E"
              :variant="itemVariant == 'vendor' ? 'flat' : 'text'"
              :onmouseenter="activeHover"
              :onmouseleave="cancelHover"
              title="Vendor"
              @click="(showLoginDialog = true), (titleValue = 'Vendor Login') , (adminStore.typelogin = 'vendor')"
              class="text-left"
            ></v-list-item>
          </v-list>
        </v-menu>
        <Login
          v-model="showLoginDialog"
          @close="showLoginDialog = false"
          @vendor=";(titleValue = 'Vendor Login'), (showLoginDialog = true)"
          @signup="showSignupDialog = true"
          :myTitle="titleValue"
        />

        <v-btn
          class="h-100 rounded-lg text-capitalize"
          color="#112D4E"
          @click="showSignupDialog = true"
        >
          Sign Up
        </v-btn>
        <Signup
          v-model="showSignupDialog"
          @close="showSignupDialog = false"
          @login="showLoginDialog = true"
        />
      </span>
    </div>
  </div>

  <v-app class="d-md-none h-screen position-absolute w-100 bg-transparent">
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
      <v-list-item link prepend-icon="home" title="Home"></v-list-item>
      <v-list-item link prepend-icon="account_box" title="Contact" @click="scroll('formContainer')"></v-list-item>
      <v-list-item link prepend-icon="info" title="About" @click="scroll('product')"></v-list-item>
      <v-list-item link prepend-icon="groups" title="Team" @click="scroll('team')"></v-list-item>
      <v-divider></v-divider>

      <v-list-item
        link
        prepend-icon="login"
        title="Login"
        @click="(showLoginDialog = true), (titleValue = 'Admin Login') ,  (adminStore.typelogin = 'admin')"
      >
      </v-list-item>
      <v-list-item link prepend-icon="person_add" title="Signup" @click="showSignupDialog = true">
      </v-list-item>
    </v-navigation-drawer>
  </v-app>

  <v-slide-y-reverse-transition>
    <v-btn
      v-show="showScrollButton"
      icon="arrow_upward"
      @click="scroll('home')"
      class="scroll-top-btn"
      color="#112D4E88"
      style="color: #112d4e"
    ></v-btn>
  </v-slide-y-reverse-transition>
</template>

<script setup>
import { ref } from 'vue'
import Signup from './signUp.vue'
import Login from './LoginComponent.vue'
import { useAdminStore } from '../stores/admin';
import { computed } from 'vue'
import { onMounted } from 'vue'
import { onBeforeUnmount } from 'vue'
const adminStore = useAdminStore();
// const selected = ref('home')
const drawer = ref(false)
const showLoginDialog = ref(false)
const showSignupDialog = ref(false)
const itemVariant = ref('none')
const scrollPosition = ref(0)
const titleValue = ref('Vendor Login')

// const changeSelection = (event) => {
//  selected.value = event.currentTarget.id
// }

const handleScroll = () => {
  scrollPosition.value = window.scrollY
}

onMounted(() => {
  // Add scroll event listener when component is mounted
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  // Remove scroll event listener when component is destroyed
  window.removeEventListener('scroll', handleScroll)
})

const showScrollButton = computed(() => {
  // Show scroll to top button only when scroll position is greater than 200px
  return scrollPosition.value > 300
})

const activeHover = (event) => {
  if (event.currentTarget.id == 'teamItem') {
    itemVariant.value = 'team'
  } else if (event.currentTarget.id == 'productItem') {
    itemVariant.value = 'product'
  } else if (event.currentTarget.id == 'adminItem') {
    itemVariant.value = 'admin'
  } else if (event.currentTarget.id == 'vendorItem') {
    itemVariant.value = 'vendor'
  }
}

const cancelHover = () => {
  itemVariant.value = 'none'
}

const scroll = (id) => {
  document.getElementById(id).scrollIntoView(true)
  if (drawer.value) {
    drawer.value = false
  }
}
</script>

<style scoped>
.scroll-top-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1;
}

.nav-btn:hover {
  color: #112d4e !important;
}

.v-navigation-drawer__scrim {
  position: fixed !important;
}
</style>
