import { VNode, CreateElement } from "vue";
import { Component, Vue, Prop } from "vue-property-decorator";
import { getIpInfo } from "../../api";
/**
 *
 * @export default
 * @class Ip
 * @extends {Vue}
 */
@Component
export default class Ip extends Vue {
  private ipInfo: any = {};

  // props
  @Prop({
    type: Array,
    default: () => []
  })
  private menuList!: any[];

  private async fetchIpInfo() {
    try {
      this.ipInfo = await getIpInfo({});
    } catch (error) {
      this.ipInfo = {};
      console.log(error);
    }
    console.log(this.ipInfo);
  }

  private renderContent(): VNode {
    console.log(111, this);
    return (
      <div>
        <input type="text" />
        <button type="button" onClick={this.fetchIpInfo}>
          提交
        </button>
        <div>{JSON.stringify(this.ipInfo)}</div>
      </div>
    );
  }

  private render(h: CreateElement): VNode {
    const { menuList, renderContent } = this;

    return (
      <m-page-layout
        nav={true}
        menuList={menuList}
        renderProps={renderContent}
      />
    );
  }
}
