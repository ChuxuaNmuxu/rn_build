import React from 'react';
import { token } from '../../constants/stroage';

class Welcome extends React.Component {
  componentWillMount() {
    this.getToken();
  }

  getToken = () => {
    storage.load({
      key: token,
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        extraFetchOptions: {
          // 各种参数
        },
        someFlag: true,
      },
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
    }).catch((err) => {
      console.warn('err:', err.message);
      Actions.login();
    });
  }


  render() {
    return null;
  }
}

export default Welcome;
