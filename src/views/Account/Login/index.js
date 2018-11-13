import React, { Component } from 'react';
import md5 from 'md5';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Toast,
} from 'antd-mobile-rn';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Account from '../../../utils/account';
import Madal from '../../../components/Modal';
import { SetUserInfo } from '../../../actions/account';
import fetchApi from '../../../config/apiBase/fetchApi';
import Debug from '../../../components/Debug';
import styles from './styles.scss';

@connect(({ config: { apiFlag } }) => ({
  apiFlag,
}), dispatch => ({
  onSetUserInfo: bindActionCreators(SetUserInfo, dispatch),
}))
class Login extends Component {
  constructor(props) {
    super(props);
    this.account = new Account();
    this.state = {
      password: '',
      username: '',
    };
  }

  savaToken = (res) => {
    const tokenData = res.token;
    const {
      userInfo,
    } = res;

    return this.account.setAccount({
      token: tokenData,
      userinfo: JSON.stringify(userInfo),
    });
  }

  login = () => {
    const {
      username,
      password,
    } = this.state;
    const { apiFlag } = this.props;

    Fetch.post(`${fetchApi(fetchApi.cjyun, apiFlag)}/unlogin/login`, {
      userName: username,
      password: md5(password),
    })
      .then((res) => {
        const {
          data,
          code,
          message,
        } = res;

        if (code === 0) {
          const {
            userInfo: {
              currentSchoolRole,
            },
          } = data;
          const { onSetUserInfo } = this.props;
          onSetUserInfo(JSON.stringify(data.userInfo));

          /**
           * 根据账号类型进行相应处理，课业只能使用学生或者教师账号登陆。
           * 保存成功之后才进行相应跳转，否则提示重新登陆
           */
          switch (currentSchoolRole) {
            case 'STUDENT':
              this.savaToken(data).then(() => {
                Toast.success('登陆成功');
                Actions.reset('Student');
              });
              break;
            case 'TEACHER':
              Toast.info('暂时只支持学生账号登陆');
              break;
            default:
              Toast.info('请使用学生或老师账号登陆');
          }
        } else {
          Toast.fail(message);
        }
      }).catch(err => console.log(77, err));
  }

  render() {
    return (
      <View style={styles.wrap}>
        <Madal />
        <View style={styles.box}>
          {
            !__DEV__ && (
              <View style={{ alignItems: 'center', marginBottom: 15 }}>
                <Text style={{ fontSize: 22, color: 'red' }}>V1.0.0(build 11.13-2.am)</Text>
              </View>
            )
          }
          <Debug>
            <Text style={styles.title}>用户登陆</Text>
          </Debug>
          <View style={styles.item}>
            <Text style={styles.label}>账号：</Text>
            <TextInput
              style={styles.text_input}
              onChangeText={(value) => {
                this.setState({
                  username: value,
                });
              }}
              autoFocus
              placeholder="请输入账号"
              placeholderTextColor="#999999"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>密码：</Text>
            <TextInput
              style={styles.text_input}
              onChangeText={(value) => {
                this.setState({
                  password: value,
                });
              }}
              placeholder="请输入密码"
              placeholderTextColor="#999999"
              underlineColorAndroid="transparent"
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            onPress={this.login}
            style={styles.login}
          >
            <Text style={styles.login_text}>登陆</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}
Login.propTypes = {
  onSetUserInfo: PropTypes.func,
  apiFlag: PropTypes.string,
};

Login.defaultProps = {
  onSetUserInfo: () => {},
  apiFlag: '',
};

export default Login;
