// 难易程度组件
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import Radio from '../Radio';
import I18nText from '../I18nText';
import styles from './DifficultLevelView.scss';

class DifficultLevelView extends Component {
  static defaultProps = {
    onChange: (a) => { console.log(123, a); },
    defaultValue: null,
  } // 默认选中值

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentLevel: 1,
  //   };
  // }

  render() {
    // const { currentLevel } = this.state;
    const {
      onChange, defaultValue,
    } = this.props;
    return (
      <View style={styles.problem_wrapper}>
        <Text style={styles.problem_title}>
          <I18nText>DifficultLevelView.title</I18nText>
          <I18nText style={styles.required_txt}>
            DifficultLevelView.mustChoice
          </I18nText>
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
          <Radio.Button key={1} value={1} checkedIconWrapStyle={styles.checkedIconWrapStyle1}>
            <I18nText>DifficultLevelView.difficultLevel1</I18nText>
          </Radio.Button>
          <Radio.Button key={5} value={5} checkedIconWrapStyle={styles.checkedIconWrapStyle2}>
            <I18nText>DifficultLevelView.difficultLevel2</I18nText>
          </Radio.Button>
          <Radio.Button key={9} value={9} checkedIconWrapStyle={styles.checkedIconWrapStyle3}>
            <I18nText>DifficultLevelView.difficultLevel3</I18nText>
          </Radio.Button>
        </Radio.Group>
      </View>
    );
  }
}

DifficultLevelView.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.number,
};

export default DifficultLevelView;
