import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, TouchableWithoutFeedback,
} from 'react-native';
import { Toast } from 'antd-mobile-rn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Madal, { ModalApi } from '../Modal';
import Radio from '../Radio';
import fetchApi from '../../config/apiBase/fetchApi';
import ApiBase from '../../config/apiBase';
import { SetApiFlag } from '../../actions/config';
import { SetUserInfo } from '../../actions/account';
import Account from '../../utils/account';
import styles from './style.scss';

const GroupRadio = Radio.Group;
@connect(({
  config: { apiFlag },
  account: { userInfo },
}) => ({
  apiFlag,
  userInfo,
}), dispatch => ({
  onSetApiFlag: bindActionCreators(SetApiFlag, dispatch),
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

  onPress = () => {
    console.log('debug');
    const { userInfo } = this.props;
    const data = {
      content: this.content(),
      footButton: false,
      maskClosable: true,
      style: userInfo ? styles.modal_logout : styles.modal,
    };
    ModalApi.onOppen('ButtomModal', data);
  }

  onChange = (data) => {
    const { onSetApiFlag } = this.props;
    this.apiBase.setApiBase(data)
      .then(() => {
        ModalApi.onClose();
        onSetApiFlag(data);
      });
  }

  logout = () => {
    ModalApi.onClose();
    const { apiFlag, onSetUserInfo } = this.props;
    Fetch.post(`${fetchApi(fetchApi.cjyun, apiFlag)}/unlogin/logout.cbp`)
      .then(() => {
        onSetUserInfo();
        return this.account.removeAccount();
      }).then(() => {
        Toast.success('退出成功');
        Actions.Login();
      });
  }

  content = () => {
    const { apiFlag, userInfo } = this.props;
    console.log(81, userInfo);
    return (
      <View style={styles.debug_wrap}>
        <Text style={styles.debug_menu}>调试菜单</Text>
        <Text style={styles.user}>当前用户：{userInfo ? userInfo.userName : '未登录'}</Text>
        <Text style={styles.select_server}>请选择环境:</Text>
        <GroupRadio
          options={this.options}
          value={apiFlag}
          onChange={this.onChange}
          childStyle={styles.radio}
        />
        {
          userInfo
            ? (
              <TouchableOpacity
                style={styles.logout}
                onPress={this.logout}
              >
                <Text style={styles.logout_text}>退出登陆</Text>
              </TouchableOpacity>
            )
            : null
          }
      </View>
    );
  }

  render() {
    const { children } = this.props;
    console.log(111111, children);
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View>
          <Madal />
          {children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Debug.propTypes = {
  apiFlag: PropTypes.string,
  onSetApiFlag: PropTypes.func,
  onSetUserInfo: PropTypes.func,
  userInfo: PropTypes.string,
  children: PropTypes.element,
};

Debug.defaultProps = {
  apiFlag: '',
  onSetApiFlag: () => {},
  onSetUserInfo: () => {},
  userInfo: '',
  children: null,
};

export default Debug;
