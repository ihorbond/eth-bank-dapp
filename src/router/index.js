import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import Withdraw from "../pages/Withdraw.vue";
import Deposit from "../pages/Deposit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/withdraw",
    name: "Withdraw",
    component: Withdraw,
  },
  {
    path: "/deposit",
    name: "Deposit",
    component: Deposit,
  },
  {
    path: '/',
    redirect: '/home'
  }
];

const router = new VueRouter({
  routes,
});

export default router;
