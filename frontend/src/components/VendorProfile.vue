<template>
  <!-- <h1>{{ imageUrl }}</h1> -->
  <div class="card elevation-6 pa-4 rounded-lg w-50 ma-auto position-relative">
    <div class="approved-icon" v-if="data.status === 'approved'">
      
      <v-tooltip
          v-model="show"
          location="bottom"
        >
          <template v-slot:activator="{ props }">
              <v-icon v-bind="props" color="#fff" size="lg">
                  check
              </v-icon>
          </template>
          <span class="approved">User is approved</span>
        </v-tooltip>
    </div>
    <div class="pending-icon" v-if="data.status === 'pending'">
      <v-tooltip
          v-model="show"
          location="bottom"
        >
          <template v-slot:activator="{ props }">
              <v-icon v-bind="props" color="#fff" size="lg">
                  priority_high
              </v-icon>
          </template>
          <span>Approval is pending</span>
        </v-tooltip>
    </div>
    <div class="card-body d-flex align-start justify-space-between">
      <img class="user-photo" src="@/assets/imgs/User/1.png" alt="User Photo" />
      <div class="user-info d-flex flex-column ga-2">
        <!-- <p class="text-h5">Personal Details</p> -->
        <div>
          <span class="text-h6">Name: </span>
          <span class="text-subtitle-1">{{ data.fullName }}</span>
        </div>

        <div>
          <span class="text-h6">Email: </span>
          <span class="text-subtitle-1">{{ data.email }}</span>
        </div>
        <div>
          <span class="text-h6">Shop Name: </span>
          <span class="text-subtitle-1">{{ data.shopName }}</span>
        </div>
        <div>
          <span class="text-h6">Contact: </span>
          <span class="text-subtitle-1">{{ data.Address_Details.contact }}</span>
        </div>
      </div>
      <div class="adddress">
        <p class="text-h6">Address</p>
        <p class="text-subtitle-1">
          {{ data.Address_Details.address_lane1 }}, {{ data.Address_Details.address_lane2 }},
        </p>
        <p class="text-subtitle-1">
          {{ data.Address_Details.landmark }} - {{ data.Address_Details.pincode }},
        </p>
        <p class="text-subtitle-1">
          {{ data.Address_Details.state }}
        </p>
      </div>
    </div>
    <div class="d-flex justify-center ga-5">
      <v-btn class="delete">Delete</v-btn>
      <v-btn v-if="data.status === 'pending'" class="approve">Approve</v-btn>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue' 
defineProps({
  data: Object
})

const show = ref(false);
</script>

<style scoped>


.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 300px;
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
  border-right:2px solid #aaaaaa; 
}

.user-info p {
  margin: 0;
  margin-bottom: 10px;
}

.approve {
  background-color: #00FF00dd;
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
  top: 57%;
  left: 19%;
  box-shadow: 0 0 0 2px #fff;
  background-color: #00FF00dd;
  border-radius: 50%;
}

.pending-icon {
  position: absolute;
  top: 57%;
  left: 19%;
  box-shadow: 0 0 0 2px #fff;
  background-color: #ff204e;
  border-radius: 50%;
}
</style>
