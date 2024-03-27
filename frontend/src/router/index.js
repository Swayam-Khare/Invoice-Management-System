// /**
//  * router/index.ts
//  *
//  * Automatic routes for `./src/pages/*.vue`
//  */

// // Composables
// import { createRouter, createWebHistory } from "vue-router/auto";
// import { setupLayouts } from "virtual:generated-layouts";

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   extendRoutes: setupLayouts,
// });

// export default router;

import { createWebHistory, createRouter } from "vue-router";

import HomePage from "@/views/Home.vue";
import About from "@/views/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
