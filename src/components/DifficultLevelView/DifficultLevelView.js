// 难易程度组件
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import Radio from '../Radio';
import styles from './DifficultLevelView.scss';

class DifficultLevelView extends Component {
  static defaultProps = {
    labelData: [
      {
        label: '易',
        value: 1,
      },
      {
        label: '适中',
        value: 5,
      },
      {
        label: '难',
        value: 9,
      },
    ],
    onChange: (a) => { console.log(123, a); },
    defaultValue: null,
  } // 默认选中值

  constructor(props) {
    super(props);
    this.state = {
      currentLevel: 1,
    };
  }

  render() {
    const { currentLevel } = this.state;
    const {
      labelData, onChange, defaultValue,
    } = this.props;
    return (
      <View style={styles.problem_wrapper}>
        <Text style={styles.problem_title}>你认为本题的难易程度<Text style={styles.required_txt}>(必选*)</Text></Text>
        <Radio.Group
          defaultValue={defaultValue}
          onChange={onChange}
          checkedIconWrapStyle={[
            currentLevel === 1 && styles.checkedIconWrapStyle1,
            currentLevel === 5 && styles.checkedIconWrapStyle2,
            currentLevel === 5 && styles.checkedIconWrapStyle3,
          ]}
          checkedTextStyle={{
            color: '#fff',
          }}
          style={styles.radio_wrapper}
          childStyle={styles.radio_childStyle}
        >
          {
            labelData.map((proItem, proIndex) => (
              <Radio.Button key={proIndex} value={proItem.value}>{proItem.label}</Radio.Button>
            ))
          }
        </Radio.Group>
      </View>
    );
  }
}

DifficultLevelView.propTypes = {
  labelData: PropTypes.array,
  onChange: PropTypes.func,
  defaultValue: PropTypes.number,
};

export default DifficultLevelView;
