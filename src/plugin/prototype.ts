import request from "../utils/request";

export default {
  install(Vue: any) {
    Vue.prototype.$request = request;
  }
};
