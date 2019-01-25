import Vue from "vue";
import nav from "./nav";
import pageLayout from "./pageLayout";
import code from "./code";
import list from "./list";
import scroll from "./scroll";
import navListProvider from "./navListProvider";

Vue.component("m-nav", nav);
Vue.component("m-page-layout", pageLayout);
Vue.component("m-list", list);
Vue.component("m-code", code);
Vue.component("m-scroll", scroll);
Vue.component("m-nav-list-provider", navListProvider);
