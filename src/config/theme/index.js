import { themeKey } from '../../constants/stroage';
import theme from './theme';

export default class Theme {
  // 获取缓存的主题配置
  getTheme() {
    return storage.Load({ key: themeKey })
      .then(ret => JSON.parse(ret))
      .catch(() => this.saveTheme(theme.Default));
  }

  /**
   * 保存主题标识
   */
  saveTheme(themeFlag) {
    return storage.Save({
      key: themeKey,
      data: JSON.stringify(themeFlag),
    })
      .then(() => themeFlag)
      .catch(() => console.log('保存主题失败'));
  }
}
