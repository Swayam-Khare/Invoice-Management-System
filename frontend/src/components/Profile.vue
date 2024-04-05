<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <v-card>
          <v-card-title>User Profile</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-avatar size="150">
                  <v-img src="../assets/imgs/User/1.png"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="12" md="8">
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Request No.</v-list-item-title>
                      <v-list-item-subtitle>324672352</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Connection Name</v-list-item-title>
                      <v-list-item-subtitle>Suradeep Sengupta</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Purpose</v-list-item-title>
                      <v-list-item-subtitle>Home</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Connection Year</v-list-item-title>
                      <v-list-item-subtitle>19/02/1968</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Address</v-list-item-title>
                      <v-list-item-subtitle
                        >Abinash Chaowdhury Lane, 98 Barkat Bypass, Kolkata district, West
                        Bengal.</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <v-card>
          <v-card-title class="pl-9" style="background-color: #112d4ef1"
            ><p style="color: #f5f5f5">Address Details</p>
          </v-card-title>
          <v-card-text class="pl-5">
            <v-card variant="flat">
              <v-card-title class="pt-6">Address</v-card-title>
              <v-card-text>
                <v-row class="pa-3">
                  <!-- <p> -->
                  123 Main Street<br />
                  Apartment 456<br />
                  City, State 12345<br />
                  Country
                  <!-- </p> -->
                </v-row>
              </v-card-text>
            </v-card>
            <v-card variant="flat">
              <v-card-title>Contact</v-card-title>
              <v-card-text>
                <v-row class="pa-3">
                  <!-- <v-icon left>mdi-phone</v-icon> -->
                  Ph.&nbsp;+1 123-456-7890
                </v-row>
              </v-card-text>
            </v-card>
          </v-card-text>
          <v-card-actions>
            <v-btn class="pl-6 pb-1" color="primary" style="font-weight: bold">Edit Address</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <img
          src="../assets/imgs/profile-details/photo-2.svg"
          alt="Right Image"
          style="max-width: 50%; max-height: 93%"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const values = ref([180, 94, 390, 35, 210, 54, 456, 240, 311, 181, 300, 130])

const markers = ref([
  {
    position: {
      lat: 22.5726,
      lng: 88.3639
    }
  }
])
</script>
