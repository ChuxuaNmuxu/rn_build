# 组件使用
### Icon:
* 引入方法：

1. import Icon from 'react-native-vector-icons/Ionicons';
 - 使用 react-native-vector-icons 提供的默认图标
2. import FontAwesome from 'react-native-vector-icons/FontAwesome';
 - 使用 react-native-vector-icons 提供的第三方图标
3. import CIcon from '../../../components/Icon';
 - 使用用户自定义图标

* 使用方法：
 - ``` <Icon name="rocket" size={30} color="#900" /> ```
 - ```<CIcon name="wendang1" size={25} color="#900" /> ```

###### 注意：若需新添icon，需要将iconfont.ttf文件放置在src/public/icon/下并执行 win： ```npm run iconfontMap-win```、 linux：```iconfontMap-linux```
---

### Resolution
* 用于适配不同分辨的设备 [参考文档](https://www.jianshu.com/p/7836523b4d20)
 - 使用 Resolution.FixWidthView 宽度固定，高度自适应
 - 使用 Resolution.FixWidthView 高度固定，高度自适应

---

### Svg
* 为了减少svg图片请求次数将svg转为xml
 - 使用方法： 
 ```<SvgUri height="40" width="40" source="examBook" fill="#fff" style={xxx} />```

###### 注意：1、若需新添svg图片，需要将svg图片放置在src/public/svg下并执行 npm run svg-to-js  2、如果 react-native-svg-uri 库有兼容问题，请使用自己封装的svg组件 [参考文档](https://www.jianshu.com/p/7db2bc62c5ed)

---

### TabBarIcon
* 用于 react-native-router-flux 的 tabs，自定义底部tab样式。
 - 若给tabs设icon={TabBarIcon}则Stack可传image与selectedImage
 - 若给Stack设icon={TabBarIcon}则Scene可传image与selectedImage

    > * image icon默认样式
    > * selectedImage icon选中样式

---

