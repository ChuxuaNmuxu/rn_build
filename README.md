# e采课业系统 react-native（CJCHS-RN）

## 注意事项
 - 请务必安装 EditorConfig 插件，保证代码的一致性
 - 请务必使用 yarn 安装依赖，可以避免很多稀奇古怪的报错
 - 打包时需要在电脑中配置密钥

## 说明
 - eslint 继承 Airbnb 规范


## 快速开始

#### 1、项目安装
- 执行 `yarn` 命令即可

#### 2、安卓调试
- 执行 `npm run dev-android` 命令即可

#### 3、ios调试
- 执行 `npm run dev-ios` 命令即可

#### 4、打开模拟器调试菜单
- 执行 `npm run dev-menu` 命令即可
> window 可使用快捷键 F1 或 Ctrl + M

#### 5、打包
- 执行 `npm run build` 命令即可

#### 6、打包失败之后用户清除打包缓存
- 执行 `npm run clear-build-cache` 命令即可

#### 7、清除开发和打包缓存
- 执行 `npm run clean` 命令即可

#### 8、将打包好的app安装至手机上
- 执行 `npm run test-build` 命令即可

#### 9、打开开发工具，可以查看rn的目录结构和css样式
- 执行 `npm run devtools` 命令即可
> 建议安装使用 react-native-debugger 一个软件可以实现 react-devtools 和 debugger-ui 所有功能，并且还能查看 store。
> 安装使用教程 http://beansoft.biz/2017/05/17/react-native-debugger-%E7%8B%AC%E7%AB%8B%E8%B0%83%E8%AF%95%E5%99%A8%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95/

## 项目介绍

### 目录结构
```
react                   react项目根目录
  ├─config              配置目录
  ├─dist                生产目录
  ├─libs                
  ├─node_modules
  ├─scripts             执行脚本目录
  ├─src                 开发目录
  │   ├─actions
  │   ├─components
  │   ├─containers
  │   ├─core
  │   ├─public          公共全局资源目录
  │   ├─reducers
  │   ├─utils
  │   ├─view            视图目录
  │   ├─index.html
  │   ├─index.js
  │   └─routes.js
  ├─tools               工具目录
  ├─.babelrc            babel配置文件
  ├─.eslintignore       eslint忽略配置文件
  ├─.eslintrc.js        eslint配置文件
  ├─.gitignore
  ├─.gitlab-ci.yml      gitlab持续集成配置
  ├─.npmrc              npm配置
  ├─.stylelintignore    stylelint忽略配置
  ├─.stylelintrc        stylelint配置
  ├─CHANGELOG           版本变更日志
  ├─CONTRIBUTING.md     
  ├─package.json
  ├─postcss.config.js   postcss配置文件
  ├─README.md
  ├─server.js           webpack-dev-server启动脚本
  └─webpack.config.js
```


### 具备特征

- XXX