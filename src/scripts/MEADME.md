## 用于存放npm 执行脚本
- 比如将下载的icon转为json命令，将svg转为xml命令

#### 1、iconfontMap 将字体图标的 .ttf 文件转为 .js 文件
1. 将 ttf 文件放入 src/public/icon 文件夹中
2. win 执行 ```npm run move-iconfontMap```、 linux 执行 ```npm run mv-iconfontMap```

#### 2、svgToJs 将 svg 转为 js
1. 将 .svg 文件放入 src/public/svg 文件夹中
2. 执行 ```npm run svg-to-xml```