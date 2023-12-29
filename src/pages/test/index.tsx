import { View, Text, Button } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.less";
import { observer } from "mobx-react";
import useStore from "@/hooks/useStore";

function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });
  const store = useStore("store");
  return (
    <View className="index">
      <Text>{store.total}</Text>
      <Button onClick={() => (store.total = Math.random() + 2)}>Click</Button>
      <Button onClick={() => store.add()}>add</Button>
    </View>
  );
}
export default observer(Index);
