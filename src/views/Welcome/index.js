import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
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

Welcome.propTypes = {
  onSetUserInfo: PropTypes.func,
};

Welcome.defaultProps = {
  onSetUserInfo: () => {},
};

export default Welcome;
