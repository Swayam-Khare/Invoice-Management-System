<template>
  <div id="formContainer">
    <v-sheet
      class="mx-auto mt-8" 
      height="128"
      max-width="1000"
      width="100%"
       >
       <v-hover v-slot="{ isHovering, props }">
      <v-card v-bind="props" :elevation="isHovering ? 24 : 6" class="mx-auto"> <!-- Centering the card -->   
     <v-form>
    <v-row justify="center" class="mb-2"> <!-- Reduce margin bottom -->
      <v-col cols="12" class="text-center">
        <v-card-title class="mt-3">
          <h3 style="color: #112d4e">Send us a message and we will get in touch!</h3>
        </v-card-title>
      </v-col>
    </v-row>
    <v-card-text>
      <v-form class="px-3" ref="form" @submit.prevent="submitForm" >
        <v-row justify="center">
          <v-col cols="12" md="3" class="pb-0 pb-md-2"> <!-- Reduce padding bottom -->
            <v-text-field
              label="First Name"
              v-model="firstName"
              :rules="[alphabetOnlyRule]"
              variant="outlined"
              color="#112d4e"
             ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" class="pb-0 pb-md-2"> <!-- Reduce padding top -->
            <v-text-field
              label="Last Name"
              v-model="lastName"
              :rules="[alphabetOnlyRule]"
              variant="outlined"
              color="#112d4e"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="6" class="pb-0 pb-md-2"> <!-- Reduce padding bottom -->
            <v-text-field
              label="Email"
              :rules="[emailRule]"
              v-model="email"
              variant="outlined"
              color="#112d4e"
              class="mt-1"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="6" class="pb-0 pb-md-2"> <!-- Reduce padding bottom -->
            <v-text-field
              label="Contact No."
              :rules="contactNoRules"
              v-model="contactNo"
              variant="outlined"
              color="#112d4e"
              class="mt-1"                
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
        <v-col cols="12" md="6" class="pb-0 pb-md-2">
          <v-textarea
            label="Leave us a message"
            v-model="messageUs"
            variant="outlined"
            color="#112d4e"
            class="mt-1"
            rows="4"
          ></v-textarea>
        </v-col>
      </v-row>
        <v-row justify="center">
          <v-col cols="12" md="3" class="pb-0 pb-md-2"> <!-- Reduce padding bottom -->
            <v-btn class="mt-1 txt-button" color="#112d4e" @click="validate" block>Send Message</v-btn>        
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
const emit = defineEmits(['close', 'login'])
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const contactNo = ref('')
const messageUs = ref('')
const alphabetOnlyRule = (v) => /^[A-Za-z\s]*$/.test(v) || 'Alphabets only.'
const emailRule = (v) => /.+@.+\..+/.test(v) || 'Invalid email address.'

const contactNoRules = computed(() => [
  (v) => !!v || 'Contact number is required.',
  (v) => (v && /^\d+$/.test(v)) || 'Contact number must contain only digits.',
  (v) => (v && v.length >= 10) || 'Contact number must be at least 10 digits.'
])
const form = ref(null) // If you need a ref to the form for validation
function submitForm() {
  if (form.value.validate()) {
    console.log('Your details have been submitted!')
    resetForm()
  }
}
function validate() {
  form.value.validate()
}
function resetForm() {
  firstName.value = ''
  lastName.value = ''
  email.value = ''
  contactNo.value = ''
  messageUs.value = ''
}
</script>

<style>
.rounded-sheet
{
  border-radius: 100px;
}
</style>