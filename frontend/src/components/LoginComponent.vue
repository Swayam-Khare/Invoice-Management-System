<template>
  <v-dialog max-width="400" centered persistent>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center" style="background-color: #112d4ef1">
        <p style="color: #f5f5f5" class="text-h5 pl-2">{{ myTitle }}</p>
        <v-btn icon="close" variant="text" color="#f5f5f5" @click="$emit('close')"></v-btn>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-text-field v-model="email" label="Email" :rules="emailRules" variant="outlined" color="#112d4e"
            density="compact" @blur="isFocused = false" @focus="isFocused = true"></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" :rules="passwordRules" variant="outlined"
            color="#112d4e" class="mt-1" density="compact" @blur="isFocused = false"
            @focus="isFocused = true"></v-text-field>
          <v-card-actions class="pl-6 pt-0 pr-6">
            <v-btn color="#112D4E" type="submit" variant="elevated" block :disabled="!isFormValid">Login</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>


      <v-card-text v-if="myTitle == 'Vendor Login'" class="pl-6 pt-3 pb-4 text-center">
        Not registered?
        <a href="#" style="text-decoration: none; color: #112d4e; font-weight: bold"
          @click="$emit('close'), $emit('signup')">
          Sign Up
        </a>
      </v-card-text>
      <v-card-text v-if="myTitle == 'Admin Login'" class="pl-6 pt-3 pb-4 text-center">
        Not an Admin?
        <a href="#" style="text-decoration: none; color: #112d4e; font-weight: bold"
          @click="$emit('close'), $emit('vendor')">
          Login as Vendor
        </a>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useAdminStore } from '../stores/admin';
import { useVendorStore } from '../stores/vendor';
// import router from '@/router';
const router = useRouter();
const adminStore = useAdminStore();
const vendorStore = useVendorStore();
const email = ref('')
const password = ref('')
const isFocused = ref(false)

const emit = defineEmits(['close', 'signup', 'vendor'])

const { myTitle } = defineProps({
  myTitle: {
    type: String,
    // default: 'Admin Login'
  }
})
console.log(myTitle , "Tvhbkjvhwvfwhk vcnd fjbhsfkbjcw dnsm")
const emailRules = computed(() => [
  (v) => !!v || 'Email is required',
  (v) => /.+@.+\..+/.test(v) || 'Email must be valid'
])

const passwordRules = computed(() => [
  (v) => !!v || 'Password is required'
])

const isFormValid = computed(() => {
  const emailValid = emailRules.value.every(rule => rule(email.value) === true)
  const passwordValid = passwordRules.value.every(rule => rule(password.value) === true)
  return emailValid && passwordValid
})


const submitForm = async () => {
  // Close the dialog
  // if (isFormValid.value) {
  //  await adminStore.loginAdmin({ email: email.value, password: password.value });
  //  await vendorStore.loginVendor({ email: email.value, password: password.value });
  //   emit('close');
  //   console.log('line 82',adminStore.token);
  //   console.log('line 83',vendorStore.token);
  //   if (adminStore.token) {
  //     console.log('true');
  //     router.replace('/admin')
  //   } else console.log('false')
  //   console.log('in line 87',adminStore.stateVariable);
  //   // email.value = null;
  //   // password.value = null;
  // }
  if (isFormValid.value) {
    console.log(myTitle);
    if (myTitle === 'Admin Login') {
      await adminStore.loginAdmin({ email: email.value, password: password.value });
      emit('close');
      console.log('line 97', adminStore.token);
      if (adminStore.token) {
        console.log('true');
        router.replace('/admin');
      } else {
        console.log('false');
      }
      console.log('in line 97', adminStore.stateVariable);
    } else if (myTitle === 'Vendor Login') {
      await vendorStore.loginVendor({ email: email.value, password: password.value });
      emit('close');
      console.log('line 108', vendorStore.token);
      if (vendorStore.token) {
        console.log('true');
        router.replace('/vendor');
      } else {
        console.log('false');
      }
      console.log('in line 108', vendorStore.stateVariable);
    }
    else{
      console.log('false');
    }
  }
}
</script>
