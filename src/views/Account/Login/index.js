import React, { Component, Fragment } from 'react';
import md5 from 'md5';
// import {
//   Actions,
// } from 'react-native-router-flux';
import {
  Button,
  Text,
  View,
  List,
  InputItem,
} from 'antd-mobile-rn';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CIcon from '../../../components/Icon';
import styles from './styles.scss';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      fetchData: {},
      password: '',
      username: '',
    };
  }


  componentDidMount() {
    storage.save({
      key: 'loginState',
      data: {
        from: 'some other site',
        userid: 'some userid',
        token: 'some token',
      },
      expires: 1000 * 3600,
    });

    // 读取
    storage.load({
      key: 'loginState',
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        extraFetchOptions: {
          // 各种参数
        },
        someFlag: true,
      },
    }).then((ret) => {
      this.setState({ user: ret });
      const {
        user,
      } = this.state;
      console.log(user);
    }).catch((err) => {
      console.warn(err.message);
    });
  }


  getUserInfo = () => {
    Fetch.get('https://test-cjyun-api.ecaicn.com/user/personalInfo', { credentials: 'omit' })
      .then((responseJson) => {
        console.log('getUserInfo', responseJson);
        this.setState({
          fetchData: responseJson,
        });
      });
  }

  login = () => {
    Fetch.post('https://test-cjyun-api.ecaicn.com/unlogin/login', {
      userName: 'sys_admin',
      password: md5('123456'),
    })
      .then((res) => {
        console.log(res);
        this.setState({
          fetchData: res,
        });
      });
  }

  logout = () => {
    fetch('https://test-cjyun-api.ecaicn.com/unlogin/logout.cbp', {
      method: 'POST',
      credentials: 'omit',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((res) => {
        console.log(res); this.setState({
          fetchData: res,
        });
      });
  }


  render() {
    const {
      fetchData,
    } = this.state;
    return (
      <Fragment>
        <View style={styles.navbar}>
          <Button onClick={this.login}>
            登陆
            <CIcon name="bofang" size={25} />
          </Button>
          <Button onClick={this.getUserInfo}>
            获取个人信息
            <Icon name="ios-settings" size={45} color="red" />
          </Button>
          <Button onClick={this.logout}>
            退出
            <FontAwesome name="search" size={30} />
          </Button>
        </View>

        <Text>
          {
            JSON.stringify(fetchData)
          }
        </Text>
      </Fragment>
    );
  }
}
