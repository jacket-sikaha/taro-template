import { View, Text, Button } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { observer } from "mobx-react";
import HtmlRenderer from "@/components/html-renderer";

const html = `<h1>亲爱的顾客，</h1>
    <p>
      感谢您一直以来对我们产品的支持。我们很高兴地通知您，我们正在举办特别优惠活动！
    </p>
    <p>请点击以下链接查看我们的特别优惠产品：</p>
    <ul>
      <li>
        <a href="https://www.example.com/special-offer1">特别优惠产品1</a>
      </li>
      <li>
        <a
          data-ishare-action="navigate"
          data-ishare-navigate-target="https://www.bilibili.com"
          data-ishare-navigate-query="q=11231"
        >
          123123
        </a>
      </li>
    </ul>
    <p>这是一个限时优惠，不容错过！</p>
    <p>祝您购物愉快！</p>
    <p>此致，敬礼</p>
    <p>您的产品团队</p>`;

function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });
  return (
    <View className="index">
      <div>test tarojs/plugin-html</div>
      <a href="https://bing.com">tttt</a>
      <HtmlRenderer content={html} />
      -----------------
      <View dangerouslySetInnerHTML={{ __html: html }}></View>
    </View>
  );
}
export default observer(Index);
