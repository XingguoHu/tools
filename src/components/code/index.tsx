import { Component, Prop, Vue } from "vue-property-decorator";
import { CreateElement, VNode } from "vue";
import style from "./index.scss";

const componetOptions: object = {
  functional: true
};
/**
 *
 * @export default
 * @class NewsItem
 * @extends {Vue}
 */
@Component(componetOptions)
export default class NewsItem extends Vue {
  // props
  @Prop({
    required: true,
    type: Object
  })
  private data!: object;

  private render(h: CreateElement, ctx: any): VNode {
    const {
      props: {
        data: {
          abstract,
          media_name,
          comment_count,
          publish_time,
          title,
          image_list = []
        }
      }
    } = ctx;
    const defaultUrl =
      "//s1.dgtle.com/forum/201810/22/224445zm5v9r4d5v34v7cs.jpg?imageView2/2/w/960/q/100";
    return (
      <div class={style.newsItem}>
        <div class={style.newsItemTop}>
          <span>{media_name}</span>
          <span>{publish_time}</span>
        </div>
        <div class={style.newsItemMiddle}>
          <img src={(image_list[0] && image_list[0].url) || defaultUrl} />
        </div>
        <div class={style.newsItemBottom}>
          <h1>{title}</h1>
          <p>{abstract}</p>
        </div>
        {/* <div>{abstract}</div>
        <span>{media_name}</span>
        <span>{comment_count}</span>
        <span>{publish_time}</span> */}
      </div>
    );
  }
}
