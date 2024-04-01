<template>
  <div class="home-container" id="home">
    <NavBar />
    <div class="d-flex flex-column-reverse flex-md-row align-center justify-center w-150">
      <div class="text-content d-flex flex-column pa-5 pt-sm-10 px-sm-10 px-md-16 ga-8">
        <p class="text-h4 text-sm-h3 text-grey-darken-4">
          Free invoicing software for small business.
        </p>
        <p class="text-h6 text-justify text-grey-darken-2">
          IMS is online invoicing software that helps you craft professional invoices, send payment
          reminders, keep track of expenses, log your work hours, and get paid faster all for free!
        </p>
        <Signup v-model="dialog" @close="dialog = false" @login="showLoginDialog = true" />
        <Login v-model="showLoginDialog" @close="showLoginDialog = false" @signup="dialog = true" />
        <v-btn class="w-0 px-11 text-capitalize" color="#112D4E" @click="dialog = true">
          Sign Up
        </v-btn>
      </div>
      <div class="image-content">
        <img src="../assets/home.svg" alt="" class="mt-13 img" srcset="" />
      </div>
    </div>
    <ContactUs />
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import Signup from '../components/signUp.vue'
import ContactUs from '../components/ContactUs.vue'
// import { ref } from 'vue';
import Login from '@/components/LoginComponent.vue'
import { ref } from 'vue'

const dialog = ref(false)
const showLoginDialog = ref(false)
</script>

<style scoped>
@media only screen and (min-width: 960px) {
  .home-container {
    background: linear-gradient(to bottom right, #3f72af -10%, #fff 50%);
  }
}

@media only screen and (max-width: 960px) {
  .home-container {
    background: linear-gradient(to top, #3f72af -100%, #fff 70%);
    box-shadow: 0 0 5px 5px #3f71af66;
  }
}

@media only screen and (max-width: 490px) {
  .img {
    width: 100%;
  }
}

p {
  font-family: 'Inter', sans-serif;
}
</style>
