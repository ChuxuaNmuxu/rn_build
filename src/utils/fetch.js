import { isEmpty } from 'ramda';
import qs from 'qs';
import { DeviceEventEmitter } from 'react-native';
import fetchApi from '../config/apiBase/fetchApi';
import ApiBase from '../config/apiBase';

// origin表示 https://cjyun.ecaicn.com
let origin = null;
// 监听修改环境操作
DeviceEventEmitter.addListener('apiBase', (params) => {
  origin = fetchApi(undefined, params);
});
const apiBase = new ApiBase();

const connectUrl = async (url) => {
  if (!origin) {
    origin = await apiBase.getApiBase();
    origin = fetchApi(undefined, origin);
  }
  console.log(22, url);
  if (typeof url !== 'string') {
    console.error('url只能为字符串类型');
  } else if (url.indexOf('http') === 0) {
    // 如果url是以http开头说明是个完整的地址不需要拼接，直接返回
    return url;
  } else if (url.charAt(0) === '/') {
    console.log(origin + url);
    return origin + url;
  }
  return `${origin}/${url}`;
};

const errCode = (json) => {
  console.log(24, json);
  switch (json.code) {
    case 703:
      return console.log('登陆过期', json);
    case -1:
      // Toast.fail(`${json.code} ${json.message || json.data}`); // 打印出来给鬼看啊！还容易造成调试的问题
      return Promise.reject(new Error(`${json.code} ${json.message || json.data}`));
    default:
      // console.log('json.code:', json.code);
  }
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
      .then(text => (text ? JSON.parse(text) : {}))
      .then(errCode)
      .catch((err) => {
        const error = new Error(err);
        console.log(error);
        return error; // 返回错误App会自动在界面上呈现报错模态
      });
  },
  async getUrl(url, ...args) {
    const _url = await connectUrl(url);
    return this.fetch(_url, ...args);
  },
  get(url, params = {}, mock = false, headerParams = {}) {
    let _url = url;
    if (!isEmpty(params)) {
      _url = url + (/\?/.test(url) ? '&' : '?') + qs.stringify(params);
    }
    return this.getUrl(_url, {}, 'get', '', mock, headerParams);
  },
  post(url, params, type = 'json', mock = false) { return this.getUrl(url, params, 'post', type, mock); },
  put(url, params, type = 'json') { return this.getUrl(url, params, 'put', type); },
  delete(url, params) {
    let _url = url;
    if (!isEmpty(params)) {
      _url = url + (/\?/.test(url) ? '&' : '?') + qs.stringify(params);
    }
    return this.getUrl(_url, params, 'delete');
  },
};
export default Fetch;
