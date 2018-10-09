## React Native Android打包apk

### 五步流程
1. 终端运行 `keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000` 不能使用window自带的命令行终端，否则会报错
![图片](./img/generatingSignature.png)

[剩下步骤请看官方教程](https://reactnative.cn/docs/signed-apk-android/)

**注意：**
默认会使用全局配置的 gradle.properties 文件，如果全局全局配置和当前项目密钥不一致即使当前项目配置 gradle.properties 文件也会报错。