import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CIcon from '../Icon';
import Radio from '../Radio';
import styles from './style.scss';
import { mergeStyles } from '../../utils/common';

class BoolSubjuct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  onChange = (params) => {
    const { onChange } = this.props;
    this.setState({
      value: params,
    }, onChange(params));
  }

  customStyle = (isChecked) => {
    const { checkedTextStyle, textStyle } = this.props;
    if (isChecked) {
      if (checkedTextStyle) {
        return mergeStyles(styles.text_style, textStyle, styles.checked_text_style, checkedTextStyle);
      }
      return mergeStyles(styles.text_style, textStyle, styles.checked_text_style);
    }
    return mergeStyles(styles.text_style, textStyle);
  };

  correctIcon = () => {
    const { value } = this.state;
    return <CIcon name="dui" style={this.customStyle(value === 1)} />;
  }

  errorIcon = () => {
    const { value } = this.state;
    return <CIcon name="x" style={this.customStyle(value === 2)} />;
  };

  render() {
    const {
      checkedIconWrapStyle, iconWrapStyle, ...rest
    } = this.props;
    const { value } = this.state;
    return (
      <Radio.Group
        {...rest}
        value={value}
        checkedIconWrapStyle={mergeStyles(styles.checked_icon_wrap_style, checkedIconWrapStyle)}
        iconWrapStyle={mergeStyles(styles.icon_wrap_style, iconWrapStyle)}
        onChange={this.onChange}
      >
        <Radio.Button value={1}>{this.correctIcon()}</Radio.Button>
        <Radio.Button value={2}>{this.errorIcon()}</Radio.Button>
      </Radio.Group>
    );
  }
}

BoolSubjuct.propTypes = {
  checkedIconWrapStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  iconWrapStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  checkedTextStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  textStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  value: PropTypes.number,
  onChange: PropTypes.func,
};

BoolSubjuct.defaultProps = {
  checkedIconWrapStyle: {},
  iconWrapStyle: {},
  checkedTextStyle: {},
  textStyle: {},
  value: null,
  onChange: () => {},
};

export default BoolSubjuct;
