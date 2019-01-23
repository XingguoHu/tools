import { VNode, CreateElement } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";

import style from "./index.scss";
import menuIcon from "../../assets/menu.svg";

/**
 *
 * @export default
 * @class Nav
 * @extends {Vue}
 */
@Component
export default class Nav extends Vue {
  // state
  private showLeftNav: boolean = false; // 控制侧边栏
  private showleftNavContent: boolean = false; // 控制侧边栏内容以及内容动画
  private leftNavAnimation: boolean = false; // 控制侧边栏动画
  private showCateIndex: number = 0;

  // props
  @Prop({
    type: Array,
    default: () => []
  })
  private menuList!: any[];

  /**
   * 侧边栏显示.
   */
  private handleShowLeftNav(): void {
    const isShow = true;
    this.showLeftNav = isShow;
    setTimeout(() => {
      this.showleftNavContent = isShow;
    }, 60);
    setTimeout(() => {
      this.leftNavAnimation = isShow;
    });
  }

  /**
   * 侧边栏消失.
   */
  private handleHidenLeftNav(): void {
    const isShow = false;
    this.showleftNavContent = isShow;
    setTimeout(() => {
      this.showLeftNav = isShow;
      this.leftNavAnimation = isShow;
    }, 400);
  }

  /**
   * 阻止侧边内容区域冒泡,实现点击内容侧边不消失,点击其他区域侧边消失.
   */
  private stopPropagation(e: any): void {
    e.stopPropagation();
  }

  private handleCateClick(cate: any): void {
    // const { index } = cate;
    // const { showCateIndex } = this;
    // if (showCateIndex === index) {
    //   this.showCateIndex = -1;
    // } else {
    //   this.showCateIndex = index;
    // }
    const { value } = cate;
    this.$router.push({
      name: value
    });
    this.handleHidenLeftNav();
  }

  private handleSubCateClick(subCate: any): void {
    const { value } = subCate;
    this.$router.push({
      name: value
    });
    this.handleHidenLeftNav();
  }

  private render(h: CreateElement): VNode {
    const {
      showLeftNav,
      stopPropagation,
      showleftNavContent,
      leftNavAnimation,
      handleHidenLeftNav,
      menuList,
      handleCateClick,
      showCateIndex,
      handleSubCateClick,
      handleShowLeftNav
    } = this;

    const menuContent = menuList.map((i, index) => {
      const { children = [], label, value } = i;

      const childrenList = children.map((j, subIndex) => {
        const { value: subValue, label: subLabel } = j;
        return (
          <li
            key={subIndex}
            onClick={handleSubCateClick.bind(this, { subValue })}
            class={showCateIndex === index ? style.open : style.close}
          >
            {subLabel}
          </li>
        );
      });

      return (
        <div class={style.navMenuList} key={index}>
          <h2 onClick={handleCateClick.bind(this, { value })}>{label}</h2>
          <ul>{childrenList}</ul>
        </div>
      );
    });

    return (
      <div class={style.nav}>
        <div class={style.navTop}>
          <img src={menuIcon} alt="icon" onClick={handleShowLeftNav} />
        </div>
        <div
          class={[
            style.navLeft,
            leftNavAnimation
              ? style.navLeftAnimationShow
              : style.navLeftAnimationHide
          ]}
          onClick={handleHidenLeftNav}
          style={{ display: showLeftNav ? "block" : "none" }}
        >
          <div
            onClick={stopPropagation}
            class={[
              style.navLeftContent,
              showleftNavContent
                ? style.navLeftContentShow
                : style.navLeftContentHide
            ]}
          >
            <m-scroll>
              <div class={style.navTitle}>
                <h1>TEST</h1>
                <span>v1.0.0</span>
              </div>
              {menuContent}
            </m-scroll>
          </div>
        </div>
      </div>
    );
  }
}
