<template>
  <div class="mobile-search pt-4 px-2 px-sm-10 px-md-14 px-lg-16 ml-lg-3 ml-xxl-16">
    <input
      type="text"
      placeholder="Search..."
      class="elevation-6 pa-3 mx-auto search bg-grey-lighten-2"
    />
  </div>
  <div class="list px-2 px-sm-0 overflow-auto">
    <table class="mx-auto my-5 my-sm-8 elevation-5">
      <tr>
        <th>
          Name
          <v-icon icon="swap_vert" class="cursor-pointer"></v-icon>
        </th>
        <th>Email</th>
        <th>Contact</th>
        <th>Actions</th>
      </tr>
      <tr v-for="(item, index) in customers" :key="index" :value="index">
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.contact }}</td>
        <td class="d-flex align-center ga-5">
          <img
            src="../assets/edit_square.svg"
            class="hover-scale"
            style="width: 25px; height: 25px"
          />
          <v-icon icon="delete" color="#FF204E" class="hover-scale" size="25"></v-icon>
        </td>
      </tr>
    </table>
  </div>
  <v-pagination
    v-model="page"
    :length="10"
    next-icon="arrow_forward_ios"
    prev-icon="arrow_back_ios"
    class="pagination mx-auto mt-0"
    :total-visible="4"
    size="x-small"
  ></v-pagination>
</template>

<script setup>
import { ref } from 'vue'

const page = ref(1)

const customers = ref([
  {
    name: 'Chandan Kumar',
    email: 'chandan@gmail.com',
    contact: '9104324532'
  },
  {
    name: 'Anant Patel',
    email: 'anant@gmail.com',
    contact: '9104324532'
  },
  {
    name: 'Sumit Sharma',
    email: 'sumit@gmail.com',
    contact: '9104324532'
  },
  {
    name: 'Anant Patel',
    email: 'anant@gmail.com',
    contact: '9104324532'
  },
  {
    name: 'Sumit Sharma',
    email: 'sumit@gmail.com',
    contact: '9104324532'
  },
  {
    name: 'Chandan Kumar',
    email: 'chandan@gmail.com',
    contact: '9104324532'
  },
  {
    name: 'Anant Patel',
    email: 'anant@gmail.com',
    contact: '9104324532'
  },
  {
    name: 'Sumit Sharma',
    email: 'sumit@gmail.com',
    contact: '9104324532'
  },
  {
    name: 'Anant Patel',
    email: 'anant@gmail.com',
    contact: '9104324532'
  },
  {
    name: 'Sumit Sharma',
    email: 'sumit@gmail.com',
    contact: '9104324532'
  }
])
</script>

<style scoped>
@media only screen and (max-width: 690) {
  .pagination {
    width: 70% !important;
  }
}

.search {
  outline: none;
  border-radius: 5px;
}

.search:focus {
  box-shadow:
    0 0 0 1px black,
    5px 5px 10px rgba(0, 0, 0, 0.456) !important;
}

table {
  border-collapse: collapse;
  width: 90%;
  overflow: hidden;
}

th {
  padding: 10px 20px;
  text-align: left;
  background-color: #112d4ecc;
  color: white;
}

td {
  padding: 10px 20px;
}

tr {
  transition: 0.2s;
}

tr:nth-child(odd) {
  background-color: #112d4e13;
}

tr:first-child:hover {
  scale: 1;
}

tr:hover {
  scale: 1.01;
}

.hover-scale {
  transition: 0.2s;
}

.hover-scale:hover {
  scale: 1.3;
  cursor: pointer;
}
</style>
