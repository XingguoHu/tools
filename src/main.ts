import Vue from "vue";
import App from "./App";
import router from "./router";

import "./components";
import "./plugin";
import "./index.scss";

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", function() {
//     navigator.serviceWorker
//       .register("/service-worker.js", { scope: "/" })
//       .then(function(registration) {
//         // 注册成功
//         console.log(
//           "ServiceWorker registration successful with scope: ",
//           registration.scope
//         );
//       })
//       .catch(function(err) {
//         // 注册失败
//         console.log("ServiceWorker registration failed: ", err);
//       });
//   });
// }

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
