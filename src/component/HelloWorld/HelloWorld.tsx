import React from "react";
// import { Text } from "@tarojs/components";
import "./HelloWorld.less";
export function HelloWorld(props) {
  return <view className="hello">{props.name}</view>;
}
