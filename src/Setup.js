import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Immersive } from 'react-native-immersive';
import {
  DeviceEventEmitter,
  StatusBar,
  NetInfo,
  View,
  Text,
} from 'react-native';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import SplashScreen from 'react-native-splash-screen';
// import Theme from './config/theme';
import Language from './config/language';
import ApiBase from './config/apiBase';
import { InitialConfog } from './actions/config';
import * as listener from './constants/listener';
import Logger from './utils/logger';

@connect(
  state => ({
    // theme: state.config.theme,
    language: state.config.language,
  }),
  dispatch => ({
    doInitialConfog: bindActionCreators(InitialConfog, dispatch),
  }),
)
export default class Setup extends Component {
  constructor(props) {
    super(props);
    // this.theme = new Theme();
    this.language = new Language();
    this.apiBase = new ApiBase();

    this.state = {
      isConnected: true,
    };

    // 全屏组件，只支持Android
    if (Android) {
      this.restoreImmersive = () => {
        Immersive.on();
        Immersive.setImmersive(true);
      };
    }
  }

  async componentDidMount() {
    // 全屏
    if (Android) {
      Immersive.addImmersiveListener(this.restoreImmersive);
    }


    // 初始化 主题、语言等配置
    await this.initialConfig();

    // 删除日志networkLog.text，codeErrorLog.text
    await Logger.callChaining('deleteFile', 'networkLog.txt').callChaining('deleteFile', 'codeErrorLog.txt');

    // 关闭启动页
    SplashScreen.hide();

    // 监听设备是否有网络
    NetInfo.isConnected.addEventListener('connectionChange', this.listenerNetwork);

    // 获取当前设备是否有网络
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({
        isConnected,
      });
    });
  }

  componentWillUnmount() {
    if (Android) {
      Immersive.removeImmersiveListener(this.restoreImmersive);
    }
  }

  listenerNetwork = (isConnected) => {
    this.setState({
      isConnected,
    });
    DeviceEventEmitter.emit(listener.netConnected, isConnected);
  }


  initialConfig = () => {
    const { doInitialConfog } = this.props;
    return (
      Promise.all([
        // this.initialTheme(),
        this.initialLanguage(),
        this.initialApiFlag(),
      ])
        .then((arr) => {
          // theme,
          const [language, apiFlag] = arr;
          doInitialConfog({ language, apiFlag });
        })
        .catch(e => console.log('初始化配置失败：', e))
    );
  }

  // initialTheme = () => this.theme.getTheme().then(res => res)

  initialLanguage = () => this.language.getLanguage().then(res => res)

  initialApiFlag = () => this.apiBase.getApiBase().then(res => res)

  render() {
    const {
      children,
      // theme: {
      //   brandPrimary,
      // },
    } = this.props;
    const { isConnected } = this.state;
    return (
      <Fragment>
        <StatusBar
          hidden
          // backgroundColor={brandPrimary}
          // animated
        />
        {
          !isConnected
            ? (
              <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <Text style={{ fontSize: 24, lineHeight: 30 }}>当前设备处于离线状态，请检查网络</Text>
              </View>
            )
            : null
        }
        {children}
      </Fragment>
    );
  }
}

Setup.defaultProps = {
  doInitialConfog: () => {},
  // theme: {
  //   brandPrimary: 'transparent',
  // },
};

Setup.propTypes = {
  doInitialConfog: PropTypes.func,
  // theme: PropTypes.object,
  children: PropTypes.element.isRequired,
};
