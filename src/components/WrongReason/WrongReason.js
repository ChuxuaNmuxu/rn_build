// 错误原因分析组件
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import Radio from '../Radio';
import styles from './WrongReason.scss';

class WrongReason extends Component {
  static defaultProps = {
    labelData: [ // 标签数据
      {
        label: '知识记忆性错误',
        id: 1,
      },
      {
        label: '理解性错误',
        id: 2,
      },
      {
        label: '考虑不全面',
        id: 3,
      },
      {
        label: '审题不仔细',
        id: 4,
      },
      {
        label: '粗心大意',
        id: 5,
      },
      {
        label: '其他',
        id: 65535,
      },
    ],
    title: '错误原因分析', // 组件title
    onChange: (a) => { console.log('我被点击了：', a.target.value); },
    defaultValue: null,
  } // 默认选中值

  render() {
    const {
      title, labelData, onChange, defaultValue,
    } = this.props;
    return (
      <View style={styles.problem_wrapper}>
        <Text style={styles.problem_title}>{title}</Text>
        <Radio.Group
          defaultValue={defaultValue}
          onChange={onChange}
          checkedIconWrapStyle={{
            borderColor: '#fa5656',
          }}
          checkedTextStyle={{
            color: '#fa5656',
          }}
          style={styles.radio_wrapper}
          childStyle={styles.radio_childStyle}
        >
          {
            labelData.map((proItem, proIndex) => (
              <Radio.Button key={proIndex} value={proItem.id}>{proItem.label}</Radio.Button>
            ))
          }
        </Radio.Group>
      </View>
    );
  }
}

WrongReason.propTypes = {
  labelData: PropTypes.array,
  title: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.number,
};

export default WrongReason;
