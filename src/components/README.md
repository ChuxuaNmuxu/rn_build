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

###### 注意：若需新添icon，需要将iconfont.ttf文件放置在src/public/icon/下并执行 win： ```npm run move-iconfontMap```、 linux：```npm run mv-iconfontMap```
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

### RefreshListView：基于FlatList封装的上拉加载/下拉刷新组件

###### 注意：它是基于FlatList封装的组件，继承了FlatList的所有方法和属性，其中下拉刷新也是基于react native自带的RefreshControl进行封装的

 - ``` RefreshHeader ``` 是下拉刷新时展示的头部组件，``` RefreshFooter ``` 是上拉加载的尾部组件，均在 ``` RefreshListView ``` 组件中引入了，若要修改图标或样式可自行去对应组件中设置更改
1. 使用方法
 - 引入该组件 ``` import RefreshListView from 'xxx/components/RefreshListView'; ```
 - 引入封装的几种状态，状态统一放在此文件下，方便调用和管理 ``` import RefreshState from 'xxx/components/RefreshListView/RefreshState'; ```
2. 方法和状态讲解
 - RefreshState.js文件用于统一放置各状态，主要是以下几种，可自行添加修改

 ```
    Idle: 'Idle', // 初始状态，无刷新/无加载的情况
    CanLoadMore: 'CanLoadMore', // 可以加载更多，表示列表还有数据可以继续加载
    Refreshing: 'Refreshing', // 正在刷新中/正在加载
    NoMoreData: 'NoMoreData', // 加载完成，没有更多数据了
    Failure: 'Failure', // 刷新失败/加载失败
    RefreshSuccess: 'RefreshSuccess', // 刷新成功

 ```
 - 主要方法
    > *  ``` onHeaderRefresh  ```  下拉刷新执行的方法，刷新成功或者失败时在里面直接调用停止刷新的方法 ``` endHeaderRefreshing ```，调用方式：
    ```
    // RefreshState.RefreshSuccess 传入此时要展示的状态
    this.RefreshListView.endHeaderRefreshing(RefreshState.RefreshSuccess);

    ```

    > * ``` onFooterRefresh ``` 上拉加载执行的方法，加载成功或者失败时直接在里面调用停止加载的方法 ``` endRefreshing ```，调用方式：
    ```
    // RefreshState.NoMoreData 传入此时要展示的状态
    this.RefreshListView.endRefreshing(RefreshState.NoMoreData);

    ``` 

 - 使用范例 
```
         _keyExtractor = (item, index) => item.id;

        // 渲染子组件
        _renderItem = ({ item, index }) => <Text>{item.key}</Text>;

        // 渲染一个空白页，当列表无数据的时候显示。这里简单写成一个View控件

        _renderEmptyView = item => <View />;

        // 上拉加载更多
        loadMoreFun = () => {
            // 请求数据，这里用延时器来改变状态
            setTimeout(() => {
            this.listView.endRefreshing(RefreshState.NoMoreData);
            }, 2000);
        }

        // 下拉刷新
        RefreshListFunc = () => {
            // 请求数据，这里用延时器来改变状态
            setTimeout(() => {
            this.listView.endHeaderRefreshing(RefreshState.Failure);
            }, 2000);
        }

        render() {
            // dataList请求到的列表数据
            const { dataList } = this.props;
            return (
            <RefreshListView
                ref={(ref) => { this.listView = ref; }}
                data={dataList}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                ListEmptyComponent={this._renderEmptyView}
                onHeaderRefresh={() => this.RefreshListFunc()}
                onFooterRefresh={() => this.loadMoreFun()}
            />
            );
        }
        }
```
