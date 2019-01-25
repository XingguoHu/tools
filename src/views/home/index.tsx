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
    // {
    //   routeName: "home",
    //   label: "单位转换"
    // },
    {
      routeName: "toolsIp",
      label: "IP地址查询"
    }
    // {
    //   routeName: "about",
    //   label: "中文电码查询"
    // }
  ];

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
    const { data, handleClick } = this;
    const list = data.map((item, index) => {
      const { label } = item;
      return <div data-id={index}>{label}</div>;
    });

    return (
      <m-nav-list-provider
        children={dataSource => (
          <m-page-layout nav={true} menuList={dataSource}>
            <div onClick={handleClick}>{list}</div>
          </m-page-layout>
        )}
      />
    );
  }
}
