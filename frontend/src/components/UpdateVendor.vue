<template>
  <v-container fluid>
    <v-row justify="center" align="center" class="text-center">
      <v-col><v-text>Update Your Information Here </v-text></v-col>
    </v-row>
    <v-row justify="center" align="center" style="height: 100vh" class="text-center">
      <!-- Supporting Image on the Left -->
      <v-col cols="2">
        <img
          v-if="currentPage === 'personal'"
          src="../assets/imgs/vendor/photo-1.svg"
          alt="Left Image"
          style="max-width: 100%"
        />
        <img
          v-if="currentPage === 'address'"
          src="../assets/imgs/vendor/photo-3.svg"
          alt="Left Image"
          style="max-width: 100%"
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-card v-if="currentPage === 'personal'">
          <v-card-title class="text-center mb-4">Personal Details</v-card-title>
          <v-card-text class="w-50 mx-auto">
            <v-text-field
              v-model="firstName"
              label="First Name"
              :rules="[alphabetOnlyRule]"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="lastName"
              label="Last Name"
              :rules="[alphabetOnlyRule]"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="shopName"
              label="Shop Name"
              :rules="[alphabetOnlyRule]"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              v-model="contact"
              label="Contact"
              :rules="contactNoRules"
              variant="outlined"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn @click="goToAddressPage">Next </v-btn>
          </v-card-actions>
        </v-card>

        <v-card v-else>
          <v-card-title class="text-center mb-4">Address Details</v-card-title>
          <v-card-text class="w-50 mx-auto" justify="center">
            <v-text-field
              v-model="addressLane1"
              label="Address Lane 1"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="addressLane2"
              label="Address Lane 2"
              variant="outlined"
            ></v-text-field>
            <v-text-field v-model="landmark" label="Landmark" variant="outlined"></v-text-field>
            <v-text-field v-model="pincode" label="Pincode" variant="outlined"></v-text-field>
            <v-text-field v-model="state" label="State" variant="outlined"></v-text-field>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn @click="goToPersonalPage">Previous</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <!-- Supporting Image on the Right -->
      <v-col cols="2">
        <img
          v-if="currentPage === 'personal'"
          src="../assets/imgs/vendor/photo-2.svg"
          alt="Right Image"
          style="max-width: 100%"
        />
        <img
          v-if="currentPage === 'address'"
          src="../assets/imgs/vendor/photo-4.svg"
          alt="Right Image"
          style="max-width: 100%"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

const alphabetOnlyRule = (v) => /^[A-Za-z\s]*$/.test(v) || 'Alphabets only.'

const contactNoRules = computed(() => [
  (v) => !!v || 'Contact number is required.',
  (v) => (v && /^\d+$/.test(v)) || 'Contact number must contain only digits.',
  (v) => (v && v.length >= 10) || 'Contact number must be at least 10 digits.'
])

const currentPage = ref('personal')
const firstName = ref('vivek')
const lastName = ref('singh')
const shopName = ref('Gada Electronics')
const contact = ref('9601038130')

const addressLane1 = ref('kadodara')
const addressLane2 = ref('palsana')
const landmark = ref('surat')
const pincode = ref('394327')
const state = ref('Gujarat')

function goToAddressPage() {
  currentPage.value = 'address'
}

function goToPersonalPage() {
  currentPage.value = 'personal'
}
</script>
