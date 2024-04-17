<template>
  <div class="mobile-search pt-4 px-2 px-sm-10 px-md-14 px-lg-16 ml-lg-3 ml-xxl-16">
    <input
      type="text"
      placeholder="Search..."
      class="elevation-6 pa-3 mx-auto search bg-grey-lighten-2"
    />
  </div>
 
  <template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    :search="search"
    item-value="name"
    @update:options="loadItems"
  ></v-data-table-server>
</template>
</template>

<script setup>
import { ref } from 'vue'

const headers = ref([
  { key: 'data-table-expand' },
  { title: 'Name', value: 'firstName', sortable: true },
  { title: 'E-mail', value: 'email' },
  { title: 'Contact no', value: 'Address_Details.contact' },
  { title: 'Status', value: 'status' }
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
