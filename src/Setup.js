import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Immersive } from 'react-native-immersive';
import {
  StatusBar,
} from 'react-native';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import SplashScreen from 'react-native-splash-screen';
// import Theme from './config/theme';
import Language from './config/language';
import { InitialConfog } from './actions/config';

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

    // 关闭启动页
    SplashScreen.hide();
  }

  componentWillUnmount() {
    if (Android) {
      Immersive.removeImmersiveListener(this.restoreImmersive);
    }
  }

  initialConfig = () => {
    const { doInitialConfog } = this.props;
    return (
      Promise.all([
        // this.initialTheme(),
        this.initialLanguage(),
      ])
        .then((arr) => {
          // theme,
          const [language] = arr;
          doInitialConfog({ language });
        })
        .catch(e => console.log('初始化配置失败：', e))
    );
  }

  // initialTheme = () => this.theme.getTheme().then(res => res)

  initialLanguage = () => this.language.getLanguage().then(res => res)

  render() {
    const {
      children,
      // theme: {
      //   brandPrimary,
      // },
    } = this.props;
    return (
      <Fragment>
        <StatusBar
          hidden
          // backgroundColor={brandPrimary}
          // animated
        />
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
