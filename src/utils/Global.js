/**
 * 全局变量方法，一般我会用来设置全局的方法，比如说：系统判断，屏幕宽高，主题设置，图片初始化。 具体的详情可以查看global.js内部注释。
 */

import {
  Dimensions,
  PixelRatio,
  Platform,
  Alert,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
// 项目中的图片可以通过Images.xxx 获取
// import { Images } from '../Resources/index';
// 本地存储
import Storage from './Storage';

// 封装的网络请求
import Fetch from './Fetch';
// 配置文件，可以放网络请求等
import Config from './Config';

// 通过系统API获得屏幕宽高
const { height, width } = Dimensions.get('window');
// 系统是iOS
global.iOS = (Platform.OS === 'ios');
// 系统是安卓
global.Android = (Platform.OS === 'android');
// 获取屏幕宽度
global.SCREEN_WIDTH = width;
// 获取屏幕高度
global.SCREEN_HEIGHT = height;
// 获取屏幕分辨率
global.PixelRatio = PixelRatio.get();
// 最小线宽
global.pixel = 1 / PixelRatio;
// 网络请求
global.Fetch = Fetch;
// 配置
global.Config = Config;
// router跳转的方法
global.Actions = Actions;
// 图片加载
// global.Images = Images;
// 弹出框
global.Alert = Alert;
// 存储
global.storage = Storage;
