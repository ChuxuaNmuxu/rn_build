# e采课业系统 react-native（CJCHS-RN）

## 注意事项
1. 请务必安装 EditorConfig 插件，保证代码的一致性
2. 请务必安装 eslint 插件，保证代码风格一致性 
3. 请务必使用 yarn 安装依赖，可以避免很多稀奇古怪的报错
4. 打包时需要在电脑中配置密钥
5. 使用v16.4以后的生命周期 getDerivedStateFromProps、getSnapshotBeforeUpdate，不再使用 componentWillReceiveProps、componentWillMount、componentWillUpdate 用 getDerivedStateFromProps代替。[参考文档](https://zhuanlan.zhihu.com/p/38030418)
 - getDerivedStateFromProps 是个静态方法(纯函数)里面不能访问this,只能根据nextProps和prevState计算出预期的状态改变，通过return将结果送给setState。 getDerivedStateFromProps 的结果相当于给了setState，并不是真的调用setState。[最新生命周期图](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
 - getSnapshotBeforeUpdate 不是一个静态方法但也要尽量使用prevProps, prevState计算去返回一个值。这个值会随后被传入到 componentDidUpdate (第三参 snapshot)中，然后在 componentDidUpdate (prevProps, prevState, snapshot) 中去更新组件的状态，而不是在 getSnapshotBeforeUpdate 中直接更新组件状态。
6. Android 6.0为分界点，高于或者低于等于6.0都需要修改两个地方`android\gradle\wrapper\gradle-wrapper.properties`、`android\build.gradle`
7. RN样式是web样式的子级，详情请[查看](https://github.com/doyoe/react-native-stylesheet-guide)文档
8. 本项目已做自适应和scss转RN原生样式处理，编写RN样式和web样式体验一致
9. RN原生Modal组件是直接调用Android原生方法，不受自适应约束，需要引入`Resolution`组件做自适应。
10. [常见问题](./doc/FAQ.md)

---

## 说明
 - eslint 继承 Airbnb 规范

-----

## 环境安装与基础配置
#### 1、RN配置（windows）

- 参照官方文档：[中文](https://reactnative.cn/) 、[英文](https://facebook.github.io/react-native/)
- 工具：[Android Studio](https://developer.android.google.cn/studio/)

###### 注意：
  > * 1、请严格按照文档流程配置每一步，否则运行项目时会出现很多问题
  > * 2、如果 [Genymotion](https://www.genymotion.com/download/) 模拟器安装报错或使用genymotion无法访问网络，可以选择安装 [BlueStacks](http://www.bluestacks.cn/)。
  > * 安装完 BlueStacks 之后请执行：
  > * 1、adb devices 如果没有查询到设备，请执行 ```adb connect 本机ip:5555```。例如:10.0.3.117:5555
  > * 2、运行项目之后请用BlueStacks的浏览器访问```本机ip:8081```(如：10.0.3.117:8081)，若不能访问请访问```10.0.2.2:8081```若能访问而又报“```Unable to load script from assets index. android bundle Make sure your bundle is packaged correctly or you're running a packager server```”错误，请按ctrl与window中间那个按键打开菜单，选择Dev Settings -> Debug server host & port for device 输入本机ip+8081端口

#### 2、调试
- 真机调试：终端执行： adb shell input keyevent 82 可以调出“开发者菜单”而不需要摇晃设备
- [使用 React Native Debugger](http://beansoft.biz/2017/05/17/react-native-debugger-%E7%8B%AC%E7%AB%8B%E8%B0%83%E8%AF%95%E5%99%A8%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95/) 查看RN dom树结构、redux和控制台

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

### 将sgv转为 xml
 - 执行 `npm run svg-to-xml` 命令即可

### iconfont映射
 - win 执行 `npm run move-iconfontMap`、 linux 执行 `npm run mv-iconfontMap` 命令即可

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