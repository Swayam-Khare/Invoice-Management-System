<template>
  <v-btn :class="styling" variant="text" @click="showLoginDialog = true"> Login </v-btn>
  <v-dialog v-model="showLoginDialog" max-width="400" centered>
    <v-card>
      <v-card-title class="pl-6 pt-6">
        <span class="text-h4 font-weight-bold">Login</span>
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

      <v-card-text class="pl-6 pt-3 pb-4"
        >Not registered? <a href="#" style="text-decoration: none; color: blue">Sign up</a>
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
