<template>
    <v-dialog max-width="500px" centered persistent>
      <v-card class="rounded-lg remove-scrollbar">
        <v-card-title
          class="d-flex justify-space-between align-center"
          style="background-color: #112d4ef1"
        >
          <p style="color: #f5f5f5" class="text-h5 pl-5">New Product</p>
          <v-btn icon="close" variant="text" color="#f5f5f5" @click="closeDialog"></v-btn>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="form" @submit.prevent="submitForm">
            <v-text-field
              label="Name"
              v-model="productName"
              variant="outlined"
              color="#112d4e"
              class="mt-1"
              density="compact"
            ></v-text-field>
            
            <v-text-field
              label="Description"
              v-model="description"
              variant="outlined"
              color="#112d4e"
              class="mt-1"
              density="compact"
            ></v-text-field>
            <v-text-field
              label="stock"
              v-model="stock"
              variant="outlined"
              color="#112d4e"
              density="compact"
            ></v-text-field>
            <v-text-field
              label="Price"
              v-model="price"
              variant="outlined"
              color="#112d4e"
              density="compact"
            ></v-text-field>
            <v-text-field
              label="Discount"
              v-model="discount"
              variant="outlined"
              color="#112d4e"
              density="compact"
            ></v-text-field>
           
            <v-btn class="mt-1 txt-button" color="#112d4e" @click="validate" block>Create</v-btn>
            
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const emit = defineEmits(['close', 'login'])
  
 const productName = ref('');
 const description = ref('');
 const stock = ref();
 const price = ref();
 const discount = ref();
  const alphabetOnlyRule = (v) => /^[A-Za-z\s]*$/.test(v) || 'Alphabets only.'
  const emailRule = (v) => /.+@.+\..+/.test(v) || 'Invalid email address.'
 
  
  const form = ref(null) // If you need a ref to the form for validation
  
  function submitForm() {
    if (form.value.validate()) {
      console.log('Form submitted!')
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
    shopName.value = ''
    addressLine1.value = ''
    addressLine2.value = ''
    pincode.value = ''
    state.value = ''
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
  