import { TaroEvent } from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import { useCallback, useMemo } from "react";

export type HtmlRendererProps = {
  content: string;
};

enum ActionType {
  Navigate = "navigate",
}

type TouchEvent = TaroEvent & {
  detail: {
    // 动作类型
    "data-ishare-action": ActionType;
    // 跳转页面
    "data-ishare-navigate-target"?: string;
    // 跳转参数
    "data-ishare-navigate-query"?: string;
  };
};

export default function HtmlRenderer({ content }: HtmlRendererProps) {
  // 跳转页面
  const handleNavigate = useCallback((detail: TouchEvent["detail"]) => {
    if (!detail["data-ishare-navigate-target"]) {
      return;
    }
    const fullPath = `?path=${detail["data-ishare-navigate-target"]}&${
      detail["data-ishare-navigate-query"] ?? ""
    }`;
    console.log("gogogogo", fullPath);
    Taro.navigateTo({
      url: "/pages/webview/index" + fullPath,
    });
  }, []);

  // 事件处理mapping
  const actionHandlers = useMemo(
    () => ({
      [ActionType.Navigate]: handleNavigate,
    }),
    [handleNavigate]
  );

  // 处理点击事件
  const onActionClick = ({ detail }: TouchEvent) => {
    actionHandlers[detail["data-ishare-action"]]?.(detail);
  };

  return <mp-html content={content} onLinktap={onActionClick} />;
}
