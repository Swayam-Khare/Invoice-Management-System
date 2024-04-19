<template>
  <div class="pa-2" id="invoice-container">
    <div class="pt-2 pl-6" style="width: fit-content">
      <h1>Create Invoice</h1>
      <v-divider class="mb-4"></v-divider>
    </div>

    <!-- Due Date -->
    <div style="width: fit-content" class="d-flex flex-wrap ga-md-6 ml-auto mr-4">
      <div style="width: 300px">
        <v-menu v-model="showDuePicker" :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <div class="d-flex justify-space-around align-center">
              <v-icon color="#112D4E" class="mb-7 mr-4 ml-4 ml-md-0" icon="calendar_month"></v-icon>
              <v-text-field
                color="#112d4e"
                density="compact"
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
        <v-menu v-model="showPurchasePicker" :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <div class="d-flex justify-space-around align-center">
              <v-icon color="#112D4E" class="mb-7 mr-4 ml-4 ml-md-0" icon="calendar_month"></v-icon>
              <v-text-field
                variant="outlined"
                density="compact"
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
        <v-icon color="#112D4E" class="mb-7 mr-4 ml-4 ml-md-0" icon="pending_actions"></v-icon>
        <v-select
          variant="outlined"
          color="#112D4E"
          label="Status"
          density="compact"
          :items="status"
        ></v-select>
      </div>
    </div>

    <!-- Customer Info -->
    <div class="bg-white rounded-lg mx-4 elevation-3 mb-7">
      <div class="d-flex flex-wrap justify-space-between align-center py-4 px-6">
        <h3>Customer Info</h3>
        <v-btn
          color="#112D4E"
          @click="showSelectCustomer = true"
          class="text-capitalize mt-2 mt-sm-0"
          >Select Customer</v-btn
        >
      </div>
      <v-divider class="mb-4 mx-4"></v-divider>
      <div class="d-flex flex-wrap flex-column flex-sm-row px-sm-2 justify-space-around">
        <div class="d-flex flex-wrap flex-column px-4 px-sm-0 custom-info">
          <v-text-field
            density="compact"
            variant="outlined"
            label="First Name"
            color="#112D4E"
          ></v-text-field>
          <v-text-field
            density="compact"
            variant="outlined"
            label="Last Name"
            color="#112D4E"
          ></v-text-field>
          <v-text-field
            density="compact"
            variant="outlined"
            label="Email"
            color="#112D4E"
          ></v-text-field>
          <v-text-field
            density="compact"
            variant="outlined"
            label="Contact"
            color="#112D4E"
          ></v-text-field>
        </div>
        <div class="d-flex flex-wrap flex-column px-4 px-sm-0 custom-info">
          <v-text-field
            density="compact"
            variant="outlined"
            label="Address Lane 1"
            color="#112D4E"
          ></v-text-field>
          <v-text-field
            density="compact"
            variant="outlined"
            label="Address Lane 2"
            color="#112D4E"
          ></v-text-field>
          <v-text-field
            density="compact"
            variant="outlined"
            label="Landmark"
            color="#112D4E"
          ></v-text-field>
          <div class="d-flex ga-2">
            <v-text-field
              label="Pincode"
              v-model="pincode"
              :rules="pincodeRules"
              variant="outlined"
              color="#112d4e"
              density="compact"
            ></v-text-field>
            <v-text-field
              label="State"
              v-model="fatchedState"
              :rules="[required]"
              variant="outlined"
              color="#112d4e"
              density="compact"
              :disabled="true"
            ></v-text-field>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Info -->
    <div class="bg-white rounded-lg mx-4 elevation-3 mb-7">
      <v-table density="comfortable">
        <thead>
          <tr>
            <th class="text-left">Product</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Price</th>
            <th class="text-left">Discount</th>
            <th class="text-left">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orderData" :key="item.product">
            <td>
              {{ item.product }}
            </td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.discount }}</td>
            <td>{{ item.subtotal }}</td>
          </tr>
          <tr style="background-color: white !important">
            <td>
              <v-btn
                color="#112D4E"
                @click="showSelectProduct = true"
                prepend-icon="add"
                variant="outlined"
                class="text-capitalize mx-n1 my-3"
                >Product</v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>

    <!-- Addtional Notes -->
    <div class="d-flex flex-wrap mr-5 justify-space-between">
      <div class="custom-notes mr-3 mr-sm-0">
        <textarea
          style="resize: none"
          class="rounded-lg text-capitalize mx-4 pt-3 pl-4 bg-white elevation-3 w-100"
          placeholder="Addtional Notes"
          rows="5"
          color="#112D4E"
        ></textarea>
      </div>

      <div class="custom-total mr-sm-5 mr-md-0 text-h6 ml-5 mt-2 mt-sm-n2">
        <div class="d-flex justify-space-between w-100">
          <span>Subtotal: </span> <span>$0.00</span>
        </div>
        <div class="d-flex justify-space-between w-100">
          <span>Discount: </span> <span>$0.00</span>
        </div>
        <div class="d-flex justify-space-between w-100"><span>Tax: </span> <span> $0.00</span></div>
        <div class="d-flex justify-space-between w-100">
          <span>Total: </span> <span> $0.00</span>
        </div>
        <div class="mt-5 d-flex justify-center">
          <v-btn color="#006c53" class="text-capitalize">Create Invoice</v-btn>
        </div>
      </div>
    </div>

    <!-- Select Customer Dialog -->
    <SelectCustomer v-model="showSelectCustomer" @close="showSelectCustomer = false" />

    <!-- Select Product Dialog -->
    <SelectProduct v-model="showSelectProduct" @close="showSelectProduct = false" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import SelectCustomer from './SelectCustomer.vue'
import SelectProduct from './SelectProduct.vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'

const showDuePicker = ref(false)
const showPurchasePicker = ref(false)
const actualDueDate = ref(null)
const actualPurchaseDate = ref(null)
const showSelectCustomer = ref(false)
const showSelectProduct = ref(false)
const status = ['Paid', 'Due', 'Overdue']
const pincode = ref('')
const fatchedState = ref('')

const required = (v) => !!v || 'This field is Required'

const pincodeRules = computed(() => [
  (v) => !!v || 'Pincode is required.',
  (v) => (v && /^\d+$/.test(v)) || 'Pincode must contain only digits.',
  (v) => (v && /^\d{6}$/.test(v)) || 'Pincode must be exactly 6 digits.'
])

const fetchStateFromPincode = async (pincode) => {
  try {
    const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
    fatchedState.value = response.data[0].PostOffice[0].State
  } catch (error) {
    console.log(error)
    toast.error('Pincode is invalid!', {
      autoClose: 1000,
      pauseOnHover: false,
      type: 'error',
      position: 'bottom-center',
      transition: 'zoom',
      dangerouslyHTMLString: true
    })
  }
}

watch(pincode, async (newPincode) => {
  if (newPincode && newPincode.length === 6) {
    await fetchStateFromPincode(newPincode)
  } else {
    fatchedState.value = ''
  }
})

const orderData = ref([
  { product: 'Dish Washer', quantity: 2, price: 5000, discount: 100, subtotal: 4900 },
  { product: 'TV', quantity: 1, price: 30000, discount: 2000, subtotal: 28000 }
])

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
.custom-info {
  width: 100%;
}

.custom-notes {
  width: 100%;
}

.custom-total {
  width: 100%;
}

@media only screen and (min-width: 600px) {
  .custom-info {
    width: 48% !important;
  }

  .custom-notes {
    width: 50% !important;
  }

  .custom-total {
    width: 25% !important;
  }
}

@media only screen and (min-width: 900px) {
  .custom-total {
    width: 15% !important;
  }
}

h1,
h3 {
  color: #112d4e;
}

#invoice-container {
  background-color: #112d4e14;
}

th {
  padding: 10px 20px;
  text-align: left;
  /* border-bottom: 2px solid rgba(0, 0, 0, 0.521); */
  background-color: #112d4ecc;
  color: white;
}

tr:nth-child(even) {
  background-color: #112d4e13;
}
</style>
