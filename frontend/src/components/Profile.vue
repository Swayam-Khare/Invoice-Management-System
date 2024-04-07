<template>
  <v-container fluid style="height: 100vh">
    <v-row justify="center" class="mt-16">
      <v-col cols="12" md="2" class="d-sm-flex justify-center bg-blue-grey-lighten-4">
        <img
          class="my-auto mx-auto user-img"
          src="../assets/imgs/User/2.png"
          alt="Right Image"
          style="max-width: 80%; max-height: 80%"
        />
      </v-col>
      <v-col cols="12" md="4" class="bg-blue-grey-lighten-4">
        <v-card>
          <v-card-title class="pl-9" style="background-color: #112d4ef1">
            <p style="color: #f5f5f5">Personal Details</p>
          </v-card-title>
          <v-card-text class="pl-5">
            <v-row>
              <v-col>
                <v-card variant="flat" style="max-width: 80%">
                  <v-card-text>firstName</v-card-text>

                  <div class="ml-3 name-heading mb-3"><strong>Jetha Laal</strong></div>
                </v-card>
              </v-col>
              <v-col>
                <v-card variant="flat" style="max-width: 80%">
                  <v-card-text>lastName</v-card-text>

                  <div class="ml-3 name-heading"><strong>Gada</strong></div>
                </v-card>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col>
                <v-card variant="flat" style="max-width: 80%">
                  <v-card-text>Shop Name</v-card-text>

                  <div class="ml-3 name-heading"><strong>Gada Electronics</strong></div>
                </v-card>
              </v-col>
              <v-col>
                <v-card variant="flat" style="max-width: 80%">
                  <v-card-text>Contact</v-card-text>

                  <div class="ml-3 name-heading"><strong>ph +91 3467298751</strong></div>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="pl-6 pb-1"
              color="primary"
              style="font-weight: bold"
              @click="showFormAndScrollToAddress"
              >Edit Profile</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-16" justify="center">
      <v-col cols="12" md="2" class="">
        <v-card>
          <v-card-title class="pl-9" style="background-color: #112d4ef1"
            ><p style="color: #f5f5f5">Address Details</p>
          </v-card-title>
          <v-card-text class="pl-5">
            <v-card variant="flat">
              <v-card-title class="pt-6">Address</v-card-title>
              <v-card-text>
                <v-row class="pa-3">
                  <!-- <p> -->
                  123 Main Street<br />
                  Apartment 456<br />
                  City, State 12345<br />
                  Country
                  <!-- </p> -->
                </v-row>
              </v-card-text>
            </v-card>
            <v-card variant="flat">
              <v-card-title>Contact</v-card-title>
              <v-card-text>
                <v-row class="pa-3">
                  <!-- <v-icon left>mdi-phone</v-icon> -->
                  Ph.&nbsp;+1 123-456-7890
                </v-row>
              </v-card-text>
            </v-card>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="pl-6 pb-1"
              color="primary"
              style="font-weight: bold"
              @click="showFormAndScroll"
              >Edit Adress</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" variant="flat" class="d-none d-sm-flex">
        <img
          class="ml-16 mt-8 d-none d-sm-flex"
          src="../assets/imgs/profile-details/photo-2.svg"
          alt="Right Image"
          style="max-width: 100%; max-height: 50%"
        />
      </v-col>
    </v-row>
    <UpdateVendor
      v-if="showForm"
      @close="showForm = false"
      ref="updateVendorRef"
      :initialPage="initialPage"
    />
  </v-container>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import UpdateVendor from '@/components/UpdateVendor.vue'

const showForm = ref(false)
const updateVendorRef = ref(null)
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
