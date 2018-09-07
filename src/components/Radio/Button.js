import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import Radio from './Radio';
import styles from './button.scss';

const RadioButton = (props) => {
  const {
    children, ...rest
  } = props;
  const renderIcon = () => <Text style={styles.default_text}>{children}</Text>;

  return (
    <Radio
      iconWrapStyle={styles.iconWrap_style}
      {...rest}
      icon={renderIcon()}
      checkedIcon={renderIcon()}
    />
  );
};

RadioButton.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.string,
};

RadioButton.defaultProps = {
  type: 'button',
};

export default RadioButton;