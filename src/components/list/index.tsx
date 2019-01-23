import { VNode, CreateElement } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import style from "./index.scss";

const componetOptions: object = {
  functional: true
};

/**
 *
 * @export default
 * @class NewsList
 * @extends {Vue}
 */
@Component(componetOptions)
export default class NewsList extends Vue {
  // props
  @Prop({
    required: true,
    type: Array
  })
  public data!: any[];

  private render(h: CreateElement, ctx: any): VNode {
    const {
      props: { data }
    } = ctx;
    const list: any[] = [];
    for (const item of data) {
      list.push(<m-code data={item} />);
    }
    return <div class={style.newsList}>{list}</div>;
  }
}
