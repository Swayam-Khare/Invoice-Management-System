<template>
  <!-- <v-container fluid style="height: 100vh">
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
                  123 Main Street<br />
                  Apartment 456<br />
                  City, State 12345<br />
                  Country
                </v-row>
              </v-card-text>
            </v-card>
            <v-card variant="flat">
              <v-card-title>Contact</v-card-title>
              <v-card-text>
                <v-row class="pa-3">
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
  </v-container> -->

  <!-- <v-container fluid>
  <v-row no-gutters class="fill-height">
    <v-col cols="12" md="6" class="d-flex justify-center">
      <v-card class=" ma-1" style="width: 50%;" outlined rounded>
        <v-card-title class="rounded-top" style="background-color: #112d4ef1; color: #f5f5f5">My Profile</v-card-title>
        <v-card-text class="d-flex flex-column justify-space-between">
          <div class="text-center">
            <v-avatar class="ma-5" size="100">
              <img
                class="my-auto mx-auto user-img"
                src="../assets/imgs/User/2.png"
                alt="Right Image"
                style="max-width: 100%; max-height: 100%"
              />
            </v-avatar>
            <h3 class="headline mb-1">John Doe</h3>
            <p class="subheading mb-1">Windhoek, TN, New York, USA</p>
            <p class="body-1 mb-1">+1-656-569-999-1230</p>
            <p class="body-1 mb-1">johndoe@example.com</p>
          </div>
          <v-card-actions class="justify-center">
            <v-btn style="background-color: #112d4ef1; color: #f5f5f5 " class="mt-3" dark>Save</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6" class="d-flex justify-center">
      <v-row no-gutters class="w-50">
          <v-card class="ma-1 mb-2" outlined rounded style="width: 50%;">
            <v-card-title class="rounded-top" style="background-color: #112d4ef1; color: #f5f5f5">Address Details</v-card-title>
            <v-card-text class="pa-3">
              <div class="text-center">
                <p class="body-1 mb-1">123 Main Street, Apt 456</p>
                <p class="body-1 mb-1">Anytown, CA 12345</p>
                <p class="body-1 mb-1">United States</p>
              </div>
            </v-card-text>
          </v-card>
          <v-card class="ma-1" outlined rounded style="width: 50%;">
            <v-card-title class="rounded-top" style="background-color: #112d4ef1; color: #f5f5f5">Credentials</v-card-title>
            <v-card-text class="pa-3">
              <div class="text-center">
                <p class="body-1 mb-1">johndoe@example.com</p>
                <p class="body-1 mb-1">********</p>
              </div>
            </v-card-text>
          </v-card>
      </v-row>
    </v-col>
  </v-row>
</v-container> -->

<v-container fluid  >
  <v-row no-gutters class=" fill-height">
    <v-col cols="12" md="6" class="d-flex justify-center">
      <v-card class=" d-flex flex-column fill-height w-50" style=" border-radius: 10px;">
        <v-card-title style="background-color: #112d4ef1; color: #f5f5f5;">
          My Profile
        </v-card-title>
        <v-card-text class="flex-grow-1 justify-space-between pa-5">
          <div>
            <v-avatar class="ma-5 ml-0" size="100">
              <img class="my-auto mx-auto user-img" src="../assets/imgs/User/2.png" alt="Profile Image" style="max-width: 100%; max-height: 100%" />
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
            <v-btn  style="background-color: #112d4ef1; color: #f5f5f5; border-radius: 10px;" block dark>
              Update
            </v-btn>
          </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" md="6" class="d-flex justify-center">
      <v-row no-gutters align="center" class="flex-column">
        <v-card class=" w-50" style="max-height: 70%; border-radius: 10px;">
          <v-card-title style="background-color: #112d4ef1; color: #f5f5f5; ">
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
            <v-btn style="background-color: #112d4ef1; color: #f5f5f5; border-radius: 10px;" block dark>
              Update
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="mt-5 w-50" style="max-height: 70%; border-radius: 10px;">
          <v-card-title style="background-color: #112d4ef1; color: #f5f5f5;">
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
            <v-btn style="background-color: #112d4ef1; color: #f5f5f5; border-radius: 10px;" block dark>
              Update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-col>
  </v-row>
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
