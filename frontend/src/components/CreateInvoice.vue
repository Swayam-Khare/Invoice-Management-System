<template>
  <div class="pa-2" id="invoice-container">
    <div class="pt-2 pl-6" style="width: fit-content">
      <h1>Create Invoice</h1>
      <v-divider class="mb-4"></v-divider>
    </div>

    <v-form ref="dateForm" >
      <div style="width: fit-content" class="d-flex flex-wrap ga-md-6 ml-auto mr-4">
        <!-- Purchase Date -->
        <div style="width: 300px">
          <v-menu v-model="showPurchasePicker" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <div class="d-flex justify-space-around align-center">
                <v-icon
                  color="#112D4E"
                  class="mb-7 mr-4 ml-4 ml-md-0"
                  icon="calendar_month"
                ></v-icon>
                <v-text-field
                  variant="outlined"
                  density="compact"
                  :rules="[required]"
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
              :max="new Date(Date.now())"
              @input="showPurchasePicker = false"
            ></v-date-picker>
          </v-menu>
        </div>

        <!-- Due Date -->
        <div style="width: 300px">
          <v-menu v-model="showDuePicker" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <div class="d-flex justify-space-around align-center">
                <v-icon
                  color="#112D4E"
                  class="mb-7 mr-4 ml-4 ml-md-0"
                  icon="calendar_month"
                ></v-icon>
                <v-text-field
                  color="#112d4e"
                  density="compact"
                  :rules="[required]"
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
              :min="actualPurchaseDate ? actualPurchaseDate : new Date(Date.now())"
              v-model="actualDueDate"
              date-format="MMM d, yyyy"
              @input="showDuePicker = false"
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
            :rules="[required]"
            v-model="statusValue"
            density="compact"
            :items="status"
            class="text-capitalize"
          ></v-select>
        </div>
      </div>
    </v-form>

    <!-- Customer Info -->
    <div class="bg-white rounded-lg mx-4 elevation-3 mb-7">
      <div class="d-flex flex-wrap justify-space-between align-center py-4 px-6">
        <h3>Customer Info</h3>
        <div class="d-flex ga-5 flex-column flex-sm-row">
          <v-btn
            color="red"
            @click="handleClear"
            :class="{ 'd-none': !readOnly }"
            class="text-capitalize mt-2 mt-sm-0"
            >Clear Customer</v-btn
          >
          <v-btn
            color="#112D4E"
            @click="showSelectCustomer = true"
            class="text-capitalize mt-2 mt-sm-0"
            >Select Customer</v-btn
          >
        </div>
      </div>
      <v-divider class="mb-4 mx-4"></v-divider>
      <v-form ref="customerForm" @submit="console.log('submitted')" >
        <div class="d-flex flex-wrap flex-column flex-sm-row px-sm-2 justify-space-around">
          <div class="d-flex flex-wrap flex-column px-4 px-sm-0 custom-info">
            <v-text-field
              density="compact"
              variant="outlined"
              :rules="[required]"
              label="First Name"
              color="#112D4E"
              v-model="existingCustomerDetails.firstName"
              :readOnly="readOnly"
            ></v-text-field>
            <v-text-field
              density="compact"
              variant="outlined"
              label="Last Name"
              color="#112D4E"
              v-model="existingCustomerDetails.lastName"
              :readOnly="readOnly"
            ></v-text-field>
            <v-text-field
              density="compact"
              variant="outlined"
              :rules="[required]"
              label="Email"
              color="#112D4E"
              v-model="existingCustomerDetails.email"
              :readOnly="readOnly"
            ></v-text-field>
            <v-text-field
              density="compact"
              variant="outlined"
              validate-on="input | lazy submit"
              :rules="[required]"
              label="Contact"
              color="#112D4E"
              v-model="existingCustomerDetails.contact"
              :readOnly="readOnly"
            ></v-text-field>
          </div>
          <div class="d-flex flex-wrap flex-column px-4 px-sm-0 custom-info">
            <v-text-field
              density="compact"
              variant="outlined"
              label="Address Lane 1"
              :rules="[required]"
              color="#112D4E"
              v-model="existingCustomerDetails.address_lane1"
              :readOnly="readOnly"
            ></v-text-field>
            <v-text-field
              density="compact"
              variant="outlined"
              label="Address Lane 2"
              color="#112D4E"
              v-model="existingCustomerDetails.address_lane2"
              :readOnly="readOnly"
            ></v-text-field>
            <v-text-field
              density="compact"
              variant="outlined"
              :rules="[required]"
              label="Landmark"
              color="#112D4E"
              v-model="existingCustomerDetails.landmark"
              :readOnly="readOnly"
            ></v-text-field>
            <div class="d-flex ga-2">
              <v-text-field
                label="Pincode"
                v-model="existingCustomerDetails.pincode"
                :readOnly="readOnly"
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
                :readOnly="true"
              ></v-text-field>
            </div>
          </div>
        </div>
      </v-form>
    </div>

    <!-- Product Info -->
    <div class="bg-white rounded-lg mx-4 elevation-3 mb-7">
      <v-table density="comfortable">
        <thead>
          <tr>
            <th class="pl-9">Product</th>
            <th class="pl-8">Quantity</th>
            <th class="text-left">Price(₹)</th>
            <th class="text-left">Discount(%)</th>
            <th class="text-left">Subtotal(₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orderData" :key="item.name">
            <td class="d-flex align-center">
              <input :id="item.name" @click="checkProduct(item)" type="checkbox" class="mr-2" />
              <label :for="item.name" class="cursor-pointer">{{ item.name }}</label>
            </td>
            <td>
              <div class="d-flex align-center">
                <v-icon
                  color="red"
                  @click="decreaseQty(item)"
                  class="cursor-pointer mr-1 rounded-circle text-center"
                  >do_not_disturb_on</v-icon
                >
                <input
                  type="number"
                  class="pa-2 text-center"
                  style="width: 50px"
                  @change="quantityChange(item)"
                  inputmode="numeric"
                  v-model="item.quantity"
                />
                <v-icon color="green" class="ml-2 cursor-pointer" @click="increaseQty(item)"
                  >add_circle</v-icon
                >
              </div>
            </td>
            <td>{{ item.price }}</td>
            <td>{{ item.discount }}</td>
            <td>{{ subtotal(item.quantity, item.price, item.discount) }}</td>
          </tr>
          <tr style="background-color: white !important">
            <td colspan="2">
              <v-btn
                color="#112D4E"
                @click="showSelectProduct = true"
                prepend-icon="add"
                variant="outlined"
                class="text-capitalize mx-n1 my-3"
                >Product</v-btn
              >

              <v-btn
                color="red"
                @click="clearProducts"
                prepend-icon="close"
                variant="outlined"
                class="text-capitalize ml-6 my-3"
                v-if="showBtn"
                >Delete</v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>

    <!-- Addtional Notes -->
    <div class="d-flex flex-column flex-md-row mr-5 ga-4 justify-space-between">
      <div class="custom-notes mr-3 mr-sm-0 w-100">
        <textarea
          style="resize: none"
          class="rounded-lg mx-4 pt-3 pl-4 bg-white elevation-3 w-100"
          placeholder="Addtional Notes"
          rows="5"
          v-model="notes"
          color="#112D4E"
        ></textarea>
      </div>

      <div class="custom-total mr-sm-5 mr-md-0 text-h6 ml-5 mt-2 mt-sm-n2 w-100">
        <div class="d-flex justify-space-between w-100">
          <span>Subtotal(₹): </span> <span>{{ subtotalFinal() }}</span>
        </div>
        <div class="d-flex justify-space-between w-100">
          <span>Discount(%): </span>
          <input
            type="number"
            style="width: 70px"
            v-model="totalDiscount"
            class="bg-white border-md px-2 text-right"
            inputmode="numeric"
          />
        </div>
        <div class="d-flex justify-space-between w-100">
          <span>Tax(%): </span>
          <input
            v-model="totalTax"
            type="number"
            style="width: 70px"
            class="bg-white border-md px-2 text-right"
            inputmode="numeric"
          />
        </div>
        <div class="d-flex justify-space-between w-100">
          <span>Total(₹): </span> <span>{{ total() }}</span>
        </div>
        <div class="mt-5 d-flex justify-center">
          <v-btn color="#006c53" type="submit" @click="createInvoice" class="text-capitalize"
            >Create Invoice</v-btn
          >
        </div>
      </div>
    </div>

    <!-- Select Customer Dialog -->
    <SelectCustomer
      v-model="showSelectCustomer"
      @close="showSelectCustomer = false"
      @selected-customer-data="handleCustomer"
    />

    <!-- Select Product Dialog -->
    <SelectProduct
      v-model="showSelectProduct"
      @close="showSelectProduct = false"
      @select-existing-product="handleProduct"
      :selectedProducts="orderData"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import SelectCustomer from './SelectCustomer.vue'
import SelectProduct from './SelectProduct.vue'
import axios, { formToJSON } from 'axios'
import { toast } from 'vue3-toastify'
import { useProductStore } from '@/stores/productStore'
import { useInvoiceStore } from '@/stores/invoiceStore'

const productStore = useProductStore()
const invoiceStore = useInvoiceStore()

const showDuePicker = ref(false)
const statusValue = ref(null)
const notes = ref('')
const showPurchasePicker = ref(false)
const actualDueDate = ref(null)
const actualPurchaseDate = ref(null)
const showSelectCustomer = ref(false)
const showSelectProduct = ref(false)
const status = ['paid', 'due', 'overdue']
const readOnly = ref(false)
const fatchedState = ref('')
const existingCustomerDetails = ref({})
const selected = ref([])
const totalTax = ref(null)
const totalDiscount = ref(null)
const subtotalValue = ref(0)
const totalValue = ref(0)
const showBtn = ref(false)

const dateForm = ref(null)
const customerForm = ref(null)

watch(selected.value, () => {
  console.log(Object.keys(selected.value).length)
  showBtn.value = Object.keys(selected.value).length > 0 ? true : false
})

const required = (v) => !!v || 'This field is Required'

function subtotal(qty, price, discount) {
  return qty * price - (qty * price * discount) / 100
}

function subtotalFinal() {
  let total = 0
  for (let item of orderData.value) {
    total += subtotal(item.quantity, item.price, item.discount)
  }
  subtotalValue.value = total
  return total.toFixed(2)
}

function total() {
  let total = parseFloat(subtotalFinal())
  let tax = (total * totalTax.value) / 100
  let discount = (total * totalDiscount.value) / 100
  total = total + tax - discount
  totalValue.value = total
  const finalTotal = total.toFixed(2)
  return finalTotal
}


 

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

const checkProduct = (item) => {
  if (selected.value[item.id]) {
    delete selected.value[item.id]
  } else {
    selected.value[item.id] = true
  }
  console.log(selected.value)
}

watch(
  () => existingCustomerDetails.value.pincode,
  async (newPincode) => {
    if (newPincode && newPincode.length === 6) {
      await fetchStateFromPincode(newPincode)
    } else {
      fatchedState.value = ''
    }
  }
)

const clearProducts = () => {
  orderData.value = orderData.value.filter((item) => !selected.value[item.id])

  selected.value.length = 0
}

const quantityChange = (item) => {
  if (item.quantity < 1) {
    item.quantity = 1
    toast.warning('Minimum quantity must be 1', {
      autoClose: 1000,
      pauseOnHover: false,
      type: 'warning',
      position: 'bottom-center',
      transition: 'zoom',
      dangerouslyHTMLString: true
    })
  } else if (item.quantity > item.stock) {
    item.quantity = item.stock
    toast.warning('Maximum stock reached!', {
      autoClose: 1000,
      pauseOnHover: false,
      type: 'warning',
      position: 'bottom-center',
      transition: 'zoom',
      dangerouslyHTMLString: true
    })
  }
}

const increaseQty = (item) => {
  if (item.quantity === item.stock) {
    toast.warning('Maximum stock reached!', {
      autoClose: 1000,
      pauseOnHover: false,
      type: 'warning',
      position: 'bottom-center',
      transition: 'zoom',
      dangerouslyHTMLString: true
    })
    return
  }
  item.quantity++
}

const decreaseQty = (item) => {
  if (item.quantity === 1) {
    toast.warning('Minimum quantity must be 1', {
      autoClose: 1000,
      pauseOnHover: false,
      type: 'warning',
      position: 'bottom-center',
      transition: 'zoom',
      dangerouslyHTMLString: true
    })
    return
  }
  item.quantity--
}

function handleClear() {
  existingCustomerDetails.value = {}
  readOnly.value = false
}

const orderData = ref([])

function handleCustomer(custData) {
  const { Address_Details } = custData
  existingCustomerDetails.value = { ...Address_Details }
  existingCustomerDetails.value.firstName = custData.firstName.split(' ')[0]
  existingCustomerDetails.value.lastName = custData.lastName
  existingCustomerDetails.value.email = custData.email
  readOnly.value = true
  console.log(existingCustomerDetails.value)
}

async function handleProduct(prodData) {
  await productStore.getSelectedProducts(prodData)
  orderData.value = productStore.selectedProducts
  for (let item of orderData.value) {
    item.quantity = 1
  }
}

async function createInvoice(e) {
  e.preventDefault()
  const invoiceData = {
    customer_details: {
      firstName: existingCustomerDetails.value.firstName,
      lastName: existingCustomerDetails.value.lastName,
      email: existingCustomerDetails.value.email,
      contact: existingCustomerDetails.value.contact
    },
    Address_Details: {
      address_lane1: existingCustomerDetails.value.address_lane1,
      address_lane2: existingCustomerDetails.value.address_lane2,
      landmark: existingCustomerDetails.value.landmark,
      pincode: existingCustomerDetails.value.pincode,
      state: fatchedState.value,
      contact: existingCustomerDetails.value.contact
    },
    due_date: actualDueDate.value,
    purchase_date: actualPurchaseDate.value,
    tax: +totalTax.value,
    delivery_charge: 0, // TODO: fix this
    status: statusValue.value,
    subtotal: subtotalValue.value,
    total: totalValue.value,
    penalty: 0, // TODO: fix this
    notes: notes.value,
    discount: +totalDiscount.value,
    order_details: {
      productId: orderData.value.map((item) => item.id),
      quantity: orderData.value.map((item) => item.quantity)
    }
  }

  const check = await validate()
  // console.log(check.valid)
  if (check) {
    await invoiceStore.createInvoice(invoiceData)
    console.log(dateForm.value);
    // existingCustomerDetails.value = {}
    // actualPurchaseDate.value = undefined
    // actualDueDate.value = null
    // statusValue.value = null
    readOnly.value = false
    dueDate = null
    purchaseDate = null
    orderData.value = []
    notes.value = ''
    totalDiscount.value = 0
    totalTax.value = 0
    dateForm.value.reset()
    customerForm.value.reset()
  }
  // console.log(invoiceData)
}

async function validate() {
   const isDateValid = await dateForm.value.validate()
   const isCustomerValid = await customerForm.value.validate()
   return isDateValid.valid && isCustomerValid.valid
}

let dueDate = computed(() => {
  if (actualDueDate.value) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return actualDueDate.value.toLocaleDateString('en-IN', options)
  }
  return ''
})

let purchaseDate = computed(() => {
  actualDueDate.value = null
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  if (actualPurchaseDate.value) {
    return actualPurchaseDate.value.toLocaleDateString('en-IN', options)
  }
  // return new Date(Date.now()).toLocaleDateString('en-IN', options)
  return ''
})
</script>

<style scoped>
.custom-info {
  width: 100%;
}

.custom-notes {
  /* width: 100%; */
  width: 96% !important;
}

.custom-total {
  width: 96% !important;
}

@media only screen and (min-width: 600px) {
  .custom-info {
    width: 48% !important;
  }

  .custom-notes {
    width: 98% !important;
  }

  .custom-total {
    align-self: center;
    width: 40% !important;
  }
}

@media only screen and (min-width: 900px) {
  .custom-total {
    width: 35% !important;
  }

  .custom-notes {
    width: 50% !important;
  }
}
@media only screen and (min-width: 1439px) {
  .custom-total {
    width: 25% !important;
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

input[type='checkbox'] {
  accent-color: #112d4e;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}
</style>
