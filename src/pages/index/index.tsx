import { View, Text, Button, Image } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.less";
import http from "@/servers/http";
import { useState } from "react";

export default function Index() {
  const [url, setURL] = useState("");
  const getIMG = () => {
    http
      .get("https://t.mwm.moe/mp" || "https://imgapi.xl0408.top/index.php")
      .then((result) => {
        setURL(result as unknown as string);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useLoad(() => {
    getIMG();
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
      <button onClick={() => getIMG()}>click</button>
      <Image src={url} mode="aspectFit" />
    </View>
  );
}
