<template>
  <v-container fluid style="height: fit-content" v-model="isOpen">
    <v-row justify="center" align="center" class="text-center">
      <v-col cols="12" md="4">
        <v-card style="border-radius: 10px">
          <v-card-title class="text-center mb-10 text-white" style="background-color: #112d4ecc"
            >Update Password</v-card-title
          >

          <v-card-text class="w-100 mx-auto px-10">
            <v-text-field
              v-model="currentPassword"
              label="Current Password"
              variant="outlined"
              density="compact"
            ></v-text-field>

            <v-text-field
              v-model="newPassword"
              label="New Password"
              variant="outlined"
              density="compact"
            ></v-text-field>

            <v-text-field
              v-model="confirmPassword"
              label="Confirm Password"
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(true)
const emit = defineEmits(['close'])

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

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
