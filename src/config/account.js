
import { DeviceEventEmitter } from 'react-native';
import { tokenKey } from '../constants/stroage';
import { tokenListener } from '../constants/listener';

export default class Account {
  // 获取缓存的用户信息
  getAccount() {
    return storage.Load({ key: tokenKey })
      .then((ret) => {
        DeviceEventEmitter.emit(tokenListener, ret);
        console.log(12, ret);
        return ret;
      })
      .catch((err) => {
        console.log('获取用户信息失败');
        throw new Error(err);
      });
  }

  // 设置用户信息缓存
  setAccount(userinfo) {
    return storage.Save({
      key: tokenKey,
      data: userinfo,
    })
      .then(() => {
        const { token } = userinfo;
        console.log(28, token);
        DeviceEventEmitter.emit(tokenListener, token);
        return userinfo;
      })
      .catch((err) => {
        console.log('设置用户信息失败');
        throw new Error(err);
      });
  }

  removeAccount() {
    return storage.Remove(tokenKey)
      .then((ret) => {
        DeviceEventEmitter.emit(tokenListener, null);
        return ret;
      })
      .catch((err) => {
        console.log('移除用户信息失败');
        throw new Error(err);
      });
  }
}
