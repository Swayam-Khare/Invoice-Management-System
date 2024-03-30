<template>
  <v-dialog v-model="showLoginDialog" max-width="400" centered persistent>
    <v-card>
      <v-card-title
        class="d-flex justify-space-between align-center"
        style="background-color: #112d4ef1"
      >
        <p style="color: #f5f5f5" class="text-h5 pl-5">Log In</p>
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

      <v-card-text class="pl-6 pt-3 pb-4 text-center">
        Not registered?
        <a
          href="#"
          style="text-decoration: none; color: #112d4e; font-weight: bold"
          @click="$emit('signup'), $emit('close')"
        >
          Sign Up
        </a>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      showLoginDialog: false,
      isFocused: false,
      email: '',
      password: '',
      emailRules: [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      passwordRules: [(v) => !!v || 'Password is required']
    }
  },
  props: {
    styling: String
  },
  emits: ['close', 'signup'],
  methods: {
    login() {
      // Logic
      console.log('Email:', this.email)
      console.log('Password:', this.password)
      // Close the dialog
      this.showLoginDialog = false
    }
  }
}
</script>
