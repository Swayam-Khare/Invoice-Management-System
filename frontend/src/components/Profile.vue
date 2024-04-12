<template>
  <v-container fluid>
    <v-row no-gutters class="fill-height">
      <v-col cols="12" md="6" class="d-flex justify-center">
        <v-card class="d-flex flex-column fill-height w-50" style="border-radius: 10px">
          <v-card-title style="background-color: #112d4ef1; color: #f5f5f5">
            My Profile
          </v-card-title>
          <v-card-text class="flex-grow-1 justify-space-between pa-5">
            <div>
              <v-avatar class="ma-5 ml-0" size="100">
                <img
                  class="my-auto mx-auto user-img"
                  src="../assets/imgs/User/2.png"
                  alt="Profile Image"
                  style="max-width: 100%; max-height: 100%"
                />
              </v-avatar>
              <div class="mb-2">
                <span class="font-weight-bold caption text-uppercase">First Name</span>
                <p class="body-1">John Doe</p>
              </div>
              <div class="mb-2">
                <span class="font-weight-bold caption text-uppercase">Location</span>
                <p class="body-1">Windhoek, TN, New York, USA</p>
              </div>
              <div class="mb-2">
                <span class="font-weight-bold caption text-uppercase">Phone Number</span>
                <p class="body-1">+1-656-569-999-1230</p>
              </div>
              <div class="mb-0">
                <span class="font-weight-bold caption text-uppercase">Email</span>
                <p class="body-1">johndoe@example.com</p>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              style="background-color: #112d4ef1; color: #f5f5f5; border-radius: 10px"
              block
              dark
              @click="showFormAndScrollToAddress"
            >
              Update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-center">
        <v-row no-gutters align="center" class="flex-column">
          <v-card class="w-50" style="max-height: 70%; border-radius: 10px">
            <v-card-title style="background-color: #112d4ef1; color: #f5f5f5">
              Address Details
            </v-card-title>
            <v-card-text class="pa-3">
              <div class="mb-2">
                <span class="font-weight-bold caption text-uppercase">Street</span>
                <p class="body-1">123 Main Street, Apt 456</p>
              </div>
              <div class="mb-2">
                <span class="font-weight-bold caption text-uppercase">City</span>
                <p class="body-1">Anytown, CA 12345</p>
              </div>
              <div class="mb-0">
                <span class="font-weight-bold caption text-uppercase">Country</span>
                <p class="body-1">United States</p>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                style="background-color: #112d4ef1; color: #f5f5f5; border-radius: 10px"
                block
                dark
                @click="showFormAndScroll"
              >
                Update
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="mt-5 w-50" style="max-height: 70%; border-radius: 10px">
            <v-card-title style="background-color: #112d4ef1; color: #f5f5f5">
              Credentials
            </v-card-title>
            <v-card-text class="pa-3">
              <div class="mb-2">
                <span class="font-weight-bold caption text-uppercase">Email</span>
                <p class="body-1">johndoe@example.com</p>
              </div>
              <div class="mb-0">
                <span class="font-weight-bold caption text-uppercase">Password</span>
                <p class="body-1">**********</p>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                style="background-color: #112d4ef1; color: #f5f5f5; border-radius: 10px"
                block
                dark
                @click="showFormAndScrollToPassword"
              >
                Update
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
    <UpdateVendor
      v-if="showForm"
      @close="showForm = false"
      ref="updateVendorRef"
      :initialPage="initialPage"
    />
    <UpdateVendorPassword
      v-if="showFormPass && initialPage === 'password'"
      @close="showFormPass = false"
      ref="updateVendorPasswordRef"
    />
  </v-container>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import UpdateVendor from '@/components/UpdateVendor.vue'
import UpdateVendorPassword from '@/components/UpdateVendorPassword.vue'

const showForm = ref(false)
const showFormPass = ref(false)
const updateVendorRef = ref(null)
const updateVendorPasswordRef = ref(null)
const initialPage = ref('personal')

const showFormAndScroll = () => {
  showForm.value = true
  initialPage.value = 'address'
  nextTick(() => {
    updateVendorRef.value?.$el.scrollIntoView({ behavior: 'smooth' })
  })
}

const showFormAndScrollToAddress = () => {
  showForm.value = true
  initialPage.value = 'personal'
  nextTick(() => {
    updateVendorRef.value?.$el.scrollIntoView({ behavior: 'smooth' })
  })
}

const showFormAndScrollToPassword = () => {
  showFormPass.value = true
  initialPage.value = 'password'
  nextTick(() => {
    updateVendorPasswordRef.value?.$el.scrollIntoView({ behavior: 'smooth' })
  })
}
</script>
<style scoped>
.name-heading {
  font-size: 18px;
}

@media (max-width: 600px) {
  .d-sm-flex.justify-center {
    display: flex !important; /* override Vuetify's display class */
    justify-content: center; /* center horizontally */
  }
}
</style>
