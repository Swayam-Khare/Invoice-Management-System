<template>
  <div class="d-flex flex-md-row flex-column justify-space-between align-end">
    <div class="mobile-search pt-4 px-2 px-sm-10 px-md-14 px-lg-16 ml-lg-3 ml-xxl-16">
      <input
        type="text"
        placeholder="Search invoice no."
        class="elevation-6 pa-3 mx-auto search bg-grey-lighten-2"
      />
    </div>

    <!-- <div class="d-flex justify-end mx-md-16 px-2 my-1">
      <v-btn
        class="text-capitalize hover-btn mx-0 mx-sm-8 mx-md-0 elevation-6"
        @click=""
        >Add Invoice</v-btn
      >
      <CreateProduct
        v-model="showProductDialog"
        @close="showProductDialog = false"
      />
    </div> -->
  </div>
  <div class="list px-2 px-sm-0 overflow-auto">
    <table class="mx-auto my-5 my-sm-5 elevation-5">
      <tr>
        <th>
          Invoice no.
          <!-- <v-icon icon="swap_vert" class="cursor-pointer"></v-icon> -->
          <!-- <v-icon icon="arrow_downward" size="small"></v-icon> -->
        </th>
        <th>
          Customer Name
          <v-icon icon="swap_vert" class="cursor-pointer"></v-icon>
          <!-- <v-icon icon="arrow_downward" size="small"></v-icon> -->
        </th>
        <th>
          Purchase Date
          <!-- <v-icon icon="swap_vert" class="cursor-pointer"></v-icon> -->
        </th>
        <th>Due Date</th>

        <th>
          Status
          <v-menu>
            <template v-slot:activator="{ props }">
              <button v-bind="props">
                <v-icon icon="filter_list" size="small" class="pl-1 cursor-pointer"></v-icon>
              </button>
            </template>
            <v-list class="mt-4">
              <v-list-item height="40" v-for="(item, index) in status" :key="index" :value="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </th>
        <th>Actions</th>
      </tr>
      <tr v-for="(item, index) in vendors" :key="index" :value="index">
        <td>{{ item.invoice }}</td>
        <td>{{ item.customerName }}</td>
        <td>{{ item.purchaseDate }}</td>
        <td>{{ item.dueDate }}</td>
        <td class="">
          <span
            :class="{
              paid: item.status === 'paid',
              overdue: item.status === 'overdue',
              due: item.status === 'due',
            }"
            >{{ item.status  }}</span
          >
        </td>
        <td class="d-flex align-center">
          <!-- <img
            src="../assets/edit_square.svg"
            class="hover-scale"
            style="width: 25px; height: 25px"
          /> -->

          <!-- <v-icon icon="edit_note" color="#000" class="hover-scale" size="25"></v-icon> -->
          <img width="25" height="25" class="hover-scale mr-2" src="https://img.icons8.com/color/48/edit-file.png" alt="edit-file"/>
          <!-- <v-icon icon="mail" color="#2196f3" class="hover-scale" size="25"></v-icon> -->
          <img width="25" height="25" class="hover-scale mr-2" src="https://img.icons8.com/color/48/gmail--v1.png" alt="gmail--v1"/>
          
          <v-icon icon="download" color="#1565c0" class="hover-scale" size="25"></v-icon>
           <img
            src="../assets/delete.svg"
            class="hover-scale"
            style="width: 25px; height: 25px"
          />
          <!-- <v-icon icon="delete" color="#e13d33" class="hover-scale" size="25"></v-icon> -->
          
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
// import randomColor from 'randomcolor'

const page = ref(1)
// onMounted(() => {
//     const color = randomColor()
//     document.getElementById('random-color').style.backgroundColor = color
// })

// const items = ref([{ title: 'Update Profile' }, { title: 'Logout' }])

const status = ref([{ title: 'Paid' }, { title: 'Overdue' }, { title: 'Due' }])
const vendors = ref([
  {
    invoice: 'INV-001',
    customerName: 'John Doe',
    purchaseDate: '2021-09-01',
    dueDate: '2021-09-30',
    status: 'paid',
  },
  {
    invoice: 'INV-002',
    customerName: 'Jane Doe',
    purchaseDate: '2021-09-01',
    dueDate: '2021-09-30',
    status: 'overdue',
  },
  {
    invoice: 'INV-003',
    customerName: 'John Doe',
    purchaseDate: '2021-09-01',
    dueDate: '2021-09-30',
    status: 'due',
  },
  {
    invoice: 'INV-004',
    customerName: 'Jane Doe',
    purchaseDate: '2021-09-01',
    dueDate: '2021-09-30',
    status: 'paid',
  },
  {
    invoice: 'INV-005',
    customerName: 'John Doe',
    purchaseDate: '2021-09-01',
    dueDate: '2021-09-30',
    status: 'overdue',
  },
  {
    invoice: 'INV-006',
    customerName: 'Jane Doe',
    purchaseDate: '2021-09-01',
    dueDate: '2021-09-30',
    status: 'due',
  },
  {
    invoice: 'INV-007',
    customerName: 'John Doe',
    purchaseDate: '2021-09-01',
    dueDate: '2021-09-30',
    status: 'paid',
  },
  {
    invoice: 'INV-008',
    customerName: 'Jane Doe',
    purchaseDate: '2021-09-01',
    dueDate: '2021-09-30',
    status: 'overdue',
  },
  {
    invoice: 'INV-009',
    customerName: 'John Doe',
    purchaseDate: '2021-09-01',
    dueDate: '2021-09-30',
    status: 'due',
  },
  {
    invoice: 'INV-010',
    customerName: 'Jane Doe',
    purchaseDate: '2021-09-01',
    dueDate: '2021-09-30',
    status: 'paid',
  }
])

const showProductDialog = ref(false)
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

.logo-btn {
  border-radius: 100%;
  padding: 5px 18px;
  background-color: #ec407a;
}

.logo-char {
  color: white;
  font-size: 30px;
}

table {
  border-collapse: collapse;
  width: 90%;
  overflow: hidden;
}

th {
  padding: 10px 20px;
  text-align: left;
  /* border-bottom: 2px solid rgba(0, 0, 0, 0.521); */
  background-color: #112d4ecc;
  color: white;
}

td {
  padding: 10px 20px;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.521); */
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

.paid {
  background-color: rgba(0, 128, 0, 0.066);
  color: green;
  border-radius: 20px;
  padding: 5px 10px;
}

.overdue {
  background-color: rgba(255, 0, 0, 0.066);
  color: red;
  border-radius: 20px;
  padding: 5px 10px;
}

.due {
  background-color: rgba(178, 206, 17, 0.119);
  color: rgb(178, 206, 17);
  border-radius: 20px;
  padding: 5px 10px;
}

.hover-scale {
  transition: 0.2s;
}

.hover-scale:hover {
  scale: 1.3;
  cursor: pointer;
}

.hover-btn:hover {
  background-color: #112d4e;
  color: white;
  transition: 0.5s;
}
</style>
