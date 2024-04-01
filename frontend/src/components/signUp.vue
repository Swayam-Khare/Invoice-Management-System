<template>
  <v-dialog  max-width="500px" persistent>
    <v-card class="rounded-lg remove-scrollbar">
      <v-card-title
        class="d-flex justify-space-between align-center"
        style="background-color: #112d4ef1"
      >
        <p style="color: #f5f5f5" class="text-h5 pl-5">Sign Up</p>
        <v-btn icon="close" variant="text" color="#f5f5f5" @click="$emit('close')"></v-btn>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form" @submit.prevent="submitForm">
          <v-row>
            <v-col cols="12" md="6" class="pb-0 pb-md-3">
              <v-text-field
                label="First Name"
                v-model="firstName"
                :rules="[alphabetOnlyRule]"
                variant="outlined"
                color="#112d4e"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pt-1 pt-md-3">
              <v-text-field
                label="Last Name"
                v-model="lastName"
                :rules="[alphabetOnlyRule]"
                variant="outlined"
                color="#112d4e"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            label="Email"
            :rules="[emailRule]"
            v-model="email"
            variant="outlined"
            color="#112d4e"
            class="mt-1"
          ></v-text-field>
          <v-text-field
            label="Contact No."
            :rules="contactNoRules"
            v-model="contactNo"
            variant="outlined"
            color="#112d4e"
            class="mt-1"
          ></v-text-field>
          <v-text-field
            label="Shop Name"
            v-model="shopName"
            variant="outlined"
            color="#112d4e"
            class="mt-1"
          ></v-text-field>
          <v-text-field
            label="Address Line 1"
            v-model="addressLine1"
            variant="outlined"
            color="#112d4e"
          ></v-text-field>
          <v-text-field
            label="Address Line 2"
            v-model="addressLine2"
            variant="outlined"
            color="#112d4e"
          ></v-text-field>
          <v-row>
            <v-col cols="12" md="6" class="pb-0 pb-md-3">
              <v-text-field
                label="Pincode"
                v-model="pincode"
                :rules="pincodeRules"
                variant="outlined"
                color="#112d4e"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pt-1 pt-md-3">
              <v-text-field
                label="State"
                v-model="state"
                variant="outlined"
                color="#112d4e"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn class="mt-1 txt-button" color="#112d4e" @click="validate" block>Sign Up</v-btn>
          <div class="d-flex justify-center align-center text-center">
            <span>Already have an account?</span>
            <v-btn
              variant="text"
              color="#112d4e"
              @click="$emit('close'), $emit('login')"
              :ripple="false"
              class="pl-1 pr-0 font-weight-bold text-capitalize"
            >
              Log In
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      contactNo: '',
      shopName: '',
      addressLine1: '',
      addressLine2: '',
      pincode: '',
      state: '',
      alphabetOnlyRule: (v) => /^[A-Za-z\s]*$/.test(v) || 'Alphabets only.',
      emailRule: (v) => /.+@.+\..+/.test(v) || 'Invalid email address.'
    }
  },
  emits: ['close', 'login'],
  computed: {
    pincodeRules() {
      return [
        (v) => !!v || 'Pincode is required.',
        (v) => (v && /^\d+$/.test(v)) || 'Pincode must contain only digits.',
        (v) => (v && /^\d{6}$/.test(v)) || 'Pincode must be exactly 6 digits.'
      ]
    },
    contactNoRules() {
      return [
        (v) => !!v || 'Contact number is required.',
        (v) => (v && /^\d+$/.test(v)) || 'Contact number must contain only digits.',
        (v) => (v && v.length >= 10) || 'Contact number must be at least 10 digits.'
      ]
    }
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        // Process the signup form data here
        console.log('Form submitted!')
        // Reset form fields
        this.resetForm()
      }
    },
    validate() {
      this.$refs.form.validate()
    },
    resetForm() {
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.shopName = ''
      this.addressLine1 = ''
      this.addressLine2 = ''
      this.pincode = ''
      this.state = ''
    }
  }
}
</script>

<style>
.remove-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
