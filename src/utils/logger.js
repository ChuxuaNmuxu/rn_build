
import {
  Platform,
} from 'react-native';

import moment from 'moment';

const RNFS = require('react-native-fs');


class Logger {
  constructor() {
    this.rnfsPath = Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath;
    this.callChaining = this.callChaining.bind(this);
  }

  // 链式调用，不过局限于callChaining（'funcName）.callChaining（'funcName）
  callChaining(funcName) {
    this[funcName](...Array.from(arguments).slice(1));
    return this;
  }

  existsFile= path => RNFS.exists(path)


  // 创建并且写进内容
  writeFile=(path, content) => {
    RNFS.writeFile(`${this.rnfsPath}/${path}`, content, 'utf8')
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /* 在已有的txt上添加新的文本 */
  appendFile=(path, content) => {
    // 如果不存在则创建
    this.existsFile(`${this.rnfsPath}/${path}`).then((s) => {
      if (!s) {
        this.writeFile(path, content);
      } else {
        RNFS.appendFile(`${this.rnfsPath}/${path}`, content, 'utf8')
          .then((success) => {
            console.log(success, 'success');
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }).catch((e) => {
      throw e;
    });
  }

  // 读取
  readFile=(path) => {
    // 如果不存在抛出错误，日志会捕获吧……
    this.existsFile(`${this.rnfsPath}/${path}`).then((s) => {
      if (!s) {
        throw new Error('File path does not exist~~');
      } else {
        RNFS.readFile(`${this.rnfsPath}/${path}`)
          .then((result) => {
            console.log(result, '读取成功');
          // TODO:上传到远程？
          })
          .catch((err) => {
            // alert(err.message);
            console.log(err, '读取失败');
          });
      }
    }).catch((e) => {
      throw e;
    });
  }

  /* 删除文件 */
  deleteFile=(path) => {
    this.existsFile(`${this.rnfsPath}/${path}`).then((s) => {
      if (!s) {
        // throw new Error('File path does not exist~~');
        console.warn(`File ${path} does not exist~~`);
      } else {
        RNFS.unlink(`${this.rnfsPath}/${path}`)
          .then(() => {
          // alert('FILE DELETED');
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }).catch((e) => {
      throw e;
    });
  }

  // TODO:上传到服务器，但是首先我们要搭建一个服务器？我觉得不现实，毕竟为了个只对开发有意义的日志……还不如先把开发硬件升级一下是吧

  // 网络请求日志格式
  formatNetWorkLog=(text, url, options, method, headers) => (
    text
      ? `date:${moment().format('YYYY-MM-DD HH:mm:ss')}
      url:${url}
      options:${JSON.stringify(options)}
      method:${method}
      headers:${headers}
      data: ${JSON.stringify(JSON.parse(text))}
      /----------------------------------------------------------------/

      `
      : 'nothing'
  )


  // 代码错误捕获日志
  formatCodeErrorLog=(name, message) => (
    `date:${moment().format('YYYY-MM-DD HH:mm:ss')}
    name:${name}
    message:${message}
    /----------------------------------------------------------------/

    `
  )


   // 捕获日志
   formatConsole = (message, data) => (
     message
       ? `date:${moment().format('YYYY-MM-DD HH:mm:ss')}
      data:${message}: ${data}
      /----------------------------------------------------------------/

      `
       : 'nothing'
   )
}

const logger = new Logger();
export default logger;
