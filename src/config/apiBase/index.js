import { DeviceEventEmitter } from 'react-native';
import { apiKey } from '../../constants/stroage';
import fetchApi from './fetchApi';
import { apiBase } from '../../constants/listener';

export default class ApiBase {
  // 获取缓存的当前环境
  getApiBase() {
    return storage.Load({ key: apiKey })
      .then((ret) => {
        DeviceEventEmitter.emit(apiBase, ret);
        return ret;
      })
      .catch(() => this.setApiBase(fetchApi.default));
  }

  // 设置获取
  setApiBase(apiFlag) {
    return storage.Save({
      key: apiKey,
      data: apiFlag,
    })
      .then(() => {
        DeviceEventEmitter.emit(apiBase, apiFlag);
        return apiFlag;
      })
      .catch(() => console.log('保存apiFlag失败'));
  }
}
