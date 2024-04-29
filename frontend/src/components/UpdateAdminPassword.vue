<template>
  <v-dialog max-width="400" centered persistent>
    <v-card>
      <v-card-title
        class="d-flex justify-space-between align-center"
        style="background-color: #112d4ef1"
      >
        <p style="color: #f5f5f5" class="text-h5 pl-2">Update Password</p>
        <v-btn icon="close" variant="text" color="#f5f5f5" @click="$emit('close')"></v-btn>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" @submit.prevent="submitForm">
          <v-text-field
            v-model="currentPassword"
            label="Current Password"
            :rules="passwordRules"
            variant="outlined"
            color="#112d4e"
            class="mt-1"
            density="compact"
            :append-inner-icon="!currentVisible ? 'visibility_off' : 'visibility'"
            :type="currentVisible ? 'text' : 'password'"
            @click:appendInner="currentVisible = !currentVisible"
          >
          </v-text-field>
          <v-text-field
            v-model="newPassword"
            label="New Password"
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
            :rules="passwordRules"
            variant="outlined"
            color="#112d4e"
            class="mt-1"
            density="compact"
            :append-inner-icon="!confirmVisible ? 'visibility_off' : 'visibility'"
            :type="confirmVisible ? 'text' : 'password'"
            @click:appendInner="confirmVisible = !confirmVisible"
          >
          </v-text-field>
          <v-card-actions class="pl-6 pt-0 pr-6">
            <v-btn color="#112D4E" type="submit" variant="elevated" block>Update</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { ref, computed } from 'vue'
import { useAdminStore } from '../stores/admin'
import { useVendorStore } from '../stores/vendorStore'

// import router from '@/router';
const router = useRouter()
const adminStore = useAdminStore()
const vendorStore = useVendorStore()
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const isFocused = ref(false)
const currentVisible = ref(false)
const newVisible = ref(false)
const confirmVisible = ref(false)
let form = ref(undefined)

const emit = defineEmits(['close', 'update'])

const passwordRules = computed(() => [(v) => !!v || 'Password is required'])

const submitForm = async () => {
  const check = await validate()
  const password = {
    currentPassword: currentPassword.value,
    newPassword: newPassword.value,
    confirmPassword: confirmPassword.value
  }
  if (check.valid) {
    await adminStore.updatePassword(password)
    emit('close')
    if (adminStore.updatePasswordStatus === 200) {
      emit('update')
    }
  } else {
    toast.error('Something went Wrong!.', {
      autoClose: 1000,
      type: 'error',
      position: 'bottom-center',
      transition: 'zoom',
      dangerouslyHTMLString: true
    })
    return
  }
  currentPassword.value = null
  newPassword.value = null
  confirmPassword.value = null
}

function validate() {
  return form.value.validate()
}
</script>
