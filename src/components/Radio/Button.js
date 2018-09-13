import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import Radio from './Radio';
import styles from './button.scss';
import { mergeStyles } from '../../utils/common';

const RadioButton = (props) => {
  const {
    children, iconWrapStyle, icon, checkedIcon, ...rest
  } = props;
  const renderIcon = () => <Text style={styles.default_text}>{children}</Text>;

  return (
    <Radio
      {...rest}
      iconWrapStyle={mergeStyles(styles.iconWrap_style, iconWrapStyle)}
      icon={icon || renderIcon()}
      checkedIcon={checkedIcon || renderIcon()}
    />
  );
};

RadioButton.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.string,
  iconWrapStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  icon: PropTypes.element,
  checkedIcon: PropTypes.element,
};

RadioButton.defaultProps = {
  type: 'button',
  iconWrapStyle: {},
  icon: null,
  checkedIcon: null,
};

export default RadioButton;
