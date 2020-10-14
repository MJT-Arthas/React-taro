import { ITouchEvent } from "@tarojs/components";

export class TouchTool {
  touchS: number[];
  touchE: number[];
  /**
   *方法说明
   *@touchStart 配合onTouchStart
   */
  touchStart(e: ITouchEvent<any>) {
    this.touchS = [];
    this.touchE = [];
    let sx = e.touches[0].pageX;
    let sy = e.touches[0].pageY;
    this.touchS = [sx, sy];
  }
  /**
   *方法说明
   *@touchMove 配合onTouchMove
   */
  touchMove(e: ITouchEvent<any>) {
    let sx = e.touches[0].pageX;
    let sy = e.touches[0].pageY;
    this.touchE = [sx, sy];
  }
  /**
   * 方法说明
   * @method 滑动结束 配合onTouchEnd
   * @for TouchTool
   * @param {number} 第一个参数 0左右滑动 1上下滑动
   * @param {function} 第二个参数 callback1 上左滑动回调
   * @param {function} 第三个参数 callback2 下右滑动回调
   * @return {返回值类型} 无返回值
   */
  touchEnd(
    direction: number,
    callback1: () => void,
    callback2: () => void
  ): void {
    let start = this.touchS;
    let end = this.touchE;
    if (start[direction] < end[direction] - 50) {
      console.log("下/右滑");
      callback2 ? callback2() : null;
    } else if (start[direction] > end[direction] + 50) {
      console.log("上/左滑");
      callback1 ? callback1() : null;
    } else {
      console.log("静止");
    }
  }
}
