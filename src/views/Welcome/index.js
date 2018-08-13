import React from 'react';
import { Immersive } from 'react-native-immersive';
import { token } from '../../constants/stroage';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    // 全屏组件，只支持Android
    if (Android) {
      this.restoreImmersive = () => {
        Immersive.on();
        Immersive.setImmersive(true);
      };
    }
  }

  componentDidMount() {
    if (Android) {
      Immersive.addImmersiveListener(this.restoreImmersive);
    }
    this.getToken();
  }

  componentWillUnmount() {
    if (Android) {
      Immersive.removeImmersiveListener(this.restoreImmersive);
    }
  }

  getToken = () => {
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
      // Actions.login();
      Actions.student();
    });
  }


  render() {
    return null;
  }
}

export default Welcome;
