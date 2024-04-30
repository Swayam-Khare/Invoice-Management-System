<template>
  <div class="update-wrapper">
    <v-card class="w-25">
      <v-card-title
        class="d-flex justify-space-between align-center"
        style="background-color: #112d4ef1"
      >
        <p style="color: #f5f5f5" class="text-h5 pl-2">Reset Password</p>
      </v-card-title>

      <v-card-text class="mt-8">
        <v-form ref="form" @submit.prevent="submitForm">
          <v-text-field
            v-model="newPassword"
            label="Password"
            :rules="passwordRules"
            variant="outlined"
            color="#112d4e"
            class="mt-1"
            density="compact"
            :append-inner-icon="!newVisible ? 'visibility_off' : 'visibility'"
            :type="newVisible ? 'text' : 'password'"
            @click:appendInner="newVisible = !newVisible"
          >
          </v-text-field>
          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            :rules="confirmPasswordRules"
            variant="outlined"
            color="#112d4e"
            class="mt-1"
            density="compact"
            :append-inner-icon="!confirmVisible ? 'visibility_off' : 'visibility'"
            :type="confirmVisible ? 'text' : 'password'"
            @click:appendInner="confirmVisible = !confirmVisible"
          >
          </v-text-field>
          <v-card-actions class="w-100">
            <v-btn color="#112D4E" type="submit" variant="elevated" block>Reset</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useVendorStore } from '@/stores/vendorStore';
import router from '@/router';
import { toast } from 'vue3-toastify';

const route = useRoute()
const token = ref(route.params.token)
const newVisible = ref(false)
const confirmVisible = ref(false)
const newPassword = ref(null);
const confirmPassword = ref(null);
const form = ref(null);
const vendorStore = useVendorStore();

const passwordRules = computed(() => [(v) => !!v || 'Password is required'])

const confirmPasswordRules = computed(() => [
    (v) => !!v || 'Confirm Password is required',
    (v) => v === newPassword.value || 'Password and Confirm Password must match'
]);

async function submitForm() {
    const check = await validate();
    if (check.valid) {
        const data = {
            password:newPassword.value,
            confirmPassword:confirmPassword.value
        }
        await vendorStore.resetPassword(data, token.value);
        router.replace('/');
    } else {
        toast.error('Enter valid details', {
        autoClose: 1000,
        type: 'error',
        position: 'bottom-center',
        transition: 'zoom',
        dangerouslyHTMLString: true
      })
    }
}

function validate() {
    return form.value.validate();
}

</script>

<style scoped>
.update-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.update-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  z-index: -1;
  background: url('../assets/imgs/doodle.jpg');
}
</style>
