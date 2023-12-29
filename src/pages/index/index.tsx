import { View, Text, Button } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.less";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="index">
      <View className="text-[#acc855] text-[100px]">Hello world!</View>
      <button
        onClick={() => {
          Taro.navigateTo({ url: "/pages/test/index" });
        }}
      >
        test
      </button>
      <Button
        onClick={() => {
          Taro.navigateTo({ url: "/pages/user/index" });
        }}
      >
        user
      </Button>
    </View>
  );
}
