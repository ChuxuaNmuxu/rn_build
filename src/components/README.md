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

### I18nText 国际化
1. 使用方法1使用封装的 I18nText
 - 引入 import I18nText from 'xxx/components/I18nText';
 - 使用 ```<I18nText style={styles.title} option={{ count: 10 }}>home.header.title</I18nText>```
    - style：样式
    - option：{ placeholder , defaultValue , defaults , locale , ... } 
        - placeholder：变量，与翻译文件中的变量名相同。变量只能用```{{}}```或者```%{}```包裹。
        ```
        home: {
                header: {
                    title: '待计划任务：{{count}}项',
                }
        }
        ```
        - 更多参数请查看[文档](https://github.com/fnando/i18n-js#setting-up)
    - children：定义好的翻译文件对象，比如：home.header.title

2. 使用方法2直接使用 react-native-i18n，引入初始化的 I18n 对象
 - 引入 import I18n from 'xxx/config/language/I18n';
 - 使用 ```<Text style={{styles.title}}>{I18n.t(home.header.title, {count: 10})}</Text>```


### 下拉刷新功能
##### 下拉刷新组件自己封装的不太好用，决定还是使用gitHub上的一个下拉刷新/上拉加载组件，目前可以暂时满足需求

###### 注意：虽然该插件库提供了PullView和PullList两个可以实现下拉刷新的组件，但是PullList是针对listView进行封装的，现在的react native版本已经没有这个标签了，固只能使用PullView组件，它是基于ScrollView封装的组件，且它支持refreshcontrol的相关属性，另外PullView的外层容器要加上 ``` flex:1 ``` 才不容易出问题
- ``` onRefresh ```: 开始刷新时调用的方法
- ``` refreshing ```:  指示是否正在刷新

1. 使用方法
 - 引入 ``` import { PullView } from 'react-native-pull'; ```
 - 使用例子 ```
        onPullRelease(resolve) {
            // 比如请求数据的操作，请求到之后执行resolve()即可
            setTimeout(() => {
                // 回到原始状态
                resolve();
            }, 3000);
        }
        topIndicatorRender(pulling, pullok, pullrelease) {
            // 在下拉到完成时，此方法是不停地调用的
            // 下拉：pulling=true,pullok=false,pullrelease=false
            // 到达临界点：pulling=false,pullok=true,pullrelease=false
            // 释放：pulling=false,pullok=false,pullrelease=true
        }
        topIndicatorRender = (pulling, pullok, pullrelease) => {
            return (
            <View style={{
                flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60,
            }}
            >
                <ActivityIndicator size="small" color="gray" />
                <Text>正在刷新</Text>
            </View>
            );
        }
        <PullView
            style={} 
            onPullRelease={this.onPullRelease}
            onPullOk={this.onPullOk}
            onPulling={this.onPulling}
            topIndicatorRender={this.topIndicatorRender}
        >
            需要被下拉刷新的盒子放这
        </PullView>

        ```
    - style：样式
    - onPulling （只要拉倒那个临界点，就会调用该方法）处于pulling状态时执行的方法
    - onPullOk （下拉时调用）处于pullok状态时执行的方法
    - onPullRelease （松开手指刷新调用的函数）处于pullrelease状态时执行的方法，接受一个参数：resolve，最后执行完操作后应该调用resolve()来回到原始状态，即刷新完毕隐藏loading
    - topIndicatorRender 顶部刷新指示组件的渲染方法, 接受4个参数: pulling, pullok, pullrelease，gesturePosition，你可以使用gesturePosition定义动画头部  
    - topIndicatorHeight 顶部刷新指示组件的高度, 若定义了topIndicatorRender则同时需要此属性，即临界点的高度
         - 更多参数请查看[文档](https://github.com/greatbsky/react-native-pull/wiki)      
