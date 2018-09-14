import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from './style.scss';
import { mergeStyles } from '../../utils/common';

class Radio extends Component {
  // 如果有自定义样式则使用自定义样式`
  customStyle = (custemStyle, defaultStyle) => (
    isEmpty(custemStyle)
      ? defaultStyle
      : mergeStyles(defaultStyle, custemStyle)
  )


  // 如果选中且有自定义样式则使用自定义，如果选中没有自定义样式则使用默认
  checkedStyle = (checked, custemStyle, defaultStyle) => {
    if (checked) {
      if (isEmpty(custemStyle)) {
        return defaultStyle;
      }
      return mergeStyles(defaultStyle, custemStyle);
    }
    return {};
  }

  handleClick = (value) => {
    const { onChange } = this.props;
    onChange(value);
  }

  render() {
    const {
      children,
      textStyle,
      iconWrapStyle,
      checkedTextStyle,
      checkedIconWrapStyle,
      value,
      disabled,
      icon,
      checkedIcon,
      style,
      checked,
    } = this.props;
    console.log(51, this.props.style);
    return (
      <TouchableOpacity onPress={() => this.handleClick(value)} disabled={disabled}>
        <View style={mergeStyles(styles.wrapper, style)}>
          <View
            style={mergeStyles(
              this.customStyle(iconWrapStyle, styles.icon_wrap),
              this.checkedStyle(checked === value, checkedIconWrapStyle, styles.checked_icon_wrap),
            )}
          >{
            <View style={styles.icon}>{checked === value ? checkedIcon : icon}</View>
          }
          </View>
          <Text
            style={mergeStyles(
              this.customStyle(textStyle, styles.text),
              this.checkedStyle(checked === value, checkedTextStyle, styles.checked_text),
            )}
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
  textStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]), // 自定义文本默认样式
  checkedTextStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]), // 自定义选中文本样式

  icon: PropTypes.any, // 自定义icon
  checkedIcon: PropTypes.any, // 自定义选中icon

  iconWrapStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]), // 自定义icon外层默认样式
  checkedIconWrapStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]), // 自定义选中icon外层样式

  checked: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]), // 选中状态
  onChange: PropTypes.func, // 点击之后的回掉函数
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]), // 索引
  disabled: PropTypes.bool, // 不可点击
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

Radio.defaultProps = {
  children: null,
  textStyle: {},
  checkedTextStyle: {},
  icon: null,
  checkedIcon: null,
  iconWrapStyle: {},
  checkedIconWrapStyle: {},
  checked: false,
  onChange: () => {},
  value: null,
  disabled: false,
  style: {},
};

export default Radio;
