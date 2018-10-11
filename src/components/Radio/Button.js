import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import Radio from './Radio';
import styles from './button.scss';
import { mergeStyles } from '../../utils/common';

const RadioButton = (props) => {
  const {
    children, iconWrapStyle, icon, checkedIcon, textStyle, checkedTextStyle, ...rest
  } = props;
  // console.log(12, rest);
  const renderIcon = (type) => {
    if (type === 'default') {
      return <Text style={mergeStyles(styles.default_text, textStyle)}>{children}</Text>;
    }
    return <Text style={mergeStyles(styles.default_text, checkedTextStyle)}>{children}</Text>;
  };
  console.log('Radio.Button:', rest);
  return (
    <Radio
      {...rest}
      iconWrapStyle={mergeStyles(styles.iconWrap_style, { marginRight: 0 }, iconWrapStyle)}
      icon={icon || renderIcon('default')}
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
  checkedTextStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  textStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

RadioButton.defaultProps = {
  type: 'button',
  iconWrapStyle: {},
  icon: null,
  checkedIcon: null,
  checkedTextStyle: {},
  textStyle: {},
};

export default RadioButton;
