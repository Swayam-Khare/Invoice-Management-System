<template class="bg-blue">
  <div class="d-none d-md-flex align-center justify-space-between px-16 text-h6">
    <span class="mb-2"
      ><v-img
        class="elevation-7 rounded-circle"
        :width="64"
        :height="66"
        cover
        src="/src/assets/logo.svg"
      ></v-img
    ></span>
    <div
      style="width: 511px; height: 44px"
      class="bg-white rounded-lg elevation-7 d-flex align-center justify-space-between"
    >
      <span class="h-100 d-flex align-center"
        ><v-btn variant="text"> Home </v-btn> <v-btn variant="text"> Contact </v-btn>
        <v-btn variant="text"> About </v-btn></span
      > 
      <span class="h-100 d-flex align-center"
        ><v-btn variant="text"> Login </v-btn>
        <v-btn color="#112D4E" class="h-100 rounded-lg"> Signup </v-btn></span
      >
    </div>
  </div>

  <v-toolbar color="#ffffff00" elevation="7" class="d-md-none">
    <img class="ml-8 mr-2" width="55px" height="55px" src="/src/assets/logo.svg"></img>
    <v-toolbar-title>IMS</v-toolbar-title>
    <v-spacer></v-spacer>
      <v-btn icon><img width="30px" height="30px" src="/src/assets/menu.svg"></img></v-btn>
  </v-toolbar>
</template>

<script>
export default {}
</script>

<style scoped>
.bg-btn {
  background-color: #112D4E;
  color: #fff;
}
</style>