import I18n from 'react-native-i18n';
import en from './en';
import zh from './zh';

// 默认语言
I18n.defaultLocale = 'zh';
I18n.locale = 'zh';
I18n.fallbacks = true;

I18n.translations = {
  en,
  zh,
};

export default I18n;
