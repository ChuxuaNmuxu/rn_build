import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import styles from './button.scss';

const RadioButton = (props) => {
  const { children, ...rest } = props;
  const renderIcon = () => <Text style={styles.default_text}>{children}</Text>;
  return (
    <Checkbox
      iconWrapStyle={styles.iconWrap_style}
      {...rest}
      icon={renderIcon()}
      checkedIcon={renderIcon()}
    />
  );
};

RadioButton.propTypes = {
  children: PropTypes.any.isRequired,
};

export default RadioButton;
