import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import I18nText from '../../../../../components/I18nText';
import styles from './Content.scss';

const Content = ({
  waitReadOver, beginTime, endTime, useTime,
}) => {
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
        <Text style={styles.content_child_right}>{beginTime}</Text>
      </View>
      <View style={[styles.content_child_btn]}>
        {/* 预览作业 */}
        <TouchableOpacity onPress={() => console.log('预览作业')}>
          <I18nText style={styles.content_child_btn_normal}>TaskDetail.reviewHomework</I18nText>
        </TouchableOpacity>
        {/* 开始作业 */}
        <TouchableOpacity onPress={() => console.log('开始作业')}>
          <I18nText style={[styles.content_child_btn_normal, styles.content_child_btn_color]}>
            TaskDetail.beginHomework
          </I18nText>
        </TouchableOpacity>
      </View>
    </View>
  );
};
Content.propTypes = {
  // 耗时
  useTime: PropTypes.string.isRequired,
  // 结束时间
  endTime: PropTypes.string.isRequired,
  // 执行时间
  beginTime: PropTypes.string.isRequired,
  // 是否待批阅(默认false，如果是true 则是待批阅)
  waitReadOver: PropTypes.bool.isRequired,
};

export default Content;
