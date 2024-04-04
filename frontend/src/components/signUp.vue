<template>
  <v-dialog max-width="500px" centered persistent>
    <v-card class="rounded-lg remove-scrollbar">
      <v-card-title class="d-flex justify-space-between align-center" style="background-color: #112d4ef1">
        <p style="color: #f5f5f5" class="text-h5 pl-5">Sign Up</p>
        <v-btn icon="close" variant="text" color="#f5f5f5" @click="closeDialog"></v-btn>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form" @submit.prevent="submitForm">
          <v-row>
            <v-col cols="12" md="6" class="pb-0 pb-md-3">
              <v-text-field label="First Name" v-model="firstName" :rules="[alphabetOnlyRule,required]" variant="outlined"
                color="#112d4e" density="compact"></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pt-1 pt-md-3">
              <v-text-field label="Last Name" v-model="lastName" :rules="[alphabetOnlyRule,required]" variant="outlined"
                color="#112d4e" density="compact"></v-text-field>
            </v-col>
          </v-row>
          <v-text-field label="Email" :rules="[emailRule]" v-model="email" variant="outlined" color="#112d4e"
            class="mt-1" density="compact"></v-text-field>
          <v-text-field label="Contact No." :rules="contactNoRules" v-model="contactNo" variant="outlined"
            color="#112d4e" class="mt-1" density="compact"></v-text-field>
          <v-text-field label="Shop Name" v-model="shopName" :rules="[required]" variant="outlined" color="#112d4e" class="mt-1"
            density="compact"></v-text-field>
          <v-text-field label="Address Line 1" v-model="addressLine1" :rules="[required]" variant="outlined" color="#112d4e"
            density="compact"></v-text-field>
          <v-text-field label="Address Line 2" v-model="addressLine2" variant="outlined" color="#112d4e"
            density="compact"></v-text-field>
          <v-row>
            <v-col cols="12" md="6" class="pb-0 pb-md-3">
              <v-text-field label="Pincode" v-model="pincode" :rules="pincodeRules" variant="outlined" color="#112d4e"
                class="mb-1" density="compact"></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pt-1 pt-md-3">
              <v-text-field label="State" v-model="state" :rules="[required]" variant="outlined" color="#112d4e"
                density="compact"></v-text-field>
            </v-col>
          </v-row>
          <v-btn type="submit" class="mt-1 txt-button" color="#112d4e" @click="validate" block>Sign Up</v-btn>
          <div class="d-flex justify-center align-center text-center">
            <span>Already have an account?</span>
            <v-btn variant="text" color="#112d4e" @click="$emit('close'), $emit('login')" :ripple="false"
              class="pl-1 pr-0 font-weight-bold text-capitalize">
              Log In
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['close', 'login'])

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const contactNo = ref('')
const shopName = ref('')
const addressLine1 = ref('')
const addressLine2 = ref('')
const pincode = ref('')
const state = ref('')
const alphabetOnlyRule = (v) => /^[A-Za-z\s]*$/.test(v) || 'Alphabets only.'
const emailRule = (v) => /.+@.+\..+/.test(v) || 'Invalid email address.'

const required = ((v) => (!!v || 'This field is Required'));

const pincodeRules = computed(() => [
  (v) => !!v || 'Pincode is required.',
  (v) => (v && /^\d+$/.test(v)) || 'Pincode must contain only digits.',
  (v) => (v && /^\d{6}$/.test(v)) || 'Pincode must be exactly 6 digits.'
])

const contactNoRules = computed(() => [
  (v) => !!v || 'Contact number is required.',
  (v) => (v && /^\d+$/.test(v)) || 'Contact number must contain only digits.',
  (v) => (v && /^\d{10}$/.test(v)) || 'Contact number must be of 10 digits.'
])

const form = ref(null) // If you need a ref to the form for validation

async function submitForm() {
  const check = await validate();
  // console.log(check.valid)
  if (check.valid) {
    // console.log('Form submitted!')
    resetForm()
    emit('close')
  }
}

function validate() {
  return form.value.validate()
}

function resetForm() {
  firstName.value = null
  lastName.value = null
  email.value = null
  contactNo.value = null
  shopName.value = null
  addressLine1.value = null
  addressLine2.value = null
  pincode.value = null
  state.value = null
}

function closeDialog() {
  emit('close')
}
</script>

<style>
.remove-scrollbar::-webkit-scrollbar {
  display: none;
}

.v-input__control {
  height: 45px !important;
}

.v-messages__message {
  white-space: nowrap !important;
}

.v-input__details {
  padding-left: 0px !important;
}
</style>
