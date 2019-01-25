import { VNode, CreateElement } from "vue";
import { Component, Vue, Prop } from "vue-property-decorator";

/**
 *
 * @export
 * @class NavListProvider
 * @extends {Vue}
 */
@Component
export default class NavListProvider extends Vue {
  // props
  @Prop(Function) private children!: (data) => VNode;

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
    const { children, menuList } = this;
    return <div>{children(menuList)}</div>;
  }
}
