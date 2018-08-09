# e采课业系统 react-native（CJCHS-RN）

## 注意事项
1. 请务必安装 EditorConfig 插件，保证代码的一致性
2. 请务必安装 eslint 插件，保证代码风格一致性 
3. 请务必使用 yarn 安装依赖，可以避免很多稀奇古怪的报错
4. 打包时需要在电脑中配置密钥
---

## 说明
 - eslint 继承 Airbnb 规范
---

## 快速开始

#### 1、项目安装
- 执行 `yarn` 命令即可

#### 2、安卓调试
- 执行 `npm run dev-android` 命令即可

#### 2、ios调试
- 执行 `npm run dev-ios` 命令即可

---
## npm命令说明
#### 打开模拟器调试菜单
- 执行 `npm run dev-menu` 命令即可
> window 可使用快捷键 F1 或 Ctrl + M

#### 打包
- 执行 `npm run build` 命令即可

### 手动安装debug包至设备
- 执行 `npm run test-install` 命令即可 

### 查看调试或打包的错误信息
- 执行 `npm run gradle-debug` 命令即可
- 执行 `npm run gradle-info` 命令即可
- 执行 `npm run gradle-stacktrace` 命令即可

#### 打包失败之后用户清除打包缓存
- 执行 `npm run clear-build-cache` 命令即可

#### 清除开发和打包缓存
- 执行 `npm run clean` 命令即可

#### 清除全部缓存（打包、开发、npm、cnpm、yarn）
- 执行 `npm run clean` 命令即可

#### 将打包好的app安装至手机上
- 执行 `npm run test-build` 命令即可

#### 打开开发工具，可以查看rn的目录结构和css样式
- 执行 `npm run devtools` 命令即可
> 建议安装使用 react-native-debugger 一个软件可以实现 react-devtools 和 debugger-ui 所有功能，并且还能查看 store。
> [安装使用教程](http://beansoft.biz/2017/05/17/react-native-debugger-%E7%8B%AC%E7%AB%8B%E8%B0%83%E8%AF%95%E5%99%A8%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95/) 
---

## 项目介绍
---

### 目录结构
```
react                   react项目根目录
  ├─config              配置目录
  ├─dist                生产目录
  ├─libs                
  ├─node_modules
  ├─scripts             执行脚本目录
  ├─src                 开发目录
  │   ├─actions         action
  │   ├─components      公共组件
  |   ├─configs         主题：api等配置文件
  │   ├─constants       常量：storage key、action key
  │   ├─containers      容器组件
  │   ├─middlewares     中间件
  │   ├─public          静态资源
  │   ├─reducers        reducer
  │   ├─scripts         npm 脚本
  │   ├─store           store        
  │   ├─utils           常用工具      
  │   ├─view            页面
  │   ├─routes.scss     路由样式
  │   └─routes.js       路由
  ├─.babelrc            babel配置文件
  ├─.editorconfig       统一编辑器格式
  ├─.eslintrc.js        eslint配置文件
  ├─.gitignore          git忽略文件
  ├─.npmrc              npm配置
  ├─app.js              app入口文件
  ├─app.json
  ├─pageage.json        
  ├─README.md
  └─rn-cli.config.js    scss转react native样式配置
```

### 具备特征
- 保证react native样式编写与web样式一致。
- 使用react-native-router-flux避免react-navigation复杂的配置与调用