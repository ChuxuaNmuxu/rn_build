// 学生个人信息页面
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/personalInformationAction';
import styles from './PersonalInformation.scss';
import I18nText from '../../../components/I18nText';
import Nav from '../../../components/Nav';

class PersonalInformation extends Component {
  componentDidMount() {
    const { schoolId } = this.props;
    // 请求数据
    const { actions: { fetchPersonalInfoAction } } = this.props;
    fetchPersonalInfoAction({ schoolId }, 'REQUEST');
  }

  render() {
    const { data, realName } = this.props;
    return (
      <View style={styles.personalInfo_container}>
        <Nav goBackFun={() => { Actions.My(); }}>
          <I18nText>PersonalInformation.title</I18nText>
        </Nav>
        <View style={styles.personalInfo_items}>
          <View style={styles.items}>
            <I18nText style={styles.item_text}>PersonalInformation.studentName</I18nText>
            <Text style={styles.item_style}>{realName}</Text>
          </View>
          <View style={styles.items}>
            <I18nText style={styles.item_text}>PersonalInformation.school</I18nText>
            <Text style={styles.item_style}>{data.schoolName}</Text>
          </View>
          <View style={styles.items}>
            <I18nText style={styles.item_text}>PersonalInformation.grade</I18nText>
            <Text style={styles.item_style}>七年级</Text>
          </View>
          <View style={styles.borderSpace} />
          <View style={styles.items}>
            <I18nText style={styles.item_text}>PersonalInformation.class</I18nText>
            <Text style={styles.item_style}>一班</Text>
          </View>
        </View>
      </View>
    );
  }
}

PersonalInformation.propTypes = {
  data: PropTypes.object.isRequired,
  schoolId: PropTypes.string.isRequired,
  realName: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { data } = state.personalInformationReducer;
  const { userInfo: { schoolId, realName } } = state.account;
  return {
    data,
    schoolId: schoolId[0],
    realName,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);
