import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from './style.scss';

class Radio extends Component {
  // 如果有自定义样式则使用自定义样式
  customStyle = (custemStyle, defaultStyle) => (isEmpty(custemStyle) ? defaultStyle : custemStyle)

  // 如果选中且有自定义样式则使用自定义，如果选中没有自定义样式则使用默认
  checkedStyle = (checked, custemStyle, defaultStyle) => {
    if (checked) {
      if (isEmpty(custemStyle)) {
        return defaultStyle;
      }
      return custemStyle;
    }
    return {};
  }

  handleClick = (index) => {
    const { onChange, checked } = this.props;
    onChange(index, checked);
  }

  render() {
    const {
      checked,
      children,
      textStyle,
      iconStyle,
      checkedTextStyle,
      checkedIconStyle,
      checkedViewChildStyle,
      index,
      disabled,
    } = this.props;
    return (
      <TouchableOpacity onPress={() => this.handleClick(index)} disabled={disabled}>
        <View style={[styles.wrapper]}>
          <View style={[
            this.customStyle(iconStyle, styles.icon),
            this.checkedStyle(checked, checkedIconStyle, styles.checked_view),
          ]}
          >
            {checked && <View style={this.customStyle(checkedViewChildStyle, styles.checked_view_child)} />}
          </View>
          <Text
            style={[
              this.customStyle(textStyle, styles.text),
              this.checkedStyle(checked, checkedTextStyle, styles.checked_text),
            ]}
            ref={(e) => { this.test = e; }}
          >{children}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

Radio.propTypes = {
  children: PropTypes.any, // 文本
  textStyle: PropTypes.object, // 自定义文本默认样式
  iconStyle: PropTypes.any, // 自定义icon默认样式
  checked: PropTypes.bool, // 选中标签
  checkedTextStyle: PropTypes.object, // 自定义选中文本样式
  checkedIconStyle: PropTypes.any, // 自定义选中icon样式
  checkedViewChildStyle: PropTypes.object, // 自定义icon选中的字样式
  onChange: PropTypes.func, // 点击之后的回掉函数
  index: PropTypes.number, // 索引
  disabled: PropTypes.bool, // 不可点击
};

Radio.defaultProps = {
  children: null,
  textStyle: {},
  iconStyle: {},
  checked: false,
  checkedTextStyle: {},
  checkedIconStyle: {},
  checkedViewChildStyle: {},
  onChange: () => {},
  index: null,
  disabled: false,
};

export default Radio;
