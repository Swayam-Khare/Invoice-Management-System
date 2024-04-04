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
      <v-col cols="12" md="12">
        <v-card>
          <v-card-title>Billing History</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-chip color="primary">
                  Last Billing
                  <v-chip-closable>10/02/2021</v-chip-closable>
                </v-chip>
              </v-col>
              <v-col cols="12" md="4">
                <v-chip color="success">
                  Last Recharge
                  <v-chip-closable>₹ 2,625</v-chip-closable>
                </v-chip>
              </v-col>
              <v-col cols="12" md="4">
                <v-chip color="error">
                  Last Due
                  <v-chip-closable>₹ 3545</v-chip-closable>
                </v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-card-text>
                  <GmapMap
                    :center="{ lat: 22.5726, lng: 88.3639 }"
                    :zoom="12"
                    map-type-id="terrain"
                    style="width: 100%; height: 300px"
                  >
                    <GmapMarker
                      :key="index"
                      v-for="(m, index) in markers"
                      :position="m.position"
                      :clickable="true"
                      :draggable="true"
                      @click="center = m.position"
                    />
                  </GmapMap>
                </v-card-text>
              </v-col>
              <v-col cols="12" md="6">
                <v-card-text>
                  <v-sparkline
                    :value="values"
                    :gradient="['#4CAF50', '#2E7D32']"
                    :smooth="10"
                    :padding="8"
                    :line-width="2"
                    :radius="5"
                    :height="150"
                    auto-draw
                  ></v-sparkline>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary">Review</v-btn>
          </v-card-actions>
        </v-card>
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
