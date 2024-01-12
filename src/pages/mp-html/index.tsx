import { View, Text, Button } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { observer } from "mobx-react";
import useStore from "@/hooks/useStore";

function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });
  return (
    <View className="index">
      <div>test tarojs/plugin-html</div>
      <a href="https://bing.com">tttt</a>
      <mp-html
        content={`<div>
  sv bdsjv bjkjSDv sdvsdv 
  <a
    data-ishare-action="navigate"
    data-ishare-navigate-target="www.baidu.com"
    data-ishare-navigate-query="q=11231"
  >
    123123
  </a>
</div>`}
      />
    </View>
  );
}
export default observer(Index);
