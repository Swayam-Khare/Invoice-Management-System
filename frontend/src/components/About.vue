<template>
  <v-container>
    <!-- Header Section -->
    <v-row>
      <v-col cols="4">
        <img src="../assets/imgs/svg/team.svg" alt="Illustration" class="img" />
      </v-col>

      <v-col>
        <v-col>
          <h1 class="text-h4 font-weight-bold mb-4">{{ headerText }}</h1>
        </v-col>

        <v-col>
          <p class="text-body-1">
            {{ headerDescription }} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            molestias incidunt assumenda magni placeat quibusdam cum. Aspernatur, tempora nemo
            facere voluptas totam ea consectetur sit laboriosam? Quas labore facilis earum?
          </p>
          <p class="text-body-1">{{ headerDescription }}</p>
        </v-col>

        <v-col>
          <p class="text-body-1">{{ headerDescription }}</p>
        </v-col>
        <v-col>
          <p class="text-body-1">{{ headerDescription }}</p>
        </v-col>
        <v-col>
          <p class="text-body-1">{{ headerDescription }}</p>
        </v-col>
      </v-col>
    </v-row>

    <v-spacer></v-spacer>

    <!-- Team Section -->
    <div class="my-12 mx-16">
      <v-row>
        <v-col v-for="member in teamMembers" :key="member.id" cols="12" sm="6" md="4">
          <v-card color="justify-center align-center d-flex " flat>
            <v-avatar size="100" class="mx-2 my-2">
              <v-img :src="member.photo" alt="Profile Photo"></v-img>
            </v-avatar>
            <v-card-text class="text-start">
              <h3 class="text-h6 font-weight-bold" style="color: #112d4e">{{ member.name }}</h3>
              <p class="text-body-1">{{ member.role }}</p>
            </v-card-text>
          </v-card>
          <v-card-social>
            <v-card-text class="text-start">
              <h3 class="text-h6 font-weight-bold" style="color: #112d4e">{{ member.name }}</h3>
            </v-card-text>
          </v-card-social>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const headerText = ref('Streamlining Invoice Management')
const headerDescription = ref(
  'Our intuitive app simplifies your invoicing process, saving you time and effort.'
)

const teamMembers = ref([
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO',
    photo: 'https://via.placeholder.com/100x100?text=JS'
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Lead Developer',
    photo: 'https://via.placeholder.com/100x100?text=JS'
  },
  {
    id: 3,
    name: 'Michael Johnson',
    role: 'Product Manager',
    photo: 'https://via.placeholder.com/100x100?text=MJ'
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'Marketing Specialist',
    photo: 'https://via.placeholder.com/100x100?text=ED'
  },
  {
    id: 5,
    name: 'David Wilson',
    role: 'Customer Support',
    photo: 'https://via.placeholder.com/100x100?text=DW'
  },
  {
    id: 6,
    name: 'John Doe',
    role: 'CEO',
    photo: 'https://via.placeholder.com/100x100?text=JD'
  },
  {
    id: 7,
    name: 'John Doe',
    role: 'CEO',
    photo: 'https://via.placeholder.com/100x100?text=JD'
  },
  {
    id: 8,
    name: 'John Doe',
    role: 'CEO',
    photo: 'https://via.placeholder.com/100x100?text=JD'
  },
  {
    id: 9,
    name: 'John Doe',
    role: 'CEO',
    photo: 'https://via.placeholder.com/100x100?text=JD'
  }
])
</script>

<style>
.img {
  height: 90%;
  width: 90%;
}
</style>
