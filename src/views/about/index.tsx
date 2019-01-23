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
  // props
  @Prop({
    type: Array,
    default: () => []
  })
  private menuList!: any[];

  private render(h: CreateElement): VNode {
    const { menuList } = this;

    const renderContent = () => {
      return <div>about me</div>;
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
