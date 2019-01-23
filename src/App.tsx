import { VNode, CreateElement } from "vue";
import { Component, Vue } from "vue-property-decorator";

/**
 *
 * @export
 * @class App
 * @extends {Vue}
 */
@Component
export default class App extends Vue {
  // state
  private menuList: any[] = [
    // {
    //   label: "单位转换",
    //   value: "/"
    // },
    {
      label: "IP地址查询",
      value: "toolsIp"
    },
    // {
    //   label: "中文电码查询",
    //   value: "/"
    // },
    {
      label: "关于我",
      value: "about"
    }
  ];

  private render(h: CreateElement): VNode {
    const {
      menuList,
      $route: { path }
    } = this;
    return (
      <div id="app">
        <router-view key={path} menuList={menuList} />
      </div>
    );
  }
}
