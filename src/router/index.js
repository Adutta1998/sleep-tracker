import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import ReportPage from "../pages/ReportPage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/report", name: "Report", component: ReportPage },
];

const router = createRouter({
  history: createWebHistory("/sleep-tracker/"),
  routes,
});

export default router;
