// store.js
import Vue from "vue";
import Vuex from "vuex";
import ip from "./modules/ip";

Vue.use(Vuex);

export default function createStore() {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {},
    mutations: {},
    modules: {
      ip
    }
  });
}
