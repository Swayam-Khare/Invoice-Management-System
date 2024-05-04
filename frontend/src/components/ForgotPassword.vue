<template>
  <v-dialog max-width="400" centered persistent>
    <v-card class="pb-8">
      <v-card-title
        class="d-flex justify-space-between align-center mb-6"
        style="background-color: #112d4ef1"
      >
        <p style="color: #f5f5f5" class="text-h5 pl-2">Forgot Password</p>
        <v-btn icon="close" variant="text" color="#f5f5f5" @click="$emit('close')"></v-btn>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-text-field
            v-model="email"
            label="Email"
            :rules="emailRules"
            variant="outlined"
            color="#112d4e"
            density="compact"
            class="mb-2"
          ></v-text-field>
          <v-card-actions>
            <v-btn color="#112D4E" type="submit" variant="elevated" block :disabled="!isFormValid"
              >Send</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import {useVendorStore} from '../stores/vendorStore.js'

const email = ref(null);
const vendorStore = useVendorStore();

const emit = defineEmits(['close'])

const emailRules = computed(() => [
  (v) => !!v || 'Email is required',
  (v) => /.+@.+\..+/.test(v) || 'Email must be valid'
])


const isFormValid = computed(() => {
  const emailValid = emailRules.value.every((rule) => rule(email.value) === true)
    return emailValid;
})

async function submitForm() {
    await vendorStore.forgotPassword(email.value);
    emit('close');
}
</script>

<style scoped></style>
