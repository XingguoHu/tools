import { VNode, CreateElement } from "vue";
import { Component, Vue, Prop } from "vue-property-decorator";

const componentParams: object = {};
/**
 *
 * @export
 * @class About
 * @extends {Vue}
 */
@Component(componentParams)
export default class About extends Vue {
  private render(h: CreateElement): VNode {
    return (
      <m-nav-list-provider
        children={dataSource => (
          <m-page-layout nav={true} menuList={dataSource}>
            <div>about me</div>
          </m-page-layout>
        )}
      />
    );
  }
}
