import React, { useState } from "react";
import { View, Text } from "@tarojs/components";
import { useReachBottom } from "@tarojs/taro";
import Taro from "@tarojs/taro";
import { TouchTool } from "../../tools/tools";

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

let touchTools = new TouchTool();
function Index() {
  const [count, setCount] = useState(0);
  let arr: number[] = [1, 2, 3, 4, 5, 6];
  let El = arr.map((item) => <View>{item}</View>);
  useReachBottom(() => {
    console.log("到底了");
  });

  return (
    <View className="index">
      {El}
      <Text>You clicked {count} times</Text>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={() => setCount(count - 1)}>Click me</button>
      <View
        className="btn"
        onTouchStart={(e) => touchTools.touchStart(e)}
        onTouchMove={(e) => {
          touchTools.touchMove(e);
          e.stopPropagation();
        }}
        onTouchEnd={() =>
          touchTools.touchEnd(
            1,
            () => {
              Taro.showToast({ title: "上滑了" });
            },
            () => {
              Taro.showToast({ title: "下滑了" });
            }
          )
        }
      >
        OK
      </View>
    </View>
  );
}

export default Index;
