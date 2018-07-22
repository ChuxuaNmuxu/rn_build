import React from 'react';
import { Text } from 'react-native';
import { token } from '../../constants/stroage';

class Welcome extends React.Component {
  componentWillMount() {
    this.getToken();
  }

  getToken = () => {
    // storage.load({
    //   key: token,
    //   autoSync: false,
    //   syncInBackground: true,
    //   syncParams: {
    //     extraFetchOptions: {
    //       // 各种参数
    //     },
    //     someFlag: true,
    //   },
    // }).then((ret) => {
    //   const tokenData = ret.token;
    //   const {
    //     userinfo,
    //   } = ret;
    //   if (tokenData) {
    //     const {
    //       currentSchoolRole,
    //     } = JSON.parse(userinfo);
    //     switch (currentSchoolRole) {
    //       case 'STUDENT':
    //         Actions.student();
    //         break;
    //       case 'TEACHER':
    //         Actions.teacher();
    //         break;
    //       default:
    //         console.log('当前帐号不属于学生或教师', currentSchoolRole);
    //     }
    //   }
    // }).catch(() => {
    //   Actions.login();
    // });


    storage.Load({
      key: token,
    }).then((ret) => {
      const tokenData = ret.token;
      const {
        userinfo,
      } = ret;
      if (tokenData) {
        const {
          currentSchoolRole,
        } = JSON.parse(userinfo);
        switch (currentSchoolRole) {
          case 'STUDENT':
            Actions.student();
            break;
          case 'TEACHER':
            Actions.teacher();
            break;
          default:
            console.log('当前帐号不属于学生或教师', currentSchoolRole);
        }
      }
    }).catch(() => {
      Actions.login();
    });
  }


  render() {
    return (
      <Text>
      fdfdsfds
      </Text>
    );
  }
}

export default Welcome;
