import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, TouchableWithoutFeedback, BackHandler,
} from 'react-native';
import { Toast } from 'antd-mobile-rn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { ModalApi } from '../Modal';
import Radio from '../Radio';
import fetchApi from '../../config/apiBase/fetchApi';
import ApiBase from '../../config/apiBase';
import { ChangeApiFlag } from '../../actions/config';
import { SetUserInfo } from '../../actions/account';
import Account from '../../config/account';
import styles from './style.scss';

const GroupRadio = Radio.Group;
@connect(({
  config: { apiFlag },
  account: { userInfo: { userName } },
}) => ({
  apiFlag,
  userName,
}), dispatch => ({
  onChangeApiFlag: bindActionCreators(ChangeApiFlag, dispatch),
  onSetUserInfo: bindActionCreators(SetUserInfo, dispatch),
}))
class Debug extends Component {
  constructor(props) {
    super(props);
    this.options = [];
    this.apiBase = new ApiBase();
    this.account = new Account();
    const labels = fetchApi.label;

    for (const key in labels) {
      this.options.push({
        value: key,
        label: labels[key],
      });
    }
  }

  // 打开调试窗口
  onPress = () => {
    const { userName } = this.props;
    const data = {
      content: this.content(),
      footButton: false,
      maskClosable: true,
      style: userName ? styles.modal_logout : styles.modal,
    };
    ModalApi.onOppen('ButtomModal', data);
  }

  // 切换环境：更改缓存、store数据，关闭模态。如果当前处于登陆状态则退出登陆并跳到登陆界面
  onChange = (data) => {
    const { onChangeApiFlag, userName } = this.props;
    this.apiBase.setApiBase(data)
      .then(() => {
        ModalApi.onClose();
        onChangeApiFlag(data);
      })
      .then(() => {
        if (userName) {
          this.logout('切换环境成功').then(Actions.reset('Account'));
        }
      });
  }

  // 退出登陆：删除缓存
  logout = (mes) => {
    ModalApi.onClose();
    const { apiFlag, onSetUserInfo } = this.props;
    return Fetch.post(`${fetchApi(fetchApi.cjyun, apiFlag)}/unlogin/logout.cbp`)
      .then(() => {
        onSetUserInfo();
        return this.account.removeAccount();
      }).then(() => {
        Toast.success(mes);
      });
  }

  content = () => {
    const { apiFlag, userName } = this.props;
    console.log(87, userName);
    return (
      <View style={styles.debug_wrap}>
        <Text style={styles.debug_menu}>调试菜单</Text>
        <Text style={styles.user}>当前用户：{userName || '未登录'}</Text>
        <Text style={styles.select_server}>请选择环境:</Text>
        <GroupRadio
          options={this.options}
          value={apiFlag}
          onChange={this.onChange}
          childStyle={styles.radio}
          style={styles.group_radio}
        />
        {
          userName
            ? (
              <TouchableOpacity
                style={styles.logout}
                onPress={() => { this.logout('退出成功').then(Actions.reset('Account')); }}
              >
                <Text style={styles.logout_text}>退出登陆</Text>
              </TouchableOpacity>
            )
            : null
          }
        <TouchableOpacity
          style={styles.close_soft}
          onPress={BackHandler.exitApp}
        >
          <Text style={styles.logout_text}>关闭软件</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { children } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View>
          {children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Debug.propTypes = {
  apiFlag: PropTypes.string,
  onChangeApiFlag: PropTypes.func,
  onSetUserInfo: PropTypes.func,
  userName: PropTypes.string,
  children: PropTypes.element,
};

Debug.defaultProps = {
  apiFlag: '',
  onChangeApiFlag: () => {},
  onSetUserInfo: () => {},
  userName: '',
  children: null,
};

export default Debug;
