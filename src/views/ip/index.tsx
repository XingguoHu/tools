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

  public static asyncData({ store, route }) {
    console.log("22222");
    return store.dispatch("ip/inc", 1);
  }

  private async fetchIpInfo(info: any) {
    console.log("click");
    this.$store.dispatch("ip/inc", 1);
  }

  private render(h: CreateElement): VNode {
    return (
      <m-nav-list-provider
        children={dataSource => (
          <m-page-layout nav={true} menuList={dataSource}>
            <div>
              <input type="text" />
              <button type="button" onClick={this.fetchIpInfo}>
                提交
              </button>
              <div>{JSON.stringify(this.ipInfo)}</div>
            </div>
          </m-page-layout>
        )}
      />
    );
  }
}
