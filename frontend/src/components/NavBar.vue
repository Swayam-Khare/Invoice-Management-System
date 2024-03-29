<template class="bg-blue">
  <div class="d-none d-md-flex align-center justify-space-between px-16 text-h6">
    <span class="mb-2"><v-img class="elevation-7 rounded-circle mt-3" :width="64" :height="66" cover
        src="/src/assets/logo.svg"></v-img></span>
    <div style="width: 511px; height: 44px"
      class="bg-white rounded-lg elevation-7 d-flex align-center justify-space-between">
      <span class="h-100 d-flex align-center">
        <v-btn variant="text" class="text-capitalize"> Home </v-btn>
        <v-btn variant="text" class="text-capitalize"> Contact </v-btn>
        <v-btn variant="text" class="text-capitalize"> About </v-btn></span>
      <span class="h-100 d-flex align-center"><v-btn variant="text" class="text-capitalize"> Login </v-btn>
        <v-btn color="#112D4E" class="h-100 rounded-lg text-capitalize"> Signup </v-btn></span>
    </div>
  </div>

  <v-toolbar color="#ffffff00" elevation="7" class="d-md-none">
    <img class="ml-8 mr-2" width="55px" height="55px" src="/src/assets/logo.svg" />
    <v-toolbar-title>IMS</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon><img width="30px" height="30px" src="/src/assets/menu.svg" /></v-btn>
  </v-toolbar>
</template>

<script>
export default {}
</script>