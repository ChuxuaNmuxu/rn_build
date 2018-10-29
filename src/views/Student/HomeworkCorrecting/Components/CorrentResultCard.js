// 批阅作业组件
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import Radio from '../../../../components/Radio';
import I18nText from '../../../../components/I18nText';
import styles from './CorrentResultCard.scss';

class CorrentResultCard extends Component {
  static defaultProps = {
    onChange: (a) => { console.log(123, a); },
    defaultValue: null,
  }

  render() {
    // const { currentLevel } = this.state;
    const {
      onChange, defaultValue,
    } = this.props;
    return (
      <View style={styles.corrent_wrapper}>
        <Text style={styles.corrent_title}>
          <I18nText>homeworkCorrecting.homeworkCorrecting</I18nText>
        </Text>
        <Radio.Group
          defaultValue={defaultValue}
          onChange={onChange}
          checkedTextStyle={{
            color: '#fff',
          }}
          style={styles.radio_wrapper}
          childStyle={styles.radio_childStyle}
        >
          {/* 正确 */}
          <Radio.Button
            key={10}
            value={10}
            iconWrapStyle={styles.button_style}
            checkedIconWrapStyle={styles.checkedIconWrapStyle1}
          >
            <I18nText>homeworkCorrecting.correct</I18nText>
          </Radio.Button>
          {/* 部分正确 */}
          <Radio.Button
            key={5}
            value={5}
            iconWrapStyle={styles.button_style}
            checkedIconWrapStyle={styles.checkedIconWrapStyle2}
          >
            <I18nText>homeworkCorrecting.partOfTheError</I18nText>
          </Radio.Button>
          {/* 错误 */}
          <Radio.Button
            key={1}
            value={1}
            iconWrapStyle={styles.button_style}
            checkedIconWrapStyle={styles.checkedIconWrapStyle3}
          >
            <I18nText>homeworkCorrecting.error</I18nText>
          </Radio.Button>
        </Radio.Group>
      </View>
    );
  }
}

CorrentResultCard.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.number,
};

export default CorrentResultCard;
