import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Immersive } from 'react-native-immersive';
import {
  DeviceEventEmitter,
  StatusBar,
  NetInfo,
  View,
  Text,
  Alert,
} from 'react-native';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import SplashScreen from 'react-native-splash-screen';
// import Theme from './config/theme';
import CodePush from 'react-native-code-push';
import Language from './config/language';
import ApiBase from './config/apiBase';
import { InitialConfog, ChangeHotUpdateStatus } from './actions/config';
import * as listener from './constants/listener';
import Logger from './utils/logger';
// import Logger from './utils/logger';

@connect(
  state => ({
    // theme: state.config.theme,
    language: state.config.language,
  }),
  dispatch => ({
    doInitialConfog: bindActionCreators(InitialConfog, dispatch),
    onChangeHotUpdateStatus: bindActionCreators(ChangeHotUpdateStatus, dispatch),
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
    Logger.appendFile('consoleLog.txt',
      Logger.formatConsole('更新状态码', '间隔符'));
    // 全屏
    if (Android) {
      Immersive.addImmersiveListener(this.restoreImmersive);
    }

    // 热更新
    this.hot();

    // 初始化 主题、语言等配置
    await this.initialConfig();

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

    // 删除日志networkLog.text，codeErrorLog.text
    // await Logger
    //   .callChaining('deleteFile', 'networkLog.txt') // 删除网络日志
    //   .callChaining('deleteFile', 'codeErrorLog.txt'); // 删除bug日志
  }

  componentWillUnmount() {
    if (Android) {
      Immersive.removeImmersiveListener(this.restoreImmersive);
    }
  }

  hot = () => {
    // 正式包才执行以下代码
    if (!__DEV__) {
      // 热更新
      const updateContent = `
        升级
      `;

      CodePush.sync(
        {
          // 启动模式三种：ON_NEXT_RESUME、ON_NEXT_RESTART、IMMEDIATE
          installMode: CodePush.InstallMode.IMMEDIATE,
          // 应用程序进程启动时检查更新。
          checkFrequency: CodePush.CheckFrequency.ON_APP_START,
          // 苹果公司和中国区安卓的热更新，是不允许弹窗提示的，所以不能设置为true
          updateDialog: {
            appendReleaseDescription: true,
            descriptionPrefix: updateContent,
            title: '版本升级',
            mandatoryUpdateMessage: '这是什么', // 用作更新通知正文的文本
            mandatoryContinueButtonLabel: '更新', // 用于最终用户必须按下的按钮的文本，以便安装强制更新
            // 在非强制更新下的弹窗文本提示
            optionalInstallButtonLabel: '立即更新',
            optionalIgnoreButtonLabel: '忽略更新',
          },
        },
        this.syncStatusChangedCallback,
        this.downloadProgressCallback,
        // this.handleBinaryVersionMismatchCallback
      );

      // const { checkForUpdate } = CodePush;
      // checkForUpdate()
      //   .then((update) => {
      //     if (!update) {
      //       Alert.alert('当前已是最新版本');
      //     } else {
      //       Alert.alert('下载更新');
      //     }
      //   });
    } else {
      // 如果是开发模式直接将正在热更新状态改为false
      const { onChangeHotUpdateStatus } = this.props;
      onChangeHotUpdateStatus(false);
    }
  }

  syncStatusChangedCallback = (syncStatus) => {
    /**
     * syncStatus 取值
     * 0. 应用程序与配置的部署完全一致
     * 1. 已安装可用更新，将在syncStatusChangedCallback函数返回后立即运行，或者在下次应用程序恢复/重新启动时运行，具体取决于InstallMode指定的内容SyncOptions。
     * 2. 应用程序有一个可选的更新，最终用户选择忽略。（仅在updateDialog使用时适用）
     * 3. 同步操作遇到未知错误。
     * 4. 正在sync运行的正在进行的操作阻止当前调用被执行
     * 5. 正在查询CodePush服务器以进行更新
     * 6. 提供更新，并向最终用户显示确认对话框。（仅在updateDialog使用时适用）
     * 7. 正在从CodePush服务器下载可用更新。
     * 8. 已下载可用更新，即将安装。
     *
     * 更新取消流程：6 5 更新提示框 2
     * 更新确定流程：6 5 更新提示框 7 8 1（会重启然后执行 0 5）
     */
    // console.log(syncStatus);

    const { onChangeHotUpdateStatus } = this.props;

    if (syncStatus === 2 || syncStatus === 0) {
      onChangeHotUpdateStatus(false);
    }

    Logger.appendFile('consoleLog.txt',
      Logger.formatConsole('更新状态码', syncStatus));

    // Alert.alert(`syncStatus: ${syncStatus}`);
    // if (syncStatus === 7) {
    //   CodePush.restartApp();
    // }
  }

  downloadProgressCallback = (progress) => {
    Logger.appendFile('consoleLog.txt',
      Logger.formatConsole('更新进度', progress));
  }

  // handleBinaryVersionMismatchCallback = (update: RemotePackage) => {}

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
  onChangeHotUpdateStatus: () => {},
  // theme: {
  //   brandPrimary: 'transparent',
  // },
};

Setup.propTypes = {
  doInitialConfog: PropTypes.func,
  // theme: PropTypes.object,
  children: PropTypes.element.isRequired,
  onChangeHotUpdateStatus: PropTypes.func,
};
