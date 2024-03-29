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

  <v-app>
  <v-toolbar color="#ffffff00" elevation="7" class="d-md-none">
    <img class="ml-8 mr-2" width="55px" height="55px" src="/src/assets/logo.svg"/>
    <v-toolbar-title>IMS</v-toolbar-title>
    <v-spacer></v-spacer>
      <v-btn @click.stop="drawer = !drawer" icon><img width="30px" height="30px" src="/src/assets/menu.svg"/></v-btn>
  </v-toolbar>

  <v-navigation-drawer
        location="end"
        color="#112D4E"
        temporary
        v-model="drawer"
        :width="255"
      >
        <v-list-item
          title="Invoice Management System"
          subtitle="IMS"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-item link title="Home"></v-list-item>
        <v-list-item link title="Contact"></v-list-item>
        <v-list-item link title="About"></v-list-item>
        <v-divider></v-divider>
        <v-list-item link title="Login"></v-list-item>
        <v-list-item link title="Signup"></v-list-item>
      </v-navigation-drawer>
    </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    }
  },
}
</script>
