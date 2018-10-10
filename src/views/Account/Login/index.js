import React, { Component, Fragment } from 'react';
import md5 from 'md5';
import {
  Button,
  Text,
  View,
  List,
  InputItem,
} from 'antd-mobile-rn';
import { token } from '../../../constants/stroage';

export default class Login extends Component {
  constructor(props) {
    super(props);
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
    console.log(res);
    return storage.save({
      key: token,
      data: {
        token: tokenData,
        userinfo: JSON.stringify(userInfo),
      },
      expires: null,
    });
  }

  login = () => {
    const {
      username,
      password,
    } = this.state;

    Fetch.post('https://dev-cjyun-api.ecaicn.com/unlogin/login', {
      userName: username,
      password: md5(password),
    })
      .then((res) => {
        const {
          data,
        } = res;
        console.log('data', res);
        const {
          userInfo: {
            currentSchoolRole,
          },
        } = data;
        /**
         * 根据账号类型进行相应处理，课业只能使用学生或者教师账号登陆。
         * 保存成功之后才进行相应跳转，否则提示重新登陆
         */
        switch (currentSchoolRole) {
          case 'STUDENT':
            this.savaToken(data).then(() => {
              Actions.Student();
            });
            break;
          case 'TEACHER':
            console.log('暂时只支持学生账号登陆');
            break;
          default:
            console.log('请使用学生或老师账号登陆');
        }
      }).catch(err => console.log(77, err));
  }

  clearToken = () => {
    storage.remove({
      key: token,
    });
  }

  render() {
    return (
      <Fragment>
        <View>
          <List>
            <List.Item>
              <Text>
                登陆
              </Text>
            </List.Item>
            <InputItem
              placeholder="请输入账号"
              onChange={(value) => {
                this.setState({
                  username: value,
                });
              }}
            >
            账号：
            </InputItem>
            <InputItem
              placeholder="请输入密码"
              onChange={(value) => {
                this.setState({
                  password: value,
                });
              }}
            >
            密码：
            </InputItem>
            <List.Item>
              <Button
                onClick={this.login}
                type="primary"
              >
              登陆
              </Button>
            </List.Item>
          </List>
        </View>
      </Fragment>
    );
  }
}
