
import { tokenKey } from '../constants/stroage';

export default class Account {
  // 获取缓存的用户信息
  getAccount() {
    return storage.Load({ key: tokenKey })
      .then(ret => ret)
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
      .then(() => userinfo)
      .catch((err) => {
        console.log('设置用户信息失败');
        throw new Error(err);
      });
  }

  removeAccount() {
    return storage.Remove(tokenKey)
      .then(ret => ret)
      .catch((err) => {
        console.log('移除用户信息失败');
        throw new Error(err);
      });
  }
}
