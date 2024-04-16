<template>
  <v-container fluid style="height: fit-content" v-model="isOpen">
    <v-row justify="center" align="center" class="text-center">
      <v-col cols="12" md="4">
        <v-card v-if="currentPage === 'personal'" style="border-radius: 10px" class="mt-8">
          <v-card-title class="text-center mb-10 text-white" style="background-color: #112d4ecc"
            >Personal Details</v-card-title
          >
          <v-card-text class="w-100 mx-auto px-10">
            <v-text-field
              v-model="firstName"
              label="First Name"
              :rules="[alphabetOnlyRule]"
              variant="outlined"
              density="compact"
            ></v-text-field>
            <v-text-field
              v-model="lastName"
              label="Last Name"
              :rules="[alphabetOnlyRule]"
              variant="outlined"
              density="compact"
            ></v-text-field>
            <v-text-field
              v-model="shopName"
              label="Shop Name"
              :rules="[alphabetOnlyRule]"
              variant="outlined"
              density="compact"
            ></v-text-field>

            <v-text-field
              v-model="contact"
              label="Contact"
              :rules="contactNoRules"
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="d-flex justify-center mb-4">
            <v-btn style="background-color: #112d4e" class="text-white mx-6" @click="updateProfile"
              >Update</v-btn
            >
            <v-btn style="background-color: #112d4e" class="text-white mx-6" @click="closeForm"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>

        <v-card v-else style="border-radius: 10px">
          <v-card-title class="text-center mb-10 text-white" style="background-color: #112d4ecc"
            >Address Details</v-card-title
          >
          <v-card-text class="w-100 mx-auto px-10" justify="center">
            <v-text-field
              v-model="addressLane1"
              label="Address Lane 1"
              variant="outlined"
              density="compact"
            ></v-text-field>
            <v-text-field
              v-model="addressLane2"
              label="Address Lane 2"
              variant="outlined"
              density="compact"
            ></v-text-field>
            <v-text-field
              v-model="landmark"
              label="Landmark"
              variant="outlined"
              density="compact"
            ></v-text-field>
            <v-text-field
              v-model="pincode"
              label="Pincode"
              variant="outlined"
              density="compact"
            ></v-text-field>
            <v-text-field
              v-model="state"
              label="State"
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="d-flex justify-center mb-4">
            <div justify="center" align="center">
              <v-btn
                style="background-color: #112d4e"
                class="text-white mx-6"
                @click="updateProfile"
                >Update</v-btn
              >
              <v-btn style="background-color: #112d4e" class="text-white mx-6" @click="closeForm"
                >Close</v-btn
              >
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const isOpen = ref(true)
const emit = defineEmits(['close'])

const props = defineProps({
  initialPage: {
    type: String,
    default: 'personal'
  }
})

const currentPage = ref(props.initialPage)

const alphabetOnlyRule = (v) => /^[A-Za-z\s]*$/.test(v) || 'Alphabets only.'

const contactNoRules = computed(() => [
  (v) => !!v || 'Contact number is required.',
  (v) => (v && /^\d+$/.test(v)) || 'Contact number must contain only digits.',
  (v) => (v && v.length >= 10) || 'Contact number must be at least 10 digits.'
])

const firstName = ref('')
const lastName = ref('')
const shopName = ref('')
const contact = ref('')

const addressLane1 = ref('')
const addressLane2 = ref('')
const landmark = ref('')
const pincode = ref('')
const state = ref('')

const fetchVendorData = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:7000/api/v1/vendors/1`)
    const vendorData = response.data

    // Update the form fields with the fetched data
    firstName.value = vendorData.firstName
    lastName.value = vendorData.lastName
    shopName.value = vendorData.shopName
    contact.value = vendorData.contact
    addressLane1.value = vendorData.addressLane1
    addressLane2.value = vendorData.addressLane2
    landmark.value = vendorData.landmark
    pincode.value = vendorData.pincode
    state.value = vendorData.state
  } catch (error) {
    console.error('Error fetching vendor data:', error)
  }
}

onMounted(() => {
  fetchVendorData()
})

const goToAddressPage = () => {
  currentPage.value = 'address'
}

const goToPersonalPage = () => {
  currentPage.value = 'personal'
}

const updateProfile = async () => {
  try {
    const vendorData = {
      firstName: firstName.value,
      lastName: lastName.value,
      shopName: shopName.value,
      contact: contact.value,
      addressLane1: addressLane1.value,
      addressLane2: addressLane2.value,
      landmark: landmark.value,
      pincode: pincode.value,
      state: state.value
    }

    await axios.put(`/api/v1/vendors/:id`, vendorData)
    console.log('Profile updated successfully')
    closeForm()
  } catch (error) {
    console.error('Error updating profile:', error)
  }
}

const closeForm = () => {
  emit('close')
}
</script>

<style>
.heading {
  font-size: 32px;
  margin-top: 100px;
}
</style>
