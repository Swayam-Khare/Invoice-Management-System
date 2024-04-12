<template>
  <v-container fluid style="height: 100vh" v-model="isOpen">
    <v-row justify="center" align="center" class="text-center">
      <v-col cols="12" md="4">
        <v-card-title class="text-center mb-8 text-white" style="background-color: #112d4e"
          >Update Password</v-card-title
        >
        <v-divider></v-divider>

        <v-card-text class="w-50 mx-auto">
          <v-text-field
            v-model="currentPassword"
            label="New Password"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="newPassword"
            label="New Password"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            variant="outlined"
          ></v-text-field>
        </v-card-text>
      </v-col>
    </v-row>
    <div justify="center" align="center">
      <v-btn style="background-color: #112d4e" class="text-white mt-16">Update</v-btn>

      <v-btn style="background-color: #112d4e" class="text-white mt-16 ml-16" @click="closeForm"
        >Close</v-btn
      >
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(true)
const emit = defineEmits(['close'])

const currentPassword = ref('123456768')
const newPassword = ref('abcd1234')
const confirmPassword = ref('abcd1234')

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
