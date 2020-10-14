import React, { useState } from "react";
import { View, Text } from "@tarojs/components";
import { useReachBottom } from "@tarojs/taro";
import "./home.less";

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number;
  };
};

type PageDispatchProps = {
  add: () => void;
  dec: () => void;
  asyncAdd: () => any;
};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Index {
  props: IProps;
}

function Index() {
  const [count, setCount] = useState(0);
  let arr: number[] = [1, 2, 3, 4, 5, 6];
  let El = arr.map((item) => <View>{item}</View>);
  useReachBottom(() => {
    console.log("到底了");
  });
  interface touchData {
    touchE: number[];
    touchS: number[];
  }
  let data: touchData = {
    touchE: [],
    touchS: [],
  };
  function touchStart(e: React.TouchEvent<SVGViewElement>) {
    console.log(e.touches[0]);
    let sx = e.touches[0].pageX;
    let sy = e.touches[0].pageY;
    data.touchS = [sx, sy];
  }
  function touchMove(e: React.TouchEvent<SVGViewElement>) {
    let sx = e.touches[0].pageX;
    let sy = e.touches[0].pageY;
    data.touchE = [sx, sy];
  }
  function touchEnd() {
    let start = data.touchS;
    let end = data.touchE;
    console.log(start);
    console.log(end);
    if (start[1] < end[1] - 50) {
      console.log("下滑");
    } else if (start[1] > end[1] + 50) {
      console.log("上滑");
    } else {
      console.log("静止");
    }
  }
  return (
    <View className="index">
      {El}
      <Text>You clicked {count} times</Text>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={() => setCount(count - 1)}>Click me</button>
      <View>
        <view
          className="btn"
          onTouchStart={(e) => touchStart(e)}
          onTouchMove={(e) => touchMove(e)}
          onTouchEnd={() => touchEnd()}
        >
          OK
        </view>
      </View>
    </View>
  );
}

export default Index;
