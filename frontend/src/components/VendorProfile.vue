<template>
  <!-- <h1>{{ imageUrl }}</h1> -->
  <div class="card elevation-6 pa-4 rounded-lg w-75 ma-auto position-relative">
    <div class="card-body d-flex flex-wrap align-center justify-space-around">
      <div class="position-relative">
        <img class="user-photo" src="@/assets/imgs/User/1.png" alt="User Photo" />
        <div class="approved-icon" v-if="data.status === 'approved'">
          <v-tooltip v-model="show" location="bottom">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" color="#fff" size="lg"> check </v-icon>
            </template>
            <span class="approved">User is approved</span>
          </v-tooltip>
        </div>
        <div class="pending-icon" v-if="data.status === 'pending'">
          <v-tooltip v-model="show" location="bottom">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" color="#fff" size="lg"> priority_high </v-icon>
            </template>
            <span>Approval is pending</span>
          </v-tooltip>
        </div>
      </div>
      <div class="user-info d-flex flex-column">
        <!-- <p class="text-h5">Personal Details</p> -->
        <div>
          <span class="text-subtitle-1">Name: </span>
          <span class="text-subtitle-2">{{ data.firstName }}</span>
        </div>

        <div>
          <span class="text-subtitle-1">Email: </span>
          <span class="text-subtitle-2">{{ data.email }}</span>
        </div>
        <div>
          <span class="text-subtitle-1">Shop Name: </span>
          <span class="text-subtitle-2">{{ data.shopName }}</span>
        </div>
        <div>
          <span class="text-subtitle-1">Contact: </span>
          <span class="text-subtitle-2">{{ data.Address_Details.contact }}</span>
        </div>
      </div>
      <div class="user-info adddress">
        <p class="text-subtitle-1">Address</p>
        <p class="text-subtitle-2">{{ data.Address_Details.address_lane1 }},</p>
        <p class="text-subtitle-2">{{ data.Address_Details.address_lane2 }},</p>
        <p class="text-subtitle-2">
          {{ data.Address_Details.landmark }} - {{ data.Address_Details.pincode }},
        </p>
        <p class="text-subtitle-2">
          {{ data.Address_Details.state }}
        </p>
      </div>
    </div>
    <div class="d-flex justify-center ga-5">
      <v-btn class="delete" @click="deleteVendor(data.id)">Delete</v-btn>
      <v-btn v-if="data.status === 'pending'" class="approve" @click="approveVendor(data.id)"
        >Approve</v-btn
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useVendorStore } from '../stores/vendorStore'
const vendorStore = useVendorStore()
defineProps({
  data: Object
})
const emit = defineEmits(['unmountProfile'])
const show = ref(false)

async function deleteVendor(id) {
  await vendorStore.deleteVendor(id)
  emit('unmountProfile')
  // console.log('vendor is deleted',id)
}
async function approveVendor(id) {
  // console.log('id is ',id)
  await vendorStore.approveVendor(id)
  emit('unmountProfile')
}
</script>

<style scoped>
@media only screen and (max-width: 1025px) {
  .card {
    width: 80% !important;
  }
}
@media only screen and (max-width: 769px) {
  .card-body {
    justify-content: space-between !important;
    /* align-items: center !important; */
  }
}

@media only screen and (max-width: 426px) {
  .card-body {
    justify-content: center !important;
    align-items: center !important;
  }

  .user-info {
    width: 85% !important;
  }
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  background-color: #007bff;
  color: #fff;
  padding: 15px;
  text-align: center;
}

.card-body {
  padding: 20px;
}

.user-photo {
  width: 100%;
  max-width: 150px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 1px solid black;
}

.user-info {
  text-align: left;
  padding-right: 20px;
  /* border-right:2px solid #aaaaaa;  */
}

.approve {
  background-color: #00ff00dd;
  color: white;
  transition: 0.5s;
}

.approve:hover {
  color: #00ff00dd;
  background-color: white;
  transition: 0.5s;
}

.delete {
  background-color: #ff204e;
  color: white;
  transition: 0.5s;
}

.delete:hover {
  color: #ff204e;
  background-color: white;
  transition: 0.5s;
}

.approved-icon {
  position: absolute;
  top: 70%;
  left: 75%;
  box-shadow: 0 0 0 2px #fff;
  background-color: #00ff00dd;
  border-radius: 50%;
}

.pending-icon {
  position: absolute;
  top: 70%;
  left: 75%;
  box-shadow: 0 0 0 2px #fff;
  background-color: #ff204e;
  border-radius: 50%;
}
</style>
