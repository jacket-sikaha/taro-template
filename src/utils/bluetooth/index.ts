import Taro from "@tarojs/taro";

export const openBluetooth = async () => {
  // 蓝牙模块初始化
  return await Taro.openBluetoothAdapter({
    mode: "central",
    // mode: "peripheral",
    fail: console.warn,
    success: console.info,
  });
};

export const closeBluetooth = async () => {
  return await Taro.closeBluetoothAdapter({
    fail: console.warn,
    success: console.info,
  });
};

//  涉及蓝牙寻找/连接设备的API，调试只能用真机调试，且蓝牙和GPS最好都要打开
// 例如：Taro.onBluetoothDeviceFound(newDevFoundCB);
// 安卓下部分机型需要有位置权限才能搜索到设备，需留意是否开启了位置权限

export const startBluetoothDevicesDiscovery = async () => {
  return await Taro.startBluetoothDevicesDiscovery({
    fail: console.warn,
    success: console.info,
  });
};

export const stopBluetoothDevicesDiscovery = async () => {
  return await Taro.stopBluetoothDevicesDiscovery({
    fail: console.warn,
    success: console.info,
  });
};

export const getDevice = async () => {
  const res = await Taro.getBluetoothDevices({
    fail: console.warn,
    success: console.info,
  });
  return res;
};

export const connect = async (deviceId: string) => {
  const res = await Taro.createBLEConnection({
    deviceId,
    fail: console.warn,
    success: console.info,
  });
  return res;
};

export const disconnect = async (deviceId: string) => {
  const res = await Taro.closeBLEConnection({
    deviceId,
    fail: console.warn,
    success: console.info,
  });
  return res;
};

export const makeBluetoothPair = async (deviceId) => {
  const res = await Taro.makeBluetoothPair({ deviceId, pin: "111" });
  console.error(res);
  return res;
};

export const getBLEDeviceServices = async (deviceId: string) => {
  const res = await Taro.getBLEDeviceServices({
    deviceId,
    fail: console.warn,
    success: console.info,
  });
  console.error("getBLEDeviceServices", res);
  return res.services;
};

export const getBLEDeviceCharacteristicsId = async (
  deviceId: string,
  serviceId: string
) => {
  const res = await Taro.getBLEDeviceCharacteristics({
    // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
    deviceId,
    // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
    serviceId,
    success: function (res) {
      console.log("device getBLEDeviceCharacteristics:", res.characteristics);
    },
    fail: console.warn,
  });
  return res.characteristics;
};

export const notifyBLECharacteristicValueChange = async (
  deviceId: string,
  serviceId: string,
  characteristicId: string
) => {
  const res = await Taro.notifyBLECharacteristicValueChange({
    state: true, // 启用 notify 功能
    // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
    deviceId,
    // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
    serviceId,
    // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
    characteristicId,
    success: function (res) {
      console.log("notifyBLECharacteristicValueChange success", res);
    },
    fail: console.warn,
  });
  return res;
};

export const readBLECharacteristicValue = async (
  deviceId: string,
  serviceId: string,
  characteristicId: string
) => {
  const res = await Taro.readBLECharacteristicValue({
    // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
    deviceId,
    // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
    serviceId,
    // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
    characteristicId,
    success: function (res) {
      console.log("readBLECharacteristicValue:", res.errCode);
    },
    fail: console.warn,
  });
  return res;
};

// ArrayBuffer转16进制字符串示例
export function ab2hex(buffer) {
  let hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
    return ("00" + bit.toString(16)).slice(-2);
  });
  return hexArr.join("");
}
