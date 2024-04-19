<template>

  <v-dialog max-width="500px" centered persistent >
    <v-card class="rounded-lg remove-scrollbar">
      <v-card-title
        class="d-flex justify-space-between align-center"
        style="background-color: #112d4ef1; height:56px"
      >
        <p style="color: #f5f5f5" class="text-h5 pl-5">Customer Details</p>
        <v-btn icon="close" variant="text" color="#f5f5f5" @click="closeDialog"></v-btn>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form" @submit.prevent="submitForm">
          <v-row>
            <v-col cols="12" md="6" class="pb-0 pb-md-3">
              <v-text-field
                label="First Name"
                v-model="details.firstName"
                :rules="[alphabetOnlyRule, required]"
                variant="outlined"
                color="#112d4e"
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pt-1 pt-md-3">
              <v-text-field
                label="Last Name"
                v-model="details.lastName"
                :rules="[alphabetOnlyRule]"
                variant="outlined"
                color="#112d4e"
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            label="Email"
            :rules="[emailRule]"
            v-model="details.email"
            variant="outlined"
            color="#112d4e"
            class="mt-1"
            density="compact"
          ></v-text-field>
          <v-text-field
            label="Contact No."
            :rules="contactRules"
            v-model="details.contact"
            variant="outlined"
            color="#112d4e"
            class="mt-1"
            density="compact"
          ></v-text-field>
          <v-text-field
            label="Address Line 1"
            v-model="details.Address_Details.address_lane1"
            :rules="[required]"
            variant="outlined"
            class="mt-1"
            color="#112d4e"
            density="compact"
          ></v-text-field>
          <v-text-field
            label="Address Line 2"
            v-model="details.Address_Details.address_lane2"
            variant="outlined"
            class="mt-1"
            color="#112d4e"
            density="compact"
          ></v-text-field>
          <v-text-field
            label="landmark"
            v-model="details.Address_Details.landmark"
            variant="outlined"
            class="mt-1"
            color="#112d4e"
            density="compact"
          ></v-text-field>
          <v-row>
            <v-col cols="12" md="6" class="pb-0 pb-md-3">
              <v-text-field
                label="Pincode"
                v-model="details.Address_Details.pincode"
                :rules="pincodeRules"
                variant="outlined"
                color="#112d4e"
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pt-1 pt-md-3">
              <v-text-field
                label="State"
                v-model="fatchedState"
                :rules="[required]"
                variant="outlined"
                color="#112d4e"
                density="compact"
                :readOnly="true"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn type="submit" class="mt-1 txt-button" color="#112d4e" @click="validate" block
            >Update</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch} from 'vue'
import { useCustomerStore } from '../stores/customerStore'
import axios from 'axios'
import { toast } from 'vue3-toastify'

const fatchedState = ref('')
const customerStore = useCustomerStore()
const emit = defineEmits(['close', 'login'])
const props = defineProps({
  editDetails: {
    type:Object
  }
});


const details = ref({Address_Details:{}})


watch(() => props.editDetails, (newDetails) => {
  details.value = { ...newDetails };
})


// const firstName = ref('')
// const lastName = ref('')
// const email = ref('')
// const contact = ref('')
// const address_lane1 = ref('')
// const address_lane2 = ref('')
// const pincode = ref('')
const alphabetOnlyRule = (v) => /^[A-Za-z\s]*$/.test(v) || 'Alphabets only.'
const emailRule = (v) => /.+@.+\..+/.test(v) || 'Invalid email address.'

const required = (v) => !!v || 'This field is Required'

const pincodeRules = computed(() => [
  (v) => !!v || 'Pincode is required.',
  (v) => (v && /^\d+$/.test(v)) || 'Pincode must contain only digits.',
  (v) => (v && /^\d{6}$/.test(v)) || 'Pincode must be exactly 6 digits.',
  // async(v) => await fetchStateFromPincode(v)
])

const contactRules = computed(() => [
  (v) => !!v || 'Contact number is required.',
  (v) => (v && /^\d+$/.test(v)) || 'Contact number must contain only digits.',
  (v) => (v && /^\d{10}$/.test(v)) || 'Contact number must be of 10 digits.'
])

const form = ref(null) // If you need a ref to the form for validation

const fetchStateFromPincode = async (pincode) => {
  try {
    const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
    fatchedState.value = response.data[0].PostOffice[0].State
    return true;
  } catch (error) {
    toast.error('Pincode is invalid!', {
      autoClose: 1000,
      pauseOnHover: false,
      type: 'error',
      position: 'bottom-center',
      transition: 'zoom',
      dangerouslyHTMLString: true
    })
    return 'Pincode is invalid!';
  }
}

watch(()=>details.value.Address_Details.pincode, async (newPincode) => {
  if (newPincode && newPincode.length === 6) {
    await fetchStateFromPincode(newPincode)
  } else {
    fatchedState.value = ''
  }
})


async function submitForm() {
  const formData = {
    id:details.value.id,
    firstName: details.value.firstName.split(' ')[0],
    lastName: details.value.lastName,
    email: details.value.email,
    contact: details.value.contact,
    address_lane1: details.value.Address_Details.address_lane1,
    address_lane2: details.value.Address_Details.address_lane2,
    landmark: details.value.Address_Details.landmark,
    pincode: details.value.Address_Details.pincode,
    state: fatchedState.value
  }
  const check = await validate()
  // console.log(check.valid)
  if (check.valid) {
    await customerStore.updateCustomer(formData)
  } else {
    console.log('Please enter complete details')
    toast.error('Something went Wrong!.', {
      autoClose: 1000,
      type: 'error',
      position: 'bottom-center',
      transition: 'zoom',
      dangerouslyHTMLString: true
    })
    return
  }

  // console.log('Form submitted!')
  resetForm()
  emit('close')
}
// }

function validate() {
  return form.value.validate()
}

function resetForm() {
  // firstName.value = null
  // lastName.value = null
  // email.value = null
  // contact.value = null
  // address_lane1.value = null
  // address_lane2.value = null
  // pincode.value = null
  fatchedState.value = ''
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
