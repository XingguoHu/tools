import { VNode, CreateElement } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import style from "./index.scss";
/**
 *
 * @export default
 * @class Scroll
 * @extends {Vue}
 */
@Component
export default class Scroll extends Vue {
  // state
  public $el: any = null;
  private lastBottom: number = -1;

  // props
  @Prop({
    type: Boolean,
    default: true
  })
  private event!: boolean;
  @Prop({
    type: Number,
    default: 0
  })
  private distance!: number;
  @Prop({
    type: String
  })
  private height!: string;
  @Prop({
    type: String
  })
  private width!: string;

  // methods
  private handleScroll(): void {
    const {
      $el: { scrollHeight, scrollTop, clientHeight }
    } = this;
    const bottom = scrollHeight - clientHeight - scrollTop;

    if (this.lastBottom > bottom && bottom <= this.distance) {
      this.$emit("bottom");
    }
    this.lastBottom = bottom;
  }

  // lifeCycle
  private mounted(): void {
    const {
      event,
      $refs: { scroll }
    } = this;
    this.$el = scroll;
    if (event && this.$el) {
      this.$el.addEventListener("scroll", this.handleScroll);
    }
  }
  private destroyed(): void {
    const { event, $el } = this;
    if (event && $el) {
      $el.removeEventListener("scroll", this.handleScroll);
    }
  }

  private render(h: CreateElement): VNode {
    const {
      $slots: { default: slot },
      height,
      width
    } = this;

    return (
      <div ref="scroll" class={style.scroll} style={{ height, width }}>
        {slot}
      </div>
    );
  }
}
