import { VNode, CreateElement } from "vue";
import { Component, Vue, Prop } from "vue-property-decorator";
/**
 *
 * @export default
 * @class Home
 * @extends {Vue}
 */
@Component
export default class Home extends Vue {
  // state
  private data: any = [
    {
      routeName: "home",
      label: "单位转换"
    },
    {
      routeName: "toolsIp",
      label: "IP地址"
    },
    {
      routeName: "about",
      label: "中文电码查询"
    }
  ];

  // props
  @Prop({
    type: Array,
    default: () => []
  })
  private menuList!: any[];

  private handleClick(e) {
    const {
      target: {
        dataset: { id }
      }
    } = e;
    this.$router.push({
      name: this.data[id].routeName
    });
  }

  private render(h: CreateElement): VNode {
    const { menuList, data, handleClick } = this;
    const renderContent = () => {
      const list = data.map((item, index) => {
        const { label } = item;
        return <div data-id={index}>{label}</div>;
      });

      return <div onClick={handleClick}>{list}</div>;
    };

    return (
      <m-page-layout
        nav={true}
        menuList={menuList}
        renderProps={renderContent}
      />
    );
  }
}
