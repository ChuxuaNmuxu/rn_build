import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import styles from './button.scss';
import { mergeStyles } from '../../utils/common';

const CheckboxButton = (props) => {
  const { children, iconWrapStyle, ...rest } = props;
  const renderIcon = () => <Text style={styles.default_text}>{children}</Text>;
  return (
    <Checkbox
      iconWrapStyle={mergeStyles(styles.iconWrap_style, iconWrapStyle)}
      {...rest}
      icon={renderIcon()}
      checkedIcon={renderIcon()}
    />
  );
};

CheckboxButton.propTypes = {
  children: PropTypes.any.isRequired,
  iconWrapStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

CheckboxButton.defaultProps = {
  iconWrapStyle: {},
};

export default CheckboxButton;
