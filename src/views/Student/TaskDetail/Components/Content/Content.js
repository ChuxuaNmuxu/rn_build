import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  DatePickerAndroid,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';
import I18nText from '../../../../../components/I18nText';
import styles from './Content.scss';

class Content extends Component {
  constructor(props) {
    super(props);
    const { beginTime, endTime } = props;
    this.state = {
      beginTime,
      endTime,
      // maxText: '选择日期,不能比今日再晚',
      // presetText: '选择日期,指定2016/3/5',
    };
    this.showPicker = this.showPicker.bind(this);
  }

  // 进行创建时间日期选择器
  async showPicker(options) {
    try {
      const newState = {};
      const {
        action, year, month, day,
      } = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        newState.beginTime = 'dismissed';
      } else {
        const date = new Date(year, month, day);
        newState.beginTime = date.toLocaleDateString();
        newState.date = date;
      }
      this.setState(newState, () => console.log(this.state));
    } catch ({ code, message }) {
      console.warn('Error', message);
    }
  }

  render() {
    const {
      waitReadOver, endTime, useTime, homeworkId,
    } = this.props;
    const { beginTime } = this.state;
    if (waitReadOver) {
      return (
        <View>
          <View style={styles.content_child}>
            <I18nText style={styles.content_child_left}>TaskDetail.endTime</I18nText>
            <Text style={styles.content_child_right}>{endTime}</Text>
          </View>
          <View style={[styles.content_child_btn]}>
            {/* 去批阅 */}
            <TouchableOpacity onPress={() => console.log('去批阅')}>
              <Text style={[styles.content_child_btn_normal, styles.content_child_btn_color]}>去批阅</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View>
        {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}> */}
        <View style={styles.content_child}>
          <I18nText style={styles.content_child_left}>TaskDetail.useTime</I18nText>
          <Text style={styles.content_child_right}>{useTime}</Text>
        </View>
        <View style={styles.content_child}>
          <I18nText style={styles.content_child_left}>TaskDetail.endTime</I18nText>
          <Text style={styles.content_child_right}>{endTime}</Text>
        </View>
        <View style={styles.content_child}>
          <I18nText style={styles.content_child_left}>TaskDetail.beginTime</I18nText>
          <TouchableOpacity
            // 日期选择器
            onPress={() => this.showPicker({
              minDate: new Date(),
              maxDate: new Date(2018, 9 - 1, 20),
              mode: 'spinner',
            })}
          >
            <Text style={[styles.content_child_right, styles.content_child_beginTime]}>
              {beginTime}<Entypo name="chevron-thin-right" size={50} color="#30bf6c" />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.content_child_btn]}>
          {/* 预览作业 */}
          <TouchableOpacity onPress={() => Actions.PreviewHomework({ homeworkId })}>
            <I18nText style={styles.content_child_btn_normal}>
              TaskDetail.reviewHomework
            </I18nText>
          </TouchableOpacity>
          {/* 开始作业 */}
          <TouchableOpacity onPress={() => Actions.DoHomework({ homeworkId })}>
            <I18nText style={[styles.content_child_btn_normal, styles.content_child_btn_color]}>
              TaskDetail.beginHomework
            </I18nText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Content.propTypes = {
  // 耗时
  useTime: PropTypes.string.isRequired,
  // 结束时间
  endTime: PropTypes.string.isRequired,
  // 执行时间
  beginTime: PropTypes.string.isRequired,
  // 是否待批阅(默认false，如果是true 则是待批阅)
  waitReadOver: PropTypes.bool.isRequired,
  // 当前这份作业的id
  homeworkId: PropTypes.string.isRequired,
};

export default Content;
