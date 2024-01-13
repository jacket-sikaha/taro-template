export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/test/index",
    "pages/user/index",
    "pages/mp-html/index",
    "pages/webview/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  // 全局引入该第三方自定义组件
  usingComponents: {
    "mp-html": "./components/mp-html/index",
  },
});
