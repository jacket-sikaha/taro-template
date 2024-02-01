import useBleService from "@/hooks/useBleService";
import { View, Text, Button, Image, RootPortal } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { useEffect, useState } from "react";

export default function Index() {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const {
    list,
    deviceId,
    serviceIds,
    characteristicVals,
    handleConnectDev,
    readAllData,
  } = useBleService();
  return (
    <View>
      <Button type="warn" onClick={readAllData}>
        read
      </Button>
      <Button onClick={toggle}>显示root-portal</Button>
      {show && (
        <RootPortal>
          <View>
            <View>设备列表</View>
            {list?.map((o, idx) => {
              return (
                <Button
                  key={idx}
                  onClick={() => {
                    handleConnectDev(o.deviceId);
                  }}
                >
                  {o.name}
                </Button>
              );
            })}
          </View>
        </RootPortal>
      )}
      <View>
        <View style={{ display: "flex", justifyContent: "space-around" }}>
          <View>serviceId</View>
          <View>characteristicid</View>
          <View>val</View>
          <View>properties</View>
        </View>
        {[...characteristicVals.keys()].map((cid) => (
          <View style={{ display: "flex", justifyContent: "space-around" }}>
            <View style={{ flex: 1, overflow: "auto" }}>
              {characteristicVals.get(cid)?.sid}
            </View>
            <View style={{ flex: 1, overflow: "auto" }}>{cid}</View>
            <View style={{ flex: 1, overflow: "auto" }}>
              {characteristicVals.get(cid)?.val}
            </View>
            <View style={{ flex: 1, overflow: "auto" }}>
              {JSON.stringify(characteristicVals.get(cid)?.properties)}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
