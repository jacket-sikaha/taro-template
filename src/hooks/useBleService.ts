import {
  openBluetooth,
  startBluetoothDevicesDiscovery,
  stopBluetoothDevicesDiscovery,
  closeBluetooth,
  getDevice,
  connect,
  getBLEDeviceServices,
  getBLEDeviceCharacteristicsId,
  notifyBLECharacteristicValueChange,
  ab2hex,
  readBLECharacteristicValue,
  disconnect,
} from "@/utils/bluetooth";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";

function useBleService() {
  const [list, setList] = useState<any[]>();
  const [serviceIds, setServiceIds] = useState<string[]>([]);
  const [characteristicVals, setCharacteristicVals] = useState<
    Map<
      string,
      {
        val: string;
        sid: string;
        properties: any;
      }
    >
  >(new Map());
  const [deviceId, setDeviceId] = useState("");

  const initBLE = async () => {
    await openBluetooth();
    await startBluetoothDevicesDiscovery();
    return true;
  };

  const closeBLE = async () => {
    try {
      await stopBluetoothDevicesDiscovery();
      return true;
    } catch (error) {
      console.log("error", error);
    } finally {
      await closeBluetooth();
    }
  };

  const newDevFoundCB = (newDev: any) => {
    console.warn(" newdev", newDev);
    getDevice()
      .then((r) => {
        setList(r.devices.filter(({ name }) => name !== "未知设备"));
        return r;
      })
      .catch(console.error);
  };

  const handleConnectDev = async (deviceId: string) => {
    try {
      setDeviceId(deviceId);
      await connect(deviceId);
      await stopBluetoothDevicesDiscovery();
      await notifyBLEAllData(deviceId);
      return true;
    } catch (error) {
      console.log("error", error);
    }
  };

  const notifyBLEAllData = async (deviceId: string) => {
    const serviceIds = (await getBLEDeviceServices(deviceId)).map(
      ({ uuid }) => uuid
    );
    setServiceIds(serviceIds);
    const BLECharacteristic = await Promise.all(
      serviceIds.map((serviceId) =>
        getBLEDeviceCharacteristicsId(deviceId, serviceId)
      )
    );
    const res = await Promise.all(
      BLECharacteristic.flatMap((arr, idx) =>
        arr.map(({ uuid, properties }) => {
          characteristicVals.set(uuid, {
            val: "",
            sid: serviceIds[idx],
            properties,
          });
          if (properties.indicate || properties.notify) {
            return notifyBLECharacteristicValueChange(
              deviceId,
              serviceIds[idx],
              uuid
            );
          }
          return;
        })
      )
    );
    setCharacteristicVals(characteristicVals);
    return res;
  };

  // 不是所有特征值数据都能获取
  // 特征值获取的read方法只能获取到properties属性read:true的数据，其他为false的数据获取会报错
  const readAllData = async () => {
    try {
      const res = await Promise.all(
        [...characteristicVals.keys()]
          .filter(
            (characteristicId) =>
              characteristicVals.get(characteristicId)?.properties.read
          )
          .map((characteristicId) =>
            readBLECharacteristicValue(
              deviceId,
              characteristicVals.get(characteristicId)?.sid ?? "",
              characteristicId
            )
          )
      );
      console.log("res", res);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const onCharacteristicValChange = (res: {
    /** 蓝牙特征值的 uuid */
    characteristicId: string;
    /** 蓝牙设备 id */
    deviceId: string;
    /** 蓝牙特征值对应服务的 uuid */
    serviceId: string;
    /** 特征值最新的值 */
    value: ArrayBuffer;
  }) => {
    console.log(
      `characteristic ${res.characteristicId} has changed, now is ${res.value}`
    );
    characteristicVals.set(res.characteristicId, {
      sid: res.serviceId,
      val: ab2hex(res.value),
    });
    setCharacteristicVals(new Map(characteristicVals));
    console.log(ab2hex(res.value));
  };

  useEffect(() => {
    initBLE()
      .then(() => Taro.onBLEConnectionStateChange(console.info))
      .then(() =>
        Taro.onBLECharacteristicValueChange(onCharacteristicValChange)
      )
      .then(() => Taro.onBluetoothDeviceFound(newDevFoundCB))
      .catch(console.error);

    return () => {
      Taro.onBLEConnectionStateChange(console.info);
      Taro.offBluetoothDeviceFound(newDevFoundCB);
      Taro.onBLECharacteristicValueChange(onCharacteristicValChange);
      disconnect(deviceId).catch(console.error).finally(closeBLE);
    };
  }, []);

  return {
    list,
    deviceId,
    serviceIds,
    characteristicVals,
    handleConnectDev,
    readAllData,
  };
}

export default useBleService;
