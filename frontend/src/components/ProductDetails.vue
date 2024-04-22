<template>
  <v-dialog max-width="500" centered>
    <v-card class="rounded-lg">

      <v-card-text>
        <div class="">
          <h1 style="color: #112d4e;">Description</h1>
          <div class="text-h6">{{ details.description }}</div>
        </div>
      </v-card-text>
      <v-card-actions class="action-btn d-flex ga-10 mt-10 justify-center">
          <v-btn class="edit" prepend-icon="save_as" @click="$emit('edit'),$emit('close')">Edit</v-btn>
        <v-btn class="delete" prepend-icon="delete" @click="deleteProduct">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>

import { useProductStore } from '@/stores/productStore';

const productStore = useProductStore();

const props = defineProps(['details'])
const emits = defineEmits(['close','edit','delete'])

const deleteProduct = async() => {
await productStore.deleteProduct(props.details.id);
emits('close');
emits('delete');
}
</script>

<style scoped>
@media only screen and (max-width:520px){
.customer-details-wrapper{
  flex-direction: column !important;
  gap: 20px;
}

.customer-details-wrapper img{
  align-self: center;
}

.personal{
    transform: translateX(-30px) !important;
}

.address{
  width: 150% !important;
}

.action-btn{
  flex-direction: column !important;
  gap: 10px !important;
  align-items: center !important;
}

.edit{
  width: 50% !important;
}

.delete{
  width: 50% !important;
}
}

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
