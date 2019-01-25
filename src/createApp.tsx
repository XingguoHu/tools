import { VNode, CreateElement } from "vue";
import { Component, Vue } from "vue-property-decorator";

import createRouter from "./router";
import createStore from "./store";

import "./components";
import "./plugin";
import "./index.scss";

Vue.config.productionTip = false;

/**
 *
 * @export
 * @class App
 * @extends {Vue}
 */
@Component
class App extends Vue {
  private render(h: CreateElement): VNode {
    return (
      <div id="app">
        <router-view />
      </div>
    );
  }
}

export default () => {
  const router = createRouter();
  const store = createStore();

  return {
    app: new App({
      store,
      router
    }),
    router,
    store
  };
};
