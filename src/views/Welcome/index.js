import React from 'react';

class Welcome extends React.Component {
  componentWillMount() {
    this.getToken();
  }

  getToken = () => {
    storage.load({
      key: 'token',
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        extraFetchOptions: {
          // 各种参数
        },
        someFlag: true,
      },
    }).then((ret) => {
      if (ret) {
        console.log('获取到了');
        Actions.myHomework();
      } else {
        Actions.login();
        console.log('没获取到');
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
