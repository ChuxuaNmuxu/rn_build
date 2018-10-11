import { isEmpty } from 'ramda';
import { Toast } from 'antd-mobile-rn';
import qs from 'qs';
import Config from '../config';

function apiUrl(url) {
  if (typeof url !== 'string') {
    console.error('url只能为字符串类型');
  } else if (url.indexOf('http') === 0) {
    // 如果url是以http开头说明是个完整的地址不需要拼接，直接返回
    return url;
  } else if (url.charAt(0) === '/') {
    return Config.Api.baseApi + url;
  }
  return `${Config.Api.baseApi}/${url}`;
}

const errCode = (json) => {
  switch (json.code) {
    case 703:
      return console.log('登陆过期', json);
    case -1:
      Toast.fail(`${json.code} ${json.message || json.data}`);
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
      options.body = JSON.stringify(params);
    } else if (type === 'file') {
      options.body = params;
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
  get(url, params = {}, mock = false, headerParams = {}) {
    let _url = url;
    if (!isEmpty(params)) {
      _url = url + (/\?/.test(url) ? '&' : '?') + qs.stringify(params);
    }
    return this.fetch(apiUrl(_url), {}, 'get', '', mock, headerParams);
  },
  post(url, params, type = 'json', mock = false) { return this.fetch(apiUrl(url), params, 'post', type, mock); },
  put(url, params, type = '') { return this.fetch(apiUrl(url), params, 'put', type); },
  delete(url, params) {
    let _url = url;
    if (!isEmpty(params)) {
      _url = url + (/\?/.test(url) ? '&' : '?') + qs.stringify(params);
    }
    return this.fetch(apiUrl(_url), params, 'delete');
  },
};

export default Fetch;
