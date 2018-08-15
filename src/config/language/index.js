import DeviceInfo from 'react-native-device-info';
import { languageKey } from '../../constants/stroage';
import I18n from './I18n';

export default class Language {
  // 从缓存中获取语言
  getLanguage() {
    const systemLanguage = DeviceInfo.getDeviceLocale();
    return storage.Load({ key: languageKey })
      .then(ret => this.changeSoftLanguage(ret))
      .catch(() => this.setAndSaveLanguage(systemLanguage));
  }

  // 保存语言至缓存
  static saveLanguage(languageFlag) {
    return storage.Save({
      key: languageKey,
      data: languageFlag,
    })
      .then(() => languageFlag);
  }

  // 更改soft语言
  changeSoftLanguage(languageFlag) {
    I18n.locale = languageFlag;
    return languageFlag;
  }

  // 设置并保存语言至缓存
  setAndSaveLanguage(languageFlag) {
    return Promise.resolve()
      .then(() => Language.saveLanguage(languageFlag))
      .then(this.changeSoftLanguage);
  }
}
