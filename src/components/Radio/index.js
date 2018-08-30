import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import {
  Image,
  ImageStyle,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './style.scss';

class Radio extends Component {
  constructor(props) {
    super(props);
    this.a;
  }

  render() {
    const {
      children,
      textStyle,
      iconStyle,
    } = this.props;
    return (
      <TouchableWithoutFeedback>
        <View style={styles.wrapper}>
          <View style={isEmpty(iconStyle) ? styles.icon : iconStyle} />
          <Text style={isEmpty(textStyle) ? styles.text : textStyle}>{children}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Radio.propTypes = {
  children: PropTypes.string.isRequired,
  textStyle: PropTypes.object,
  iconStyle: PropTypes.any,
};

Radio.defaultProps = {
  textStyle: {},
  iconStyle: {},
};

export default Radio;
