import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import styles from './button.scss';
import { mergeStyles } from '../../utils/common';

const CheckboxButton = (props) => {
  const {
    children, iconWrapStyle, icon, checkedIcon, ...rest
  } = props;
  const renderIcon = () => <Text style={styles.default_text}>{children}</Text>;
  return (
    <Checkbox
      iconWrapStyle={mergeStyles(styles.iconWrap_style, iconWrapStyle)}
      {...rest}
      icon={icon || renderIcon()}
      checkedIcon={checkedIcon || renderIcon()}
    />
  );
};

CheckboxButton.propTypes = {
  children: PropTypes.any.isRequired,
  iconWrapStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  icon: PropTypes.element,
  checkedIcon: PropTypes.element,
};

CheckboxButton.defaultProps = {
  iconWrapStyle: {},
  icon: null,
  checkedIcon: null,
};

export default CheckboxButton;
