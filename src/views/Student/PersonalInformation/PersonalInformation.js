// 学生个人信息页面
import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import styles from './PersonalInformation.scss';
import I18nText from '../../../components/I18nText';
import Header from './Component';

class PersonalInformation extends Component {
  render() {
    return (
      <View style={styles.personalInfo_container}>
        <Header goBackFun={() => { Actions.My(); }}>
          <I18nText>PersonalInformation.title</I18nText>
        </Header>
        <View style={styles.personalInfo_items}>
          <View style={styles.items}>
            <I18nText style={styles.item_text}>PersonalInformation.studentName</I18nText>
            <Text style={styles.item_style}>李木子</Text>
          </View>
          <View style={styles.items}>
            <I18nText style={styles.item_text}>PersonalInformation.school</I18nText>
            <Text style={styles.item_style}>深圳市XX中学</Text>
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

export default PersonalInformation;
