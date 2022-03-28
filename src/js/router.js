import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/line/:id",
    name: "Line",
    component: () => import("../views/Line.vue")
  },
  {
    path: "/setting",
    name: "Setting",
    component: () => import("../views/Setting.vue")
  },
  {
    path: "/stationList",
    name: "StationList",
    component: () => import("../views/StationList.vue")
  },
  {
    path: "/collection",
    name: "Collection",
    component: () => import("../views/Collection.vue")
  },
  {
    path: "/lineSearch",
    name: "LineSearch",
    component: () => import("../views/LineSearch.vue")
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
