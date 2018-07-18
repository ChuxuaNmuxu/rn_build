import { isEmpty } from 'ramda';
import { Toast } from 'antd-mobile-rn';
import qs from 'qs';

const errCode = (json) => {
  switch (json.code) {
    case 703:
      return check703(json);
    case -1:
      Toast.fail(`${json.code} ${json.message || json.data}`);
      return Promise.reject(new Error(`${json.code} ${json.message || json.data}`));
    }
    return json;
}

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
      .then(errCode)
      .catch(err => new Error(err))
  },
  get(url, params = {}, mock = false, headerParams = {}) {
    let _url = url;
    if (!isEmpty(params)) {
      _url = url + (/\?/.test(url) ? '&' : '?') + qs.stringify(params);
    }
    return this.fetch(_url, {}, 'get', '', mock, headerParams);
  },
  post(url, params, type = 'json', mock = false) { return this.fetch(url, params, 'post', type, mock); },
  put(url, params, type = '') { return this.fetch(url, params, 'put', type); },
  delete(url, params) {
    let _url = url;
    if (!isEmpty(params)) {
      _url = url + (/\?/.test(url) ? '&' : '?') + qs.stringify(params);
    }
    return this.fetch(_url, params, 'delete');
  },
};

export default Fetch;