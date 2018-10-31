import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import Account from '../../utils/account';
import { SetUserInfo } from '../../actions/account';
import tokenKey from '../../constants/stroage';

@connect(null, dispatch => ({
  onSetUserInfo: bindActionCreators(SetUserInfo, dispatch),
}))
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.account = new Account();
  }

  componentDidMount() {
    this.getToken();
    console.log('welcome mount');
  }

  componentWillUnmount() {
    console.log('welcome Unmount');
  }

  getToken = () => {
    this.account.getAccount(tokenKey)
      .then((ret) => {
        const tokenData = ret.token;
        const {
          userinfo,
        } = ret;

        const { onSetUserInfo } = this.props;
        onSetUserInfo(userinfo);
        if (tokenData) {
          const {
            currentSchoolRole,
          } = JSON.parse(userinfo);
          switch (currentSchoolRole) {
            case 'STUDENT':
              Actions.reset('Student');
              break;
            case 'TEACHER':
              Actions.reset('Teacher');
              break;
            default:
              console.log('当前帐号不属于学生或教师', currentSchoolRole);
          }
        }
      }).catch(() => {
        console.log('哈哈哈');
        Actions.reset('Account');
      });
  }

  render() {
    return <Text>dfdfd</Text>;
  }
}

Welcome.propTypes = {
  onSetUserInfo: PropTypes.func,
};

Welcome.defaultProps = {
  onSetUserInfo: () => {},
};

export default Welcome;
