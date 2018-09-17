// 单选题答案组件
import React from 'react';
import { PropTypes } from 'prop-types';
import Radio from '../../../../components/Radio';
import { letterArr } from './constant';
import styles from './RadioStyles.scss';

const RadioGroup = Radio.Group;

const RadioComponent = ({
  options,
  handleRadioChange,
  radioAnswer,
}) => {
  const option = [];
  for (let i = 0; i < options; i++) {
    option.push(<Radio value={letterArr[i]} key={i}>{letterArr[i]}</Radio>);
  }
  return (
    <RadioGroup
      childStyle={styles.radioStyle}
      checkedIconWrapStyle={styles.checkedRadioStyle}
      onChange={handleRadioChange}
      value={radioAnswer}
    >
      {option}
    </RadioGroup>
  );
};

RadioComponent.defaultProps = {
  radioAnswer: null,
};

RadioComponent.propTypes = {
  options: PropTypes.number.isRequired,
  handleRadioChange: PropTypes.func.isRequired,
  radioAnswer: PropTypes.string,
};

export default RadioComponent;
