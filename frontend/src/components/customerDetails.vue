<template>
    <v-dialog max-width="500" centered>
      <v-card class="rounded-lg">

        <v-card-text>
          <div class="temp">
            <div class="d-flex justify-space-between">
              <img
                src="../assets/imgs/User/1.png"
                alt="profile photo"
                width="170px"
                height="170px"
              />
              <div>
                <div class="position-relative">
                  <span class="text-h5 text-white"
                    >Personal Details <i class="line personal"></i>
                  </span>
                </div>
                <div>
                  <div>
                    <p class="text-h6 text-black">Name</p>
                    <p class="text-grey-darken-2">{{details.firstName}}</p>
                  </div>
                  <div>
                    <p class="text-h6 text-black">Email</p>
                    <p class="text-grey-darken-2">{{details.email}}</p>
                  </div>
                  <div>
                    <p class="text-h6 text-black">Contact</p>
                    <p class="text-grey-darken-2">{{details.Address_Details.contact}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-7">
              <div class="position-relative mb-2">
                <span class="text-h5 text-white">Address Details <i class="line address"></i></span>
              </div>
              <div>
                <div>
                  <p class="text-grey-darken-2">{{ details.Address_Details.address_lane1 }}, {{ details.Address_Details.address_lane2 }}</p>
                </div>
                <div>
                  <p class="text-grey-darken-2">{{ details.Address_Details.landmark }}</p>
                </div>
                <div>
                  <p class="text-grey-darken-2">{{ details.Address_Details.pincode }} - {{ details.Address_Details.state }}</p>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="d-flex ga-10 mt-10 justify-center">
            <v-btn class="edit" prepend-icon="save_as" @click="$emit('edit'),$emit('close')">Edit</v-btn>
          <v-btn class="delete" prepend-icon="delete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script setup>
defineProps(['details'])
</script>

<style scoped>
.line {
  position: absolute;
  border-top: 35px solid #112d4e;
  bottom: 0;
  left: 0;
  z-index: -1;
}

.personal {
  width: 150%;
  transform: skewX(-10deg) translateX(-20px);
}

.address {
  width: 55%;
  transform: skewX(10deg) translateX(-50px);
}

.edit {
  background-color: #112d4e;
  color: white;
  transition: 0.5s;
  width: 23%;
}

.edit:hover {
  color: #112d4e;
  background-color:#112d4e22;
  transition: 0.5s;
}

.delete {
  background-color: #ff204e;
  color: white;
  transition: 0.5s;
  width: 23%;
}

.delete:hover {
  color: #ff204e;
  background-color: #ff204e22;
  transition: 0.5s;
}
</style>
