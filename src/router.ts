import Vue from "vue";
import Router from "vue-router";

const Home = () => import("./views/home");
const About = () => import("./views/about");
const Ip = () => import("./views/ip");

Vue.use(Router);

export default () => {
  return new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
      {
        path: "/",
        name: "home",
        component: Home
      },
      {
        path: "/about",
        name: "about",
        component: About
      },
      {
        path: "/tools/ip",
        name: "toolsIp",
        component: Ip
      }
    ]
  });
};
