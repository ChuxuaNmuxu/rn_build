// 多选题答案组件
import React from 'react';
import { PropTypes } from 'prop-types';
import Checkbox from '../../../../components/Checkbox';
import { letterArr } from './constant';
import styles from './RadioStyles.scss';

const CheckboxGroup = Checkbox.Group;

const CheckboxComponent = ({
  options,
  handleMultiSelectChange,
  multiSelectAnswer,
}) => {
  const option = [];
  for (let i = 0; i < options; i++) {
    option.push({ label: letterArr[i], value: letterArr[i] });
  }
  return (
    <CheckboxGroup
      options={option}
      childStyle={styles.radioStyle}
      checkedIconWrapStyle={styles.checkedRadioStyle}
      onChange={(checkedValues) => { handleMultiSelectChange(checkedValues); }}
      value={multiSelectAnswer && multiSelectAnswer.split('')}
    />
  );
};

CheckboxComponent.defaultProps = {
  multiSelectAnswer: null,
};

CheckboxComponent.propTypes = {
  options: PropTypes.number.isRequired,
  handleMultiSelectChange: PropTypes.func.isRequired,
  multiSelectAnswer: PropTypes.string,
};

export default CheckboxComponent;
