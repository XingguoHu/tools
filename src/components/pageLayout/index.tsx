import { VNode, CreateElement } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import style from "./index.scss";

/**
 *
 * @export
 * @class PageLayout
 * @extends {Vue}
 */
@Component
export default class PageLayout extends Vue {
  // props
  @Prop(Boolean) private nav!: boolean;
  @Prop(Array) private menuList!: any[];

  private render(h: CreateElement): VNode {
    const {
      nav,
      menuList,
      $slots: { default: slot }
    } = this;

    return (
      <div class={style.pageLayout}>
        {nav && <m-nav menuList={menuList} />}
        {slot}
      </div>
    );
  }
}
