<template>
  <v-dialog max-width="400" centered persistent>
    <v-card>
      <v-card-title
        class="d-flex justify-space-between align-center"
        style="background-color: #112d4ef1"
      >
        <p style="color: #f5f5f5" class="text-h5 pl-2">{{ myTitle }}</p>
        <v-btn icon="close" variant="text" color="#f5f5f5" @click="$emit('close')"></v-btn>
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field
            v-model="email"
            label="Email"
            :rules="emailRules"
            variant="outlined"
            color="#112d4e"
            @blur="isFocused = false"
            @focus="isFocused = true"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="passwordRules"
            variant="outlined"
            color="#112d4e"
            @blur="isFocused = false"
            @focus="isFocused = true"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions class="pl-6 pt-0 pr-6">
        <v-btn color="#112D4E" variant="elevated" block @click="login">Login</v-btn>
      </v-card-actions>

      <v-card-text v-if="myTitle == 'Vendor Login'" class="pl-6 pt-3 pb-4 text-center">
        Not registered?
        <a
          href="#"
          style="text-decoration: none; color: #112d4e; font-weight: bold"
          @click="$emit('signup'), $emit('close')"
        >
          Sign Up
        </a>
      </v-card-text>
      <v-card-text v-if="myTitle == 'Admin Login'" class="pl-6 pt-3 pb-4 text-center">
        Not an Admin?
        <a
          href="#"
          style="text-decoration: none; color: #112d4e; font-weight: bold"
          @click="$emit('close'), $emit('vendor')"
        >
          Login as Vendor
        </a>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'

const email = ref('')
const password = ref('')
const isFocused = ref(false)

const emit = defineEmits(['close', 'signup', 'vendor'])

const props = defineProps({
  myTitle: {
    type: String,
    default: 'Admin Login'
  }
})
const emailRules = computed(() => [
  (v) => !!v || 'Email is required',
  (v) => /.+@.+\..+/.test(v) || 'Email must be valid'
])

const passwordRules = computed(() => [
  (v) => !!v || 'Password is required'
])

const login = () => {
  console.log('Email:', email.value)
  console.log('Password:', password.value)
  // Close the dialog
  emit('close')
}
</script>
