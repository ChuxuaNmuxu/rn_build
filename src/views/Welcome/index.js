import React from 'react';
import { token } from '../../constants/stroage';

class Welcome extends React.Component {
  componentDidMount() {
    this.getToken();
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
            Actions.Student();
            break;
          case 'TEACHER':
            Actions.Teacher();
            break;
          default:
            console.log('当前帐号不属于学生或教师', currentSchoolRole);
        }
      }
    }).catch(() => {
      Actions.Login();
    });
  }


  render() {
    return null;
  }
}

export default Welcome;
