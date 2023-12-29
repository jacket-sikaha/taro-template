import { View, Text, Input } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.less";
import { observer } from "mobx-react";
import useStore from "@/hooks/useStore";

function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });
  const store = useStore("user");
  return (
    <View className="index">
      <Text style={{ color: "red" }}>{store.user}</Text>
      <Input
        name="name"
        value={store.user}
        onInput={(e) => {
          store.set(e.detail.value);
        }}
      />
    </View>
  );
}
export default observer(Index);
