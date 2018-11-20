import { isEmpty } from 'ramda';
import qs from 'qs';
import { Toast } from 'antd-mobile-rn';
import { DeviceEventEmitter, NetInfo } from 'react-native';
import fetchApi from '../config/apiBase/fetchApi';
import ApiBase from '../config/apiBase';
import Account from './account';
import * as listener from '../constants/listener';
import { SetUserInfo } from '../actions/account';
import Logger from './logger';

const findString = (data, mes) => data.indexOf(mes) !== -1;

// origin表示 https://cjyun.ecaicn.com
let origin = null;
const apiBase = new ApiBase();
// 监听修改环境操作
DeviceEventEmitter.addListener(listener.apiBase, (params) => {
  origin = fetchApi(undefined, params);
});

let isConnected = true;
// 获取初始网络
NetInfo.isConnected.fetch().then((isConnect) => {
  isConnected = isConnect;
});
// 监听网络状态
DeviceEventEmitter.addListener(listener.netConnected, (param) => {
  isConnected = param;
});

// 拼接url
const connectUrl = async (url) => {
  if (!origin) {
    origin = await apiBase.getApiBase();
    origin = fetchApi(undefined, origin);
  }

  if (typeof url !== 'string') {
    console.error('url只能为字符串类型');
  } else if (url.indexOf('http') === 0) {
    // 如果url是以http开头说明是个完整的地址不需要拼接，直接返回
    return url;
  } else if (url.charAt(0) === '/') {
    return origin + url;
  }

  return `${origin}/${url}`;
};

const errCode = (json) => {
  switch (json.code) {
    case 703:
      /**
       * 登陆过期
       * 1. 跳转至登陆页面
       * 2. 清除store
       * 3. 清除storage缓存
       * 4. 提示登陆超时
       */
      Actions.reset('Account');
      Store.dispatch(SetUserInfo());
      new Account().removeAccount();
      Toast.info(json.message);
      throw new Error(json.message);
    case -1:
      Toast.info(json.message);
      throw new Error(`${json.code} ${json.message || json.data}`);
    default:
      // console.log('json.code:', json.code);
  }
  if (json.code !== 0) Toast.info(json.message);

  return json;
};

const Fetch = {
  /**
 * param {Number} url 地址
 * param {Object} parmas 数据
 * param {String} method 请求类型
 * param {String} type 上传格式，比如：表单formData，json
 * param {Boolean} mock 是否携带token
 * param {Object} headerParams 请求头设置
 */
  fetch(url, params = {}, method = 'get', type = '', mock = false, headerParams = {}) {
    if (!isConnected) {
      return Toast.info('当前设备网络异常，请检查网络');
    }
    const headers = {};
    if (method === 'post') {
      headers.Accept = 'application/json';
      headers['Content-Type'] = 'application/json';
    }
    if (!isEmpty(headerParams)) {
      for (const key in headerParams) {
        headers[key] = headerParams[key];
      }
    }
    const options = {
      method,
      headers,
      credentials: 'include',
    };
    if (type === 'json') {
      headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(params);
    } else if (type === 'file') {
      headers['Content-Type'] = 'multipart/form-data';
      options.body = params;
      options.processData = false;
      options.contentType = false;
    }

    return fetch(url, options)
      .then(res => res.text())
      .then((text) => {
        if (!__DEV__) Logger.appendFile('networkLog.txt', Logger.formatNetWorkLog(text, url, options, method));
        console.log('fetch: ', text);
        return (text ? JSON.parse(text) : {});
      })
      .then(errCode)
      .catch((err) => {
        /**
         * 没网络提示：
         * 开发时：Network request failed
         * 线上时：
         *    爱立顺：onerror@data/user/0/com.cjhms_rn/files/CodePush/......
         *      华为：onerror@data/data/com.cjhms_rn/files/CodePush/......
         */
        if (findString(err.stack, 'Network request failed') || findString(err.stack, 'com.cjhms_rn/files/CodePush/')) {
          Toast.fail('当前设备网络异常，请检查网络');
        } else {
          Toast.fail(`url:${url}, message:${err.message}`);
        }
        console.log(`fetch err: ${err}`);

        throw new Error(err);
      });
  },
  async getUrl(url, ...args) {
    const _url = await connectUrl(url);
    return this.fetch(_url, ...args);
  },
  get(url, params = {}, mock = false, headerParams = {}) {
    let _url = url;
    if (!isEmpty(params)) {
      _url = url + (/\?/.test(url) ? '&' : '?') + qs.stringify(params, { indices: false });
    }
    return this.getUrl(_url, {}, 'get', '', mock, headerParams);
  },
  post(url, params, type = 'json', mock = false) { return this.getUrl(url, params, 'post', type, mock); },
  put(url, params, type = 'json') { return this.getUrl(url, params, 'put', type); },
  delete(url, params) {
    let _url = url;
    if (!isEmpty(params)) {
      _url = url + (/\?/.test(url) ? '&' : '?') + qs.stringify(params, { indices: false });
    }
    return this.getUrl(_url, params, 'delete');
  },
};
export default Fetch;
