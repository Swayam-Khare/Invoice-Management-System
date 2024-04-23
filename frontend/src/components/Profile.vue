<template>
  <v-container fluid style="background-color: #112d4e14; min-height: 100vh; height: auto">
    <!-- Heading -->
    <div v-if="!showForm" class="d-flex flex-wrap justify-space-between align-center px-6">
      <div>
        <h1>Vendor Profile</h1>
        <v-divider></v-divider>
      </div>

      <!-- update button -->
      <v-btn
        color="#112D4E"
        @click="showForm = true"
        class="text-capitalize mt-2"
        style="font-size: 19px"
        >UPDATE</v-btn
      >
    </div>

    <!-- Profile info -->
    <v-row no-gutters class="pt-10">
      <v-col cols="12" md="6" class="d-flex justify-end pr-4" v-if="!showForm">
        <!-- Personal Details card -->
        <v-card
          class="d-flex flex-column fill-height"
          style="border-radius: 10px; height: fit-content; min-width: 70%"
        >
          <v-card-title style="background-color: #112d4ecc; color: #f5f5f5; font-size: 24px">
            Personal Details
          </v-card-title>
          <v-card-text class="flex-grow-1 justify-space-between pa-5">
            <div>
              <v-avatar class="ma-5 ml-0" size="120">
                <img
                  class="my-auto mx-auto user-img"
                  src="../assets/imgs/User/2.png"
                  alt="Profile Image"
                  style="max-width: 100%; max-height: 100%"
                />
              </v-avatar>
              <div class="mb-2">
                <span class="font-weight-bold caption text-uppercase" style="font-size: 19px"
                  >First Name</span
                >
                <p style="font-size: 16px">{{ profile.firstName }}</p>
              </div>
              <div class="mb-2">
                <span class="font-weight-bold caption text-uppercase" style="font-size: 19px"
                  >Last Name</span
                >
                <p style="font-size: 16px">{{ profile.lastName }}</p>
              </div>
              <div class="mb-2">
                <span class="font-weight-bold caption text-uppercase" style="font-size: 19px"
                  >Shop Name</span
                >
                <p style="font-size: 16px">{{ profile.shopName }}</p>
              </div>
              <div class="mb-0">
                <span class="font-weight-bold caption text-uppercase" style="font-size: 19px"
                  >Contact</span
                >
                <p style="font-size: 16px">{{ profile.Address_Details.contact }}</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Address Details card -->
      <v-col cols="12" md="6" class="d-flex pl-4" v-if="!showForm">
        <v-row no-gutters align="left" class="flex-column">
          <v-card style="height: fit-content; width: 70%; border-radius: 10px">
            <v-card-title style="background-color: #112d4ecc; color: #f5f5f5; font-size: 24px">
              Address Details
            </v-card-title>
            <v-card-text class="px-5 py-6">
              <div class="mb-2">
                <span class="font-weight-bold caption text-uppercase" style="font-size: 19px"
                  >Address Lane 1</span
                >
                <p style="font-size: 16px">{{ profile.Address_Details.address_lane1 }}</p>
              </div>
              <v-row>
                <v-col cols="6" class="py-0 mt-3">
                  <div class="mb-2">
                    <span class="font-weight-bold caption text-uppercase" style="font-size: 19px"
                      >Address Lane 2</span
                    >
                    <p style="font-size: 16px">{{ profile.Address_Details.address_lane2 }}</p>
                  </div>
                </v-col>
                <v-col cols="6" class="py-0 mt-3">
                  <div class="mb-0">
                    <span class="font-weight-bold caption text-uppercase" style="font-size: 19px"
                      >Landmark</span
                    >
                    <p style="font-size: 16px">{{ profile.Address_Details.landmark }}</p>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" class="py-0 mt-0 mb-2">
                  <div class="mb-0">
                    <span class="font-weight-bold caption text-uppercase" style="font-size: 19px"
                      >State</span
                    >
                    <p style="font-size: 16px">{{ profile.Address_Details.state }}</p>
                  </div>
                </v-col>
                <v-col cols="6" class="py-0 mt-0 mb-2">
                  <div class="mb-0">
                    <span class="font-weight-bold caption text-uppercase" style="font-size: 19px"
                      >Pincode</span
                    >
                    <p style="font-size: 16px">{{ profile.Address_Details.pincode }}</p>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Credentials card -->
          <v-card class="mt-8" style="height: fit-content; width: 70%; border-radius: 10px">
            <v-card-title style="background-color: #112d4ecc; color: #f5f5f5; font-size: 24px">
              Credentials
            </v-card-title>
            <v-card-text class="px-5 py-6">
              <div class="mb-2">
                <span class="font-weight-bold caption text-uppercase" style="font-size: 19px"
                  >Email</span
                >
                <p style="font-size: 16px">{{ profile.email }}</p>
              </div>
              <div class="mb-0">
                <span class="font-weight-bold caption text-uppercase" style="font-size: 19px"
                  >Password</span
                >
                <p style="font-size: 16px">{{ password2 }}</p>
              </div>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>

    <!-- update profile page -->
    <div v-if="showForm" class="pa-2">
      <!-- update profile page heading -->
      <div class="pb-8 pl-4 mt-n5" style="width: fit-content">
        <h1>UPDATE PROFILE</h1>
        <v-divider class="mb-4"></v-divider>
      </div>

      <!-- Personal Details fields -->
      <div class="bg-white rounded-lg mx-4 elevation-3 mb-7">
        <div class="py-4 px-6">
          <h3>Personal Details</h3>
        </div>
        <v-divider class="mb-4 mx-4"></v-divider>
        <div class="d-flex flex-wrap flex-column flex-sm-row px-sm-2 justify-space-around">
          <div class="d-flex flex-wrap flex-column px-4 px-sm-0 custom-info">
            <v-text-field
              density="compact"
              variant="outlined"
              label="First Name"
              color="#112D4E"
              v-model="vendorData.firstName"
            ></v-text-field>
            <v-text-field
              density="compact"
              variant="outlined"
              label="Last Name"
              color="#112D4E"
              v-model="vendorData.lastName"
            ></v-text-field>
          </div>
          <div class="d-flex flex-wrap flex-column px-4 px-sm-0 custom-info">
            <v-text-field
              density="compact"
              variant="outlined"
              label="Shop Name"
              color="#112D4E"
              v-model="vendorData.shopName"
            ></v-text-field>
            <v-text-field
              density="compact"
              variant="outlined"
              maxlength="10"
              minlength="10"
              label="Contact"
              color="#112D4E"
              v-model="vendorData.Address_Details.contact"
            ></v-text-field>
          </div>
        </div>

        <v-divider class="mb-6 mx-4"></v-divider>

        <!-- Address Details fields -->
        <div class="py-4 px-6">
          <h3>Address Details</h3>
        </div>
        <v-divider class="mb-4 mx-4"></v-divider>
        <div class="d-flex flex-wrap flex-column flex-sm-row px-sm-2 justify-space-around">
          <div class="d-flex flex-wrap flex-column px-4 px-sm-0 custom-info">
            <v-text-field
              density="compact"
              variant="outlined"
              label="Address Lane 1"
              color="#112D4E"
              v-model="vendorData.Address_Details.address_lane1"
            ></v-text-field>
            <v-text-field
              density="compact"
              variant="outlined"
              label="Address Lane 2"
              color="#112D4E"
              v-model="vendorData.Address_Details.address_lane2"
            ></v-text-field>
          </div>
          <div class="d-flex flex-wrap flex-column px-4 px-sm-0 custom-info">
            <v-text-field
              density="compact"
              variant="outlined"
              label="Landmark"
              color="#112D4E"
              v-model="vendorData.Address_Details.landmark"
            ></v-text-field>
            <div class="d-flex ga-2">
              <v-text-field
                variant="outlined"
                item-color="#112D4E"
                color="#112D4E"
                label="State"
                density="compact"
                v-model="fatchedState"
                :disabled="true"
              ></v-text-field>
              <v-text-field
                variant="outlined"
                density="compact"
                maxlength="6"
                minlength="6"
                label="Pincode"
                :rules="pincodeRules"
                color="#112D4E"
                v-model="pincode"
              ></v-text-field>
            </div>
          </div>
        </div>

        <v-divider class="mb-6 mx-4"></v-divider>
        <v-overlay :model-value="isLoading" persistent>
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <!-- credentials field -->
        <div class="py-4 px-6">
          <h3>Credentials</h3>
        </div>
        <v-divider class="mb-4 mx-4"></v-divider>
        <div class="d-flex flex-wrap flex-column flex-sm-row px-sm-2 justify-space-around">
          <div class="d-flex flex-wrap flex-column px-4 px-sm-0" style="width: 98%">
            <v-text-field
              density="compact"
              variant="outlined"
              label="E-mail"
              color="#112D4E"
              v-model="vendorData.email"
              :disabled="true"
            ></v-text-field>
            <v-text-field
              density="compact"
              variant="outlined"
              type="password"
              label="Password"
              color="#112D4E"
              v-model="password"
            ></v-text-field>
            <v-text-field
              density="compact"
              variant="outlined"
              type="password"
              label="Confirm Password"
              color="#112D4E"
              v-model="confirmPassword"
            ></v-text-field>
          </div>
          <v-divider class="mb-4 mx-4"></v-divider>
        </div>

        <!-- update and close buttons -->
        <div justify="center" align="center" class="pb-6 pt-6">
          <v-btn style="background-color: #112d4e" class="text-white mx-6" @click="submitForm"
            >Update</v-btn
          >
          <v-btn style="background-color: #112d4e" class="text-white mx-6" @click="showForm = false"
            >Close</v-btn
          >
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { useVendorStore } from '@/stores/vendorStore'
import { ref, watch, onMounted, computed } from 'vue'
import { toast } from 'vue3-toastify'
import axios from 'axios'

const vendorStore = useVendorStore()

const isLoading = ref(false)

const showForm = ref(false)

let fatchedState = ref('')

const pincodeRules = computed(() => [
  (v) => !!v || 'Pincode is required.',
  (v) => (v && /^\d+$/.test(v)) || 'Pincode must contain only digits.',
  (v) => (v && /^\d{6}$/.test(v)) || 'Pincode must be exactly 6 digits.'
])

const password = ref('asdf123456')
const password2 = ref('**********')
const confirmPassword = ref('asdf123456')

const vendorData = ref({})
const props = defineProps(['profile'])

onMounted(() => {
  console.log(props.profile)
  // destruturing the data
  vendorData.value = JSON.parse(JSON.stringify(props.profile))
  console.log('vivek ', vendorData.value.Address_Details)
})

let pincode = ref(props.profile.Address_Details.pincode)

async function submitForm() {
  isLoading.value = true // Set loading state to true
  const formData = {
    firstName: vendorData.value.firstName,
    lastName: vendorData.value.lastName,
    email: vendorData.value.email,
    contact: vendorData.value.Address_Details.contact,
    shopName: vendorData.value.shopName,
    landmark: vendorData.value.Address_Details.landmark,
    address_lane1: vendorData.value.Address_Details.address_lane1,
    address_lane2: vendorData.value.Address_Details.address_lane2
  }
  try {
    await vendorStore.updateVendor(formData)
    isLoading.value = false // Set loading state to false after successful API call
  } catch (error) {
    isLoading.value = false // Set loading state to false if there's an error
    console.error('Error updating vendor:', error)
    // Handle error if needed
  }
}

const fetchStateFromPincode = async (pincode) => {
  try {
    const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
    fatchedState.value = response.data[0].PostOffice[0].State
  } catch (error) {
    toast.error('Pincode is invalid!', {
      autoClose: 1000,
      pauseOnHover: false,
      type: 'error',
      position: 'bottom-center',
      transition: 'zoom',
      dangerouslyHTMLString: true
    })
  }
}

watch(pincode, async (newPincode) => {
  if (newPincode && newPincode.length === 6) {
    await fetchStateFromPincode(newPincode)
  } else {
    fatchedState.value = ''
  }
})
</script>
<style scoped>
.custom-info {
  width: 100%;
}

@media only screen and (min-width: 600px) {
  .custom-info {
    width: 48% !important;
  }
}

h1,
h3 {
  color: #112d4e;
}

@media (max-width: 600px) {
  .d-sm-flex.justify-center {
    display: flex !important; /* override Vuetify's display class */
    justify-content: center; /* center horizontally */
  }
}
</style>
