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
    // 请求数据
    const { actions: { fetchPersonalInfoAction } } = this.props;
    fetchPersonalInfoAction({}, 'REQUEST');
  }

  render() {
    const { data } = this.props;
    return (
      <View style={styles.personalInfo_container}>
        <Nav goBackFun={() => { Actions.My(); }}>
          <I18nText>PersonalInformation.title</I18nText>
        </Nav>
        <View style={styles.personalInfo_items}>
          <View style={styles.items}>
            <I18nText style={styles.item_text}>PersonalInformation.studentName</I18nText>
            <Text style={styles.item_style}>{data.studentName}</Text>
          </View>
          <View style={styles.items}>
            <I18nText style={styles.item_text}>PersonalInformation.school</I18nText>
            <Text style={styles.item_style}>{data.schoolName}</Text>
          </View>
          <View style={styles.items}>
            <I18nText style={styles.item_text}>PersonalInformation.grade</I18nText>
            <Text style={styles.item_style}>{data.gradeName}</Text>
          </View>
          <View style={styles.borderSpace} />
          <View style={styles.items}>
            <I18nText style={styles.item_text}>PersonalInformation.class</I18nText>
            <Text style={styles.item_style}>{data.className}</Text>
          </View>
        </View>
      </View>
    );
  }
}

PersonalInformation.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { data } = state.personalInformationReducer;
  return {
    data,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);
