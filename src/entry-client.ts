import createApp from "./createApp";
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

const { NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const { router, app, store } = createApp();
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

// 在onReady的callback之后注册BeforeResolve， 刷新页面不会执行asyncData。

if (dev) {
  registerBeforeResolve();
}

// 路由必须要提前解析路由配置中的异步组件，才能正确地调用组件中可能存在的路由钩子。
router.onReady(() => {
  if (!dev) {
    registerBeforeResolve();
  }
  app.$mount("#app");
});

function registerBeforeResolve() {
  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    // 我们只关心非预渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false;
    const activated: any[] = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c);
    });

    if (!activated.length) {
      return next();
    }

    console.log("加载----");

    Promise.all(
      activated.map(c => {
        if (c.asyncData) {
          return c.asyncData({ store, route: to });
        }
      })
    )
      .then(() => {
        console.log("加载完成---");
        next();
      })
      .catch(next);
  });
}
