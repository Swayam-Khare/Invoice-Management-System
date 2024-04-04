<template>
  <div class="pa-2 w-screen h-screen" id="invoice-container">
    <div class="pt-2 pl-6" style="width: fit-content">
      <h1>Create Invoice</h1>
      <v-divider class="mb-4"></v-divider>
    </div>

    <!-- Due Date -->
    <div style="width: fit-content" class="d-flex ga-6 ml-auto mr-4">
      <div style="width: 300px">
        <v-menu v-model="showDuePicker">
          <template v-slot:activator="{ props }">
            <div class="d-flex justify-space-around align-center">
              <v-icon color="#112D4E" class="mb-7 mr-4" icon="calendar_month"></v-icon>
              <v-text-field
                color="#112d4e"
                variant="outlined"
                @click="showDuePicker = !showDuePicker"
                v-model="dueDate"
                label="Due Date"
                readonly
                v-bind="props"
              ></v-text-field>
            </div>
          </template>
          <v-date-picker
            v-model="actualDueDate"
            date-format="MMM d, yyyy"
            @input="showDuePicker = false"
          ></v-date-picker>
        </v-menu>
      </div>

      <!-- Purchase Date -->
      <div style="width: 300px">
        <v-menu v-model="showPurchasePicker">
          <template v-slot:activator="{ props }">
            <div class="d-flex justify-space-around align-center">
              <v-icon color="#112D4E" class="mb-7 mr-4" icon="calendar_month"></v-icon>
              <v-text-field
                variant="outlined"
                @click="showPurchasePicker = !showPurchasePicker"
                v-model="purchaseDate"
                label="Purchase Date"
                readonly
                v-bind="props"
              ></v-text-field>
            </div>
          </template>
          <v-date-picker
            v-model="actualPurchaseDate"
            date-format="MMM d, yyyy"
            @input="showPurchasePicker = false"
          ></v-date-picker>
        </v-menu>
      </div>

      <!-- Status Select -->
      <div style="width: 300px" class="d-flex align-center">
        <v-icon color="#112D4E" class="mb-7 mr-4" icon="pending_actions"></v-icon>
        <v-select variant="outlined" color="#112D4E" label="Status" :items="status"></v-select>
      </div>
    </div>

    <!-- Customer Info -->
    <div class="bg-white rounded-lg mx-4 elevation-3">
      <div class="d-flex justify-space-between align-center py-4 px-6">
        <h3>Customer Info</h3>
        <v-btn color="#112D4E" class="text-capitalize">Select Customer</v-btn>
      </div>
      <v-divider class="mb-4 mx-4"></v-divider>
      <div class="d-flex justify-space-around">
        <div class="d-flex flex-column" style="width: 700px">
          <v-text-field variant="outlined" label="First Name" color="#112D4E"></v-text-field>
          <v-text-field variant="outlined" label="Last Name" color="#112D4E"></v-text-field>
          <v-text-field variant="outlined" label="Email" color="#112D4E"></v-text-field>
          <v-text-field variant="outlined" label="Contact" color="#112D4E"></v-text-field>
        </div>
        <div class="d-flex flex-column" style="width: 700px">
          <v-text-field variant="outlined" label="Address Lane 1" color="#112D4E"></v-text-field>
          <v-text-field variant="outlined" label="Address Lane 2" color="#112D4E"></v-text-field>
          <v-text-field variant="outlined" label="Landmark" color="#112D4E"></v-text-field>
          <div class="d-flex ga-2">
            <v-select
              variant="outlined"
              item-color="#112D4E"
              color="#112D4E"
              label="State"
              :items="states"
            ></v-select>
            <v-text-field variant="outlined" label="Pincode" color="#112D4E"></v-text-field>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showDuePicker = ref(false)
const showPurchasePicker = ref(false)
const actualDueDate = ref(null)
const actualPurchaseDate = ref(null)
const status = ['Paid', 'Due', 'Overdue']
const states = ['Uttar Pradesh', 'Gujarat', 'Rajasthan']

const dueDate = computed(() => {
  if (actualDueDate.value) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return actualDueDate.value.toLocaleDateString('en-US', options)
  }
  return ''
})

const purchaseDate = computed(() => {
  if (actualPurchaseDate.value) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return actualPurchaseDate.value.toLocaleDateString('en-US', options)
  }
  return ''
})
</script>

<style scoped>
h1,
h3 {
  color: #112d4e;
}

#invoice-container {
  background-color: #112d4e17;
}
</style>
