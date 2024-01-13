import { View, Text, Button, WebView } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { useState } from "react";

function Index() {
  const [url, seturl] = useState("www.baidu.com");
  useLoad((e) => {
    console.log("Page loaded.", e.path, e.q);
    // seturl(`${e.path}?q=${e.q}`);
    seturl(`${e.path}`);
  });
  const handleMessage = () => {
    console.log(" ", 12313);
  };
  return (
    <WebView
      className=" w-screen h-screen"
      src={url}
      onMessage={handleMessage}
    />
  );
}
export default Index;
