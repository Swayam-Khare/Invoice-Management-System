<template>
  <div id="formContainer">
    <v-sheet class="mx-auto my-8" height="auto" max-width="1000" width="100%">
      <v-hover v-slot="{ isHovering, props }">
        <v-card v-bind="props" :elevation="isHovering ? 12 : 6" class="mx-auto">
          <v-form>
            <v-row justify="center" class="mb-2">
              <v-col cols="12" class="text-center">
                <v-card-title class="mt-3">
                  <h3
                    style="color: #112d4e"
                    :class="{
                      'text-large': $vuetify.display.mdAndUp,
                      'text-normal': $vuetify.display.smAndDown
                    }"
                  >
                    Send us a message and we will get in touch!
                  </h3>
                </v-card-title>
              </v-col>
            </v-row>
            <v-card-text>
              <v-form class="px-3" ref="form" @submit.prevent="submitForm">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="First Name"
                      v-model="firstName"
                      :rules="[alphabetOnlyRule, required]"
                      variant="outlined"
                      color="#112d4e"
                      density="compact"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="Last Name"
                      v-model="lastName"
                      :rules="[alphabetOnlyRule]"
                      variant="outlined"
                      color="#112d4e"
                      density="compact"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Email"
                      :rules="[emailRule]"
                      v-model="email"
                      variant="outlined"
                      color="#112d4e"
                      class="mt-1"
                      density="compact"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Contact No."
                      :rules="contactNoRules"
                      v-model="contactNo"
                      variant="outlined"
                      color="#112d4e"
                      class="mt-1"
                      density="compact"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      label="Leave us a message"
                      v-model="messageUs"
                      variant="outlined"
                      color="#112d4e"
                      class="mt-1"
                      rows="4"
                      density="compact"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="12" sm="6" md="4">
                    <v-btn
                      type="submit"
                      class="mt-1 txt-button"
                      color="#112d4e"
                      @click="sendMail"
                      block
                      >{{ buttonText }}</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-form>
        </v-card>
      </v-hover>
    </v-sheet>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from '../stores/axios'
import { toast } from 'vue3-toastify'
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const contactNo = ref('')
const messageUs = ref('')
const buttonText = ref('Send Message')

const required = (v) => !!v || 'This field is Required'

const alphabetOnlyRule = (v) => /^[A-Za-z\s]*$/.test(v) || 'Alphabets only.'
const emailRule = (v) => /.+@.+\..+/.test(v) || 'Invalid email address.'

const contactNoRules = computed(() => [
  (v) => !!v || 'Contact number is required.',
  (v) => (v && /^\d+$/.test(v)) || 'Contact number must contain only digits.',
  (v) => (v && /^\d{10}$/.test(v)) || 'Contact number must be of 10 digits.'
])
const form = ref(null) // If you need a ref to the form for validation
async function submitForm() {
  const check = await validate()
  // console.log(check.valid);
  if (check.valid) {
    resetForm()
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
  messageUs.value = null
}

async function sendMail() {
  buttonText.value = 'Sending...'
  const check = await validate()

  if (check.valid) {
    const res = await axios.post('/admin/mail', {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      contact: contactNo.value,
      message: messageUs.value
    })
    if (res.status === 200) {
      toast.success(res.data.message, {
        autoClose: 2000,
        pauseOnHover: false,
        type: 'success',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
    } else {
      toast.error(res.data.message, {
        autoClose: 2000,
        pauseOnHover: false,
        type: 'error',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
    }
  } else {
    toast.error('Please fill all the fields correctly', {
      autoClose: 2000,
      pauseOnHover: false,
      type: 'error',
      position: 'bottom-center',
      transition: 'zoom',
      dangerouslyHTMLString: true
    })
  }
  buttonText.value = 'Send Message'
}
</script>

<style>
.rounded-sheet {
  border-radius: 100px;
}
.white-space-normal {
  white-space: normal;
}

.text-large {
  font-size: 1.5rem;
  font-weight: bold;
}

.text-normal {
  white-space: normal;
}
</style>
