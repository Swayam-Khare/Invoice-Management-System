<template>
  <div class="d-flex align-center justify-space-between px-16 text-h6">
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
        <v-btn class="h-100 bg-blue-darken-4 rounded-lg"> Signup </v-btn></span
      >
    </div>
  </div>
</template>

<script>
export default {}
</script>
